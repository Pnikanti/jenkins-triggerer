# Jenkins Triggerer
## Trigger Jenkins jobs with ease 😎

Derived from [**build-jenkins-job**](https://github.com/GoldenspearLLC/build-jenkins-job) action.

🚧 Documentation under construction 🚧

## Parameters
**\* Required parameter**
### JENKINS_URL*:
    Jenkins server url, e.g. http://\<jenkins-server>
### JENKINS_USERNAME*:
    Jenkins username
### JENKINS_API_TOKEN*:
    Jenkins user API token. Can be generated via \<jenkins-server>/user/\<username>/configure
### JENKINS_JOB*:
    Jenkins job to trigger. Works with folders also, e.g. job/\<job-name> or \<job-name> or \<folder-name>/\<job-name> are all valid ways to provide job.
### JENKINS_JOB_PARAMETERS:
    Jenkins job parameters. Given in JSON string notation. E.g. "{'parameter-key-1': 'value-1', 'parameter-key-2': 'value-2'}"
    
## Outputs
### Status / Result
* SUCCESS
* FAILURE
* ABORTED