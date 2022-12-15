export type LinearObjectData = Record<string, string | boolean | number>;

export type LinearPayload = {
  action: "create" | "update" | "remove";
  createdAt: string; // date format
  url: string;
  type: "Issue" | "Comment";
  data: LinearObjectData;
  updatedFrom: LinearObjectData;
};
