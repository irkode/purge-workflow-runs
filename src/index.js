const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput("token", { required: true, trimWhitespace: true });
    const owner = core.getInput("owner", { required: true, trimWhitespace: true });
    const repo = core.getInput("repo", { required: true, trimWhitespace: true });
    const keep = core.getInput("keep", { required: false, trimWhitespace: true });
    const workflow = core.getInput("workflow", { required: false, trimWhitespace: true });

    const keepDays = Number(keep || 10)
    var filterDate = new Date();
    core.info(`today:    ${filterDate.toISOString().slice(0, 10)}`);
    filterDate.setDate(filterDate.getDate() - keepDays)
    const created = "<" + filterDate.toISOString().slice(0, 10);
    core.info(`search:   ${created}`);
    core.info(`keep:     ${keepDays}`);
    core.info(`workflow: ${workflow}`);

    
    const octokit = new github.getOctokit(token);

    octokit.paginate(octokit.rest.actions.listWorkflowRunsForRepo,
      {
        owner,
        repo,
        created,
        status: "completed",
        per_page: 10,
      }
    ).then((data) => {
      core.info(`total number of retrieved workflows ${data.length}`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
