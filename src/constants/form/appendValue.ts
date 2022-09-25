export const appendValue = {
  string: {
    stringDummyType: "name",
    prefix: "",
    suffix: "",
  },
  number: {
    numberDummyType: "autoincrement",
  },
  boolean: {
    booleanDummyType: "random",
  },
  array: {
    length: 3,
    item: {
      keyName: "",
      valueType: "string",
      options: {
        stringDummyType: "name",
        prefix: "",
        suffix: "",
      },
    },
  },
  object: {
    object: [
      {
        keyName: "",
        valueType: "string",
        options: {
          stringDummyType: "name",
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
};
