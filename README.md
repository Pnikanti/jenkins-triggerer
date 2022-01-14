# Jenkins Triggerer
## Trigger Jenkins jobs with ease 😎

🚧 Documentation under construction 🚧

## Example usage (.github/workflows/action.yml)

    jobs:
        trigger-jenkins-job:
            steps:
            - name: Trigger Jenkins Job
                uses: Pnikanti/jenkins-triggerer@master
                with:
                    JENKINS_URL: ${{ secrets.JENKINS_URL }}
                    JENKINS_USERNAME: ${{ secrets.JENKINS_TOKEN }}
                    JENKINS_API_TOKEN: "<username>"
                    JENKINS_JOB: "<job-name>"
                    JENKINS_JOB_PARAMETERS: "{'parameter-key-1': 'value-1', 'parameter-key-2': 'value-2'}"

## Parameters
**\* Required parameter**
### JENKINS_URL*:
    Jenkins server url, e.g. http://<jenkins-server>
### JENKINS_USERNAME*:
    Jenkins username
### JENKINS_API_TOKEN*:
    Jenkins user API token. Can be generated via <jenkins-server>/user/<username>/configure
### JENKINS_JOB*:
    Jenkins job to trigger. Works with folders also, e.g. job/<job-name> or <job-name> or <folder-name>/<job-name> are all valid ways to provide a job.
### JENKINS_JOB_PARAMETERS:
    Jenkins job parameters. Given in JSON string notation. E.g. "{'parameter-key-1': 'value-1', 'parameter-key-2': 'value-2'}"
    
## Outputs
### Status / Result
* SUCCESS
* FAILURE
* ABORTED
