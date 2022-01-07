import sys
import time
import json
import httpx
from jenkins import Jenkins, JenkinsException, NotFoundException
from requests.models import HTTPError

def main(
    jenkins_url: str,
    jenkins_username: str, 
    jenkins_api_token: str,
    jenkins_job: str,
    jenkins_job_parameters: str
    ):

    server = Jenkins(
        jenkins_url,
        username=jenkins_username,
        password=jenkins_api_token
    )

    hostname = jenkins_url.split('https://')[-1].split('http://')[-1]
    jenkins_job_parameters = json.loads(jenkins_job_parameters) or None

    try:
        user = server.get_whoami()
    except JenkinsException as err:
        raise AssertionError('Unauthorized! Check user API Token and/or username!') from err
    except Exception as err:
        raise AssertionError(f'Could not connect to Jenkins server "{jenkins_url}"!') from err

    version = server.get_version()
    print(f'Running as "{user}" with Jenkins version "{version}"')
    job = ''.join(jenkins_job.split('job/'))

    try:
        server.build_job(
            job,
            parameters = jenkins_job_parameters,
            token = jenkins_api_token
        )
    except NotFoundException as err:
        raise AssertionError(f'Given job "{jenkins_job}" was not found!') from err
    except HTTPError as err:
        raise AssertionError(f'Bad request! Missing job parameters? *NOTE* Default Jenkins parameters are currently not working, i.e. they must be supplied explicitly! Got parameters "{jenkins_job_parameters or {}}"') from err

    queue_id = server.get_queue_info()[0].get('id')
    queue = f'http://{jenkins_username}:{jenkins_api_token}@{hostname}/queue/item/{queue_id}/api/json?pretty=true'
    while 'executable' not in (info := httpx.get(queue).json()):
        time.sleep(2)

    build_number = info['executable']['number']
    print(f'Build number: {build_number}')
    while not (status := server.get_build_info(name=job, number=build_number)['result']):
        time.sleep(2)
    
    print(f'Job status: "{status}"')
    print(f':set-output name=job_status::{status}')

    if status != 'SUCCESS':
        exit(1)
    
if __name__ == '__main__':
    main(
        jenkins_url = sys.argv[1],
        jenkins_username = sys.argv[2],
        jenkins_api_token = sys.argv[3],
        jenkins_job = sys.argv[4],
        jenkins_job_parameters = sys.argv[5] or '{}'
    )