import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any> | undefined>
) {
  if ((req.method = "GET")) {
    const timeout = {
      minutes: process.env.TIMEOUT_MINUTES,
      seconds: process.env.TIMEOUT_SECONDS,
    };

    return res.status(200).json(timeout);
  }
}
