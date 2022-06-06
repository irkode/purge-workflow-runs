# purge-workflows

Purge old workflow runs based on time and/or name.

## Synopsis

Action to delete workflow runs from a github repository. The action will
process _completed_ workflows only and delete old runs. The default retention
period is 90 days and can be changed using _keep_ parameter.

You may restrict the purge to one workflow with the _workflow_ parameter.

## Inputs

### `keep`

Purge runs older than this days back, only (default: 90)

### `workflow`

Only purge runs of this workflow (default: purge all workflows)

### `token`

Personal access token (default: ${{ github.token }}

### `owner`

Repository owner (default: github.repository_owner)

### `repo`

Repository name (default: ${{ github.event.repository.name }})

## Outputs

### `result`

Number of purged workflows

## Example usage

These may help you to setup the action quickly.

### Minimal workflow using all defaults

```yaml
name: Purge Workflows

on:
  workflow_dispatch:

jobs:
  purge-workflows:
    runs-on: ubuntu-latest
    steps:
      - uses: irkode/purge-workflow-runs@main
```

### Allowing to give the retention days

```yaml
name: Purge Workflows

on:
  workflow_dispatch:
    inputs:
      keep:
        description: "Keep logs newer than this days back"
        default: "30"
        required: false

jobs:
  purge-workflows:
    runs-on: ubuntu-latest
    steps:
      - uses: irkode/purge-workflow-runs@main
          keep: ${{ github.event.inputs.keep }}
```
