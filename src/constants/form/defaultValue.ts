import type { JsonCreateForm } from "~/interfaces/model/From.interface";

export const defaultValues: JsonCreateForm = {
  length: 5,
  object: [
    {
      keyName: "id",
      valueType: "number",
      options: { dummyType: "autoincrement" },
    },
    {
      keyName: "tweet",
      valueType: "string",
      options: { dummyType: "name", prefix: "", suffix: "" },
    },
    {
      keyName: "admin",
      valueType: "boolean",
      options: { dummyType: "random" },
    },
    {
      keyName: "idList",
      valueType: "array",
      options: {
        length: 5,
        item: {
          keyName: "id",
          valueType: "number",
          options: { dummyType: "autoincrement" },
        },
      },
    },
    {
      keyName: "user",
      valueType: "object",
      options: {
        object: [
          {
            keyName: "id",
            valueType: "number",
            options: { dummyType: "autoincrement" },
          },
          {
            keyName: "name",
            valueType: "string",
            options: { dummyType: "name", prefix: "", suffix: "" },
          },
          {
            keyName: "avatar",
            valueType: "string",
            options: { dummyType: "name", prefix: "", suffix: "" },
          },
        ],
      },
    },
  ],
};
