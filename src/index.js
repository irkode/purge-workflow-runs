const core = require('@actions/core');
const github = require('@actions/github');
import dateFormat from "dateformat";

async function run() {
  try {
    const token = core.getInput("token", { required: true, trimWhitespace: true });
    const owner = core.getInput("owner", { required: true, trimWhitespace: true });
    const repo = core.getInput("repo", { required: true, trimWhitespace: true });
    const keep = core.getInput("keep", { required: false, trimWhitespace: true });
    const workflow = core.getInput("workflow", { required: false, trimWhitespace: true });

    const keepDays = Number(keep || 10)
    var filterDate = new Date();
    core.info(`today:    ${dateFormat(filterDate, "yyyy-mm-dd")}`);
    filterDate.setDate(filterDate.getDate() - keepDays)
    core.info(`search:   ${dateFormat(filterDate, "yyyy-mm-dd")}`);
    core.info(`keep:     ${keepDays}`);
    core.info(`workflow: ${workflow}`);

    const octokit = new github.getOctokit(token);

    octokit.paginate(octokit.rest.actions.listWorkflowRunsForRepo,
      {
        owner,
        repo,
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
