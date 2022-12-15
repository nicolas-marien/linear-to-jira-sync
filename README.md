# Context

Currently there is no way to push Linear issue to Jira. The Jira link does not create the issue in Jira when they are created in Linear.

# How to use

This is a NextJS project, using the API route /api/issue_created to call the Jira API.
Provide the following environment variables:

- JIRA_USER_EMAIL
- JIRA_PAT: a personal access token for the user
- JIRA_HOST
- JIRA_PROJECT_KEY

Then on Linear, register a webhook for issues.

Please note that this is a POC, and that several things do not work (updates and so on).
Also, please note that the issue formatting is non existing. All markdown is stripped. So in Jira there will only be play text paragraphs.
