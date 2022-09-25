export const appendValue = {
  string: {
    stringDummyType: "fullName",
    prefix: "",
    suffix: "",
  },
  number: {
    numberDummyType: "autoIncrement",
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
        stringDummyType: "fullName",
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
          stringDummyType: "fullName",
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
};
