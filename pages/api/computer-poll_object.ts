import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import Cors from "cors";

export const computerPollObjectUrl = "api/computer-poll_object";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any> | undefined>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const yes = (
      await client.send(
        new GetItemCommand({
          TableName: process.env.AWS_DB_TABLE_NAME,
          Key: {
            animation_name: { S: "computer" },
            variable_name: { S: "yes" },
          },
        })
      )
    ).Item!.variable_value.N;

    const no = (
      await client.send(
        new GetItemCommand({
          TableName: process.env.AWS_DB_TABLE_NAME,
          Key: {
            animation_name: { S: "computer" },
            variable_name: { S: "no" },
          },
        })
      )
    ).Item!.variable_value.N;

    return res.status(200).json({ yes, no });
  }

  if (req.method === "POST") {
    console.log({ body: req.body });
    const yesChange = +req.body.yesChange;
    const noChange = +req.body.noChange;

    const yesResult = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "computer",
          variable_name: "yes",
        },
        UpdateExpression: "SET variable_value = variable_value + :yesChange",
        ExpressionAttributeValues: {
          ":yesChange": yesChange,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    const noResult = await ddbDocClient.send(
      new UpdateCommand({
        TableName: process.env.AWS_DB_TABLE_NAME,
        Key: {
          animation_name: "computer",
          variable_name: "no",
        },
        UpdateExpression: "SET variable_value = variable_value + :noChange",
        ExpressionAttributeValues: {
          ":noChange": noChange,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    if (yesResult.Attributes && noResult.Attributes) {
      const result = {
        animation_name: "computer",
        variable_name: "poll_object",
        variable_value: {
          yes: yesResult.Attributes.variable_value.value,
          no: noResult.Attributes.variable_value.value,
        },
      };

      return res.status(200).json(result);
    }
    return res.status(500);
  }
}
