import type { ICreateJson } from "~/interfaces/useCase/json";

export const defaultValues: ICreateJson = {
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
      keyName: "articles",
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
                keyName: "name",
                valueType: "string",
                options: {
                  stringDummyType: "article",
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
