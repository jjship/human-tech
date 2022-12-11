import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export type ClickCountResponsePayload = {
  variable_value: {
    N: string;
  };
};

export const clickUrl = "api/click";

//TODO handle clickCount < 0

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any> | undefined>
) {
  if (req.method === "GET") {
    const { Item } = (await client.send(
      new GetItemCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: { S: "computer" },
          variable_name: { S: "code" },
        },
      })
    )) as any;

    return res.status(200).json(Item);
  }

  if (req.method === "POST") {
    console.log(req.body);
    const newCode = Number(req.body.code);
    console.log({ newCode });
    const { Attributes } = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "computer",
          variable_name: "code",
        },
        UpdateExpression: "SET variable_value = :newCode",
        ExpressionAttributeValues: {
          ":newCode": newCode,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }
}
