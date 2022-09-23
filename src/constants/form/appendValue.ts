export const appendValue = {
  string: {
    dummyType: "name",
    prefix: "",
    suffix: "",
  },
  number: {
    dummyType: "autoincrement",
  },
  boolean: {
    dummyType: "random",
  },
  array: {
    length: 3,
    item: {
      keyName: "",
      valueType: "string",
      options: {
        dummyType: "name",
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
          dummyType: "name",
          prefix: "",
          suffix: "",
        },
      },
    ],
  },
};
