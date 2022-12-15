export type LinearObjectData = Record<string, string | boolean | number>;
import { Issue } from "@linear/sdk";

export type LinearPayload = {
  action: "create" | "update" | "remove";
  createdAt: string; // date format
  url: string;
  type: "Issue" | "Comment";
  data: Issue;
  updatedFrom: Partial<Issue>;
};
