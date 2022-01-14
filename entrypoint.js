const core = require('@actions/core');

const url = core.getInput('JENKINS_URL');
const username = core.getInput('JENKINS_USERNAME');
const token = core.getInput('JENKINS_API_TOKEN');
const jobName = core.getInput('JENKINS_JOB');
const jobParameters = core.getInput('JENKINS_JOB_PARAMETERS');

const hostname = url.split('http://').slice(-1)[0] || url.split('https://').slice(-1)[0];
const baseUrl = `http://${username}:${token}@${hostname}`;

const jenkins = require('jenkins')({ baseUrl: baseUrl, crumbIssuer: true, promisify: true });

async function waitQueue(id) {
    return new Promise((resolve, reject) => {
        jenkins.queue.item(id, (err, item) => {
            if (err) core.setFailed(err);

            if (item.executable) {
                core.info(`Build number: ${item.executable.number}`);
                resolve(item.executable.number);
            } else if (item.cancelled) {
                reject('Cancelled');
            } else {
                setTimeout(async() => {
                    resolve(await waitQueue(id));
                }, 1000);
            }

        });
    });
}

async function triggerBuild() {
    core.info(`Triggering build: "${jobName}" with parameters: ${jobParameters}`);
    let queueId = await jenkins.job.build({ name: jobName, parameters: JSON.parse(jobParameters) });
    let buildId = await waitQueue(queueId);
    return buildId;
}

async function main() {
    core.info(`Fetching information from Jenkins server..`);
    let information = await jenkins.info();
    core.info(`Jenkins server returned: ${JSON.stringify(information)}`);
    let buildId = await triggerBuild();

    let log = jenkins.build.logStream(jobName, buildId);

    log.on('data', (data) => {
        process.stdout.write(data);
    });

    log.on('error', (err) => {
        process.stderr.write(err);
    });

    log.on('end', () => {
        jenkins.build.get(jobName, buildId, (err, data) => {
            if (err) core.setFailed(err);
            core.info(`Build status: ${data.result}`)
            if (data.result === "FAILURE") {
                core.setFailed(JSON.stringify(data));
            }
        });
    });

}

(async() => {
    await main();
})();