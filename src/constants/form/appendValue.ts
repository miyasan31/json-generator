export const appendValue = {
  string: {
    stringDummyType: "fullName",
    stringOptions: {
      prefix: "",
      suffix: "",
    },
  },
  number: {
    numberDummyType: "autoIncrement",
    numberOptions: null,
  },
  boolean: {
    booleanDummyType: "random",
  },
  array: {
    length: 3,
    item: {
      keyName: "",
      valueType: "string",
      stringDummyType: "fullName",
      stringOptions: {
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
        stringDummyType: "fullName",
        stringOptions: {
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
};
