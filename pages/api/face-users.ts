import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import Cors from "cors";

export type ClickCountResponsePayload = {
  variable_value: {
    N: string;
  };
};

export const clickUrl = "api/face-users";

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

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: true, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

type AnimationVariable = {
  variable_value: number;
  variable_name: string;
  animation_name: string;
};

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
          animation_name: { S: "face" },
          variable_name: { S: "users" },
        },
      })
    )) as any;

    const users = Item.variable_value.N;

    return res.status(200).json({ users });
  }

  if (req.method === "POST") {
    console.log(req.body);
    const usersChange = Number(req.body.usersChange);
    console.log({ usersChange });
    const { Attributes } = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "face",
          variable_name: "users",
        },
        UpdateExpression: "SET variable_value = variable_value + :usersChange",
        ExpressionAttributeValues: {
          ":usersChange": usersChange,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }
}
