import type { JsonCreateForm } from "~/interfaces/model/form";

export const defaultValues: JsonCreateForm = {
  length: 1,
  json: [
    {
      keyName: "id",
      valueType: "number",
      options: { numberDummyType: "autoIncrement" },
    },
    {
      keyName: "name",
      valueType: "string",
      options: { stringDummyType: "autoIncrement", prefix: "", suffix: "" },
    },
    {
      keyName: "isAdmin",
      valueType: "boolean",
      options: { booleanDummyType: "random" },
    },
    {
      keyName: "tweets",
      valueType: "array",
      options: {
        length: 3,
        item: {
          keyName: "id",
          valueType: "object",
          options: {
            object: [
              {
                keyName: "id",
                valueType: "number",
                options: {
                  numberDummyType: "autoIncrement",
                },
              },
              {
                keyName: "body",
                valueType: "string",
                options: {
                  stringDummyType: "tweet",
                  prefix: "",
                  suffix: "",
                },
              },
              {
                keyName: "createdAt",
                valueType: "string",
                options: {
                  stringDummyType: "dateTime",
                  prefix: "",
                  suffix: "",
                },
              },
            ],
          },
        },
      },
    },
  ],
};
