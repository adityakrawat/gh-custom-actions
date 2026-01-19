const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    //1) Get some input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', { required: true });

    core.notice(`Deploying contents of ${distFolder} to S3 bucket ${bucket} in region ${bucketRegion}`);

    //2) Upload files to S3 bucket
    const s3Uri = `s3://${bucket}/`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);
    core.notice(`Website deployed at ${websiteUrl}`);

}

run();