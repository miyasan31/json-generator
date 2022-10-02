import type { ICreateJson } from "~/interfaces/useCase/json";

export const defaultValues: ICreateJson = {
  length: 1,
  json: [
    {
      keyName: "id",
      valueType: "number",
      numberDummyType: "autoIncrement",
      numberOptions: null,
    },
    {
      keyName: "name",
      valueType: "string",
      stringDummyType: "autoIncrement",
      stringOptions: {
        prefix: "",
        suffix: "",
      },
    },
    {
      keyName: "isAdmin",
      valueType: "boolean",
      booleanDummyType: "random",
    },
    {
      keyName: "articles",
      valueType: "array",
      length: 3,
      item: {
        keyName: "id",
        valueType: "object",
        object: [
          {
            keyName: "id",
            valueType: "number",
            numberDummyType: "autoIncrement",
            numberOptions: null,
          },
          {
            keyName: "like",
            valueType: "number",
            numberDummyType: "random",
            numberOptions: {
              min: 1,
              max: 10,
            },
          },
          {
            keyName: "createdAt",
            valueType: "string",
            stringDummyType: "dateTime",
            stringOptions: null,
          },
        ],
      },
    },
  ],
};
