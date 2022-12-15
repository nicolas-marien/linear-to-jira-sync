// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LinearPayload } from "../../types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action, data, type, createdAt }: LinearPayload = req.body;
  console.log(action, data, type, createdAt);

  res.status(200);
}
