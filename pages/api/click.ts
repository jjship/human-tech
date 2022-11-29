import type { NextApiRequest, NextApiResponse } from "next";
import {
  DynamoDBClient,
  // PutItemCommand,
  GetItemCommand,
  // UpdateItemCommand,
  // DeleteItemCommand,
  // UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandOutput,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
  region: process.env.AWS_REGION,
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
  // if (req.method === "PUT") {
  //   const { Item } = await client.send(
  //     new PutItemCommand({
  //       TableName: process.env.AWS_TABLE_NAME,
  //       Item: {
  //         animation_name: { S: "showcase" },
  //         variable_name: { S: "clickCount" },
  //         variable: { S: req.body.content },
  //       },
  //     })
  //   );
  //   console.log(Item);
  //   return res.status(201).json(Item);
  // }

  if (req.method === "PATCH") {
    const { Attributes } = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_TABLE_NAME,
        Key: {
          animation_name: "showcase",
          variable_name: "clickCount",
        },
        UpdateExpression: "SET variable_value = variable_value + :increment",
        ExpressionAttributeValues: {
          ":increment": 1,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    // console.log({ response });

    return res.status(200).json(Attributes);
  }

  if (req.method === "GET") {
    const { Item } = (await client.send(
      new GetItemCommand({
        TableName: process.env.AWS_TABLE_NAME,
        Key: {
          animation_name: { S: "showcase" },
          variable_name: { S: "clickCount" },
        },
      })
    )) as any;

    return res.status(200).json(Item);
  }

  // if (req.method === "POST") {
  //   const { Attributes } = await client.send(
  //     new UpdateItemCommand({
  //       TableName: process.env.AWS_TABLE_NAME,
  //       Key: {
  //         animation_name: { S: "showcase" },
  //         value_name: { S: "clickCount" },
  //       },
  //       UpdateExpression: "set content = :c",
  //       ExpressionAttributeValues: {
  //         ":c": { S: req.body.content },
  //       },
  //       ReturnValues: "ALL_NEW",
  //     })
  //   );

  //   console.log({ Attributes });

  //   return res.status(200).json(Attributes);
  // }

  // if (req.method === "DELETE") {
  //   await client.send(
  //     new DeleteItemCommand({
  //       TableName: process.env.AWS_TABLE_NAME,
  //       Key: {
  //         animation_name: { S: "showcase" },
  //         value_name: { S: "clickCount" },
  //       },
  //     })
  //   );

  //   return res.status(204).json({});
  // }
}
