import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import Cors from "cors";

import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_DB_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_DB_SECRET_KEY!,
  },
  region: process.env.AWS_DB_REGION,
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any> | undefined>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const { Item } = (await client.send(
      new GetItemCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: { S: "alea" },
          variable_name: { S: "xenobots" },
        },
      })
    )) as any;

    const xenobots = Item.variable_value.N;

    return res.status(200).json({ xenobots });
  }

  if (req.method === "POST") {
    console.log(req.body);
    const xenoChange = Number(req.body.xenoChange);
    console.log({ xenoChange });
    const { Attributes } = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "alea",
          variable_name: "xenobots",
        },
        UpdateExpression: "SET variable_value = variable_value + :xenoChange",
        ExpressionAttributeValues: {
          ":xenoChange": xenoChange,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === "PUT") {
    const { Attributes } = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "alea",
          variable_name: "xenobots",
        },
        UpdateExpression:
          "SET variable_value = variable_value - variable_value",
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }
}
