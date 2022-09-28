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
      options: { stringDummyType: "fullName", prefix: "", suffix: "" },
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
                keyName: "like",
                valueType: "number",
                options: {
                  numberDummyType: "random",
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
