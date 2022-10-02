/* eslint-disable @typescript-eslint/no-explicit-any */

const arrayConvert = (value: any): any => {
  if (typeof value === "string") {
    return {
      keyName: "key",
      valueType: "string",
      stringDummyType: "any",
      stringOptions: {
        stringAnyValue: value,
      },
    };
  }

  if (typeof value === "number") {
    return {
      keyName: "key",
      valueType: "number",
      numberDummyType: "any",
      numberOptions: {
        numberAnyValue: value,
      },
    };
  }

  if (typeof value === "boolean") {
    return {
      keyName: "key",
      valueType: "boolean",
      booleanDummyType: `${value}`,
    };
  }

  if (Array.isArray(value)) {
    return {
      keyName: "key",
      valueType: "array",
      length: value.length,
      item: jsonConvert(value),
    };
  }

  if (typeof value === "object") {
    return {
      keyName: "key",
      valueType: "object",
      object: jsonConvert(value),
    };
  }

  return {
    keyName: "key",
    valueType: "object",
    object: [],
  };
};

export const jsonConvert = (json: any): any => {
  const data = Array.isArray(json) ? json[0] : json;
  return Object.entries(data).map(([key, value]) => {
    if (typeof value === "string") {
      return {
        keyName: key,
        valueType: "string",
        stringDummyType: "any",
        stringOptions: {
          stringAnyValue: value,
        },
      };
    }

    if (typeof value === "number") {
      return {
        keyName: key,
        valueType: "number",
        numberDummyType: "any",
        numberOptions: {
          numberAnyValue: value,
        },
      };
    }

    if (typeof value === "boolean") {
      return {
        keyName: key,
        valueType: "boolean",
        booleanDummyType: `${value}`,
      };
    }

    if (Array.isArray(value)) {
      return {
        keyName: key,
        valueType: "array",
        length: value.length,
        item: arrayConvert(value[0]),
      };
    }

    if (typeof value === "object") {
      return {
        keyName: key,
        valueType: "object",
        object: jsonConvert(value),
      };
    }

    return {
      keyName: key,
      valueType: "object",
      object: [],
    };
  });
};
