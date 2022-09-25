import type { JsonCreateForm } from "~/interfaces/model/form";

export const defaultValues: JsonCreateForm = {
  length: 1,
  json: [
    {
      keyName: "id",
      valueType: "number",
      options: { numberDummyType: "autoincrement" },
    },
    {
      keyName: "tweet",
      valueType: "string",
      options: { stringDummyType: "name", prefix: "", suffix: "" },
    },
    {
      keyName: "admin",
      valueType: "boolean",
      options: { booleanDummyType: "random" },
    },
    {
      keyName: "idList",
      valueType: "array",
      options: {
        length: 5,
        item: {
          keyName: "id",
          valueType: "number",
          options: { numberDummyType: "autoincrement" },
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
            options: { numberDummyType: "autoincrement" },
          },
          {
            keyName: "name",
            valueType: "string",
            options: { stringDummyType: "name", prefix: "", suffix: "" },
          },
          {
            keyName: "avatar",
            valueType: "string",
            options: { stringDummyType: "name", prefix: "", suffix: "" },
          },
        ],
      },
    },
  ],
};
