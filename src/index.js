const core = require('@actions/core');
const dotenv = require('dotenv');
const { exit } = require('process');
let jenkins;
dotenv.config();


async function wait_queue(id) {
    return new Promise((resolve, reject) => {
        jenkins.queue.item(id, (err, item) => {
            if (err) {
                core.setFailed(err);
                exit();
            }

            if (item.executable) {
                core.info(`Build number: ${item.executable.number}`);
                resolve(item.executable.number);
            } else if (item.cancelled) {
                reject('Cancelled');
            } else {
                setTimeout(async() => {
                    resolve(await wait_queue(id));
                }, 1000);
            }

        });
    });
}

async function trigger_build(job_name, job_parameters) {
    core.info(`Triggering build: "${job_name}" with parameters: ${job_parameters}`);
    let queue_id = await jenkins.job.build({ name: job_name, parameters: JSON.parse(job_parameters) });
    let build_id = await wait_queue(queue_id);
    return build_id;
}

async function main(job_name, job_parameters) {
    core.info(`Fetching information from Jenkins server..`);
    let information = await jenkins.info();
    core.info(`Jenkins server returned: ${JSON.stringify(information)}`);

    let build_id = await trigger_build(job_name, job_parameters);
    let log = jenkins.build.logStream(job_name, build_id);

    log.on('data', (data) => {
        process.stdout.write(data);
    });

    log.on('error', (err) => {
        process.stderr.write(err);
    });

    log.on('end', () => {
        jenkins.build.get(job_name, build_id, (err, data) => {
            if (err) {
                core.setFailed(err);
                exit();
            }
            core.info(`Build status: ${data.result}`)
            if (data.result === "FAILURE") {
                core.setFailed(JSON.stringify(data));
                exit();
            }
        });
    });

}

(async() => {
    const url = core.getInput('JENKINS_URL') || process.env.JENKINS_URL;
    const username = core.getInput('JENKINS_USERNAME') || process.env.JENKINS_USERNAME;
    const token = core.getInput('JENKINS_API_TOKEN') || process.env.JENKINS_API_TOKEN;
    const job_name = core.getInput('JENKINS_JOB') || process.env.JENKINS_JOB;
    const job_parameters = core.getInput('JENKINS_JOB_PARAMETERS') || process.env.JENKINS_JOB_PARAMETERS;

    if (!url || !username || !token || !job_name) {
        core.setFailed(`Required parameter(s) (JENKINS_URL, JENKINS_USERNAME, JENKINS_API_TOKEN and/or JENKINS_JOB) not provided!`);
        exit();
    }

    const hostname = url.split('http://').slice(-1)[0] || url.split('https://').slice(-1)[0];
    const base_url = `http://${username}:${token}@${hostname}`;

    jenkins = require('jenkins')({ baseUrl: base_url, crumbIssuer: true, promisify: true });

    await main(job_name, job_parameters);
})();