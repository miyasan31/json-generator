/** データ型変更時の初期値 */
export const APPEND_VALUES = {
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
