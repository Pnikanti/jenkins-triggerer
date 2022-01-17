# Jenkins Triggerer Action
Trigger Jenkins jobs with ease! Derived from [**build-jenkins-job**](https://github.com/GoldenspearLLC/build-jenkins-job) action, but rewritten in JavaScript. Running in JavaScript makes it easier for using this action in low-powered machines, e.g. in Raspberry PIs, because [**JavaScript Actions can be run natively.**](https://docs.github.com/en/actions/creating-actions/about-custom-actions#javascript-actions)

### Example
    - name: Trigger Jenkins job
    uses: Pnikanti/jenkins-triggerer@master
    with:
        JENKINS_URL: ${{ github.event.inputs.JENKINS_URL }}
        JENKINS_USERNAME: ${{ secrets.JENKINS_USERNAME }}
        JENKINS_API_TOKEN: ${{ secrets.JENKINS_API_TOKEN }}
        JENKINS_JOB: ${{ github.event.inputs.JENKINS_JOB }}
        JENKINS_JOB_PARAMETERS: ${{ github.event.inputs.JENKINS_JOB_PARAMETERS }}

### Parameters
**\* Required parameter**

    JENKINS_URL*:
    Jenkins server url, e.g. http://localhost:8080

    JENKINS_USERNAME*:
    Jenkins username
    
    JENKINS_API_TOKEN*:
    Jenkins user API token. Can be generated from <jenkins-server>/user/<username>/configure

    JENKINS_JOB*:
    Jenkins job to trigger. Works with folders also, e.g. job/<job-name> or <job-name> or <folder-name>/<job-name> are all valid ways to provide a job.

    JENKINS_JOB_PARAMETERS:
    Jenkins job parameters. Given in JSON string notation. E.g. "{"key-1": "value-1", "key-2": "value-2"}"
    
### Outputs
    - SUCCESS
    - FAILURE
    - ABORTED

### References:

- https://github.com/GoldenspearLLC/build-jenkins-job
- https://spacejelly.dev/posts/how-to-create-a-custom-github-action-with-node-javascript/
- https://github.com/nektos/act