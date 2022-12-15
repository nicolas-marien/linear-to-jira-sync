// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Issue } from "@linear/sdk";
import { Version3Client } from "jira.js";
import removeMarkdown from "markdown-to-text";
import type { NextApiRequest, NextApiResponse } from "next";
import { LinearPayload } from "../../types";
const { JIRA_USER_EMAIL, JIRA_PAT, JIRA_PROJECT_KEY, JIRA_HOST } = process.env;

const jiraClient = new Version3Client({
  host: JIRA_HOST!,
  authentication: {
    basic: {
      email: JIRA_USER_EMAIL!,
      apiToken: JIRA_PAT!,
    },
  },
});

function linearDescriptionToJiraDescription(description: string) {
  const rawText = removeMarkdown(description);
  return rawText
    .split(/\n/)
    .reduce<{ type: string; content: { text: string; type: string }[] }[]>(
      (array, text) => {
        if (text) {
          array.push({
            type: "paragraph",
            content: [
              {
                text,
                type: "text",
              },
            ],
          });
        }
        return array;
      },
      []
    );
}

async function createIssue(data: Issue) {
  try {
    await jiraClient.issues.createIssue({
      fields: {
        issuetype: {
          name: "Story",
        },
        summary: data.title,
        // NOTE: the content will have no formatting.
        description: data.description
          ? {
              type: "doc",
              version: 1,
              content: linearDescriptionToJiraDescription(data.description),
            }
          : "",
        project: {
          key: JIRA_PROJECT_KEY!,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action, data, type, createdAt }: LinearPayload = req.body;

  switch (action) {
    case "create":
      await createIssue(data);
      break;
    default:
      console.warn("Action not supported");
      break;
  }

  res.status(200).send({});
}
