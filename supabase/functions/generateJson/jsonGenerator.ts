import { FirstNestArrayItemType } from "./interfaces/model/object/first-nest.ts";
import { SecondNestArrayItemType } from "./interfaces/model/object/second-nest.ts";
import { BooleanDummyType, NumberDummyType, StringDummyType } from "./interfaces/model/primitive.ts";
import { JsonValue } from "./interfaces/useCase/json.ts";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

type ArrayValue = string[] | number[] | boolean[] | ObjectValue[];
type ObjectValueType = string | number | boolean | ArrayValue;
type ObjectValue = Record<string, ObjectValueType>;

export const stringGenerator = (
  dummyType: StringDummyType,
  options: { prefix?: string; suffix?: string; stringAnyValue?: string } | null,
  index: number,
): string => {
  faker.setLocale("en");

  if (["autoIncrement", "fullName", "firstName", "lastName", "email"].includes(dummyType)) {
    const prefix = options?.prefix ?? "";
    const suffix = options?.suffix ?? "";

    switch (dummyType) {
      case "autoIncrement":
        return `${prefix}${index}${suffix}`;
      case "fullName":
        faker.setLocale("ja");
        return `${prefix}${faker.helpers.fake("{{name.lastName}} {{name.firstName}}")}${suffix}`;
      case "firstName":
        faker.setLocale("ja");
        return `${prefix}${faker.name.firstName()}${suffix}`;
      case "lastName":
        faker.setLocale("ja");
        return `${prefix}${faker.name.lastName()}${suffix}`;
      case "email":
        return `${prefix}${faker.internet.email()}${suffix}`.toLowerCase();
    }
  }

  if (dummyType === "any") {
    const stringAnyValue = options?.stringAnyValue ?? "";
    return stringAnyValue;
  }

  switch (dummyType) {
    case "password":
      return faker.internet.password();
    case "dateTime":
      return `${faker.datatype.datetime()}`;
    case "image":
      return faker.image.image();
    case "dataUli":
      return faker.image.dataUri();
    case "uuid":
      return faker.datatype.uuid();
    case "country":
      faker.setLocale("ja");
      return faker.address.country();
    case "zipCode":
      return faker.address.zipCode("###-####");
    case "ipAddress":
      return faker.internet.ip();
    case "domain":
      return faker.internet.domainName();
    case "phone":
      return faker.phone.phoneNumber("080-###-###");
    default:
      return "";

    // case "date":
    //   return `${prefix}{date}${suffix}`;
    // case "time":
    //   return `${prefix}{time}${suffix}`;
    // case "cuid":
    //   return `${prefix}{cuid}${suffix}`;
    // case "ulid":
    //   return `${prefix}{ulid}${suffix}`;
    // case "local":
    //   return `${prefix}{local}${suffix}`;
    // case "city":
    //   return `${prefix}{city}${suffix}`;
    // case "address":
    //   return `${prefix}{address}${suffix}`;
    // case "prefecture":
    //   return `${prefix}{prefecture}${suffix}`;
    // case "profile":
    //   return `${prefix}{profile}${suffix}`;
    // case "article":
    //   return `${prefix}{article}${suffix}`;
    // case "tweet":
    //   return `${prefix}{tweet}${suffix}`;
    // case "pokemon":
    //   return `${prefix}{pokemon}${suffix}`;
    // case "role":
    //   return `${prefix}{role}${suffix}`;
    // case "tech":
    //   return `${prefix}{tech}${suffix}`;
  }
};

export const numberGenerator = (
  dummyType: NumberDummyType,
  options: { min?: number; max?: number; numberAnyValue?: number } | null,
  index: number,
): number => {
  if (["random", "price"].includes(dummyType)) {
    const min = options?.min ?? 0;
    const max = options?.max ?? 10000;

    switch (dummyType) {
      case "random":
        return Math.floor(Math.random() * (max - min)) - min;
      case "price":
        return Number(faker.commerce.price(min, max, 0));
    }
  }

  if (dummyType === "any") {
    const numberAnyValue = options?.numberAnyValue ?? 0;
    return numberAnyValue;
  }

  switch (dummyType) {
    case "autoIncrement":
      return index;
    case "age":
      return Math.floor(Math.random() * 100);
    case "height":
      return Math.floor(Math.random() * 100) + 100;
    case "weight":
      return Math.floor(Math.random() * 100) + 30;
    default:
      return 0;
  }

  // case "amount":
  //   return Math.floor(Math.random() * 100);
  // case "volume":
  //   return Math.floor(Math.random() * 100);
  // case "priority":
  //   return Math.floor(Math.random() * 100);
  // case "permission":
  //   return Math.floor(Math.random() * 100);
};

export const booleanGenerator = (booleanDummyType: BooleanDummyType): boolean => {
  switch (booleanDummyType) {
    case "true":
      return true;
    case "false":
      return false;
    case "random":
      return Math.random() > 0.5;
    default:
      return false;
  }
};

type ArrayItemType = FirstNestArrayItemType | SecondNestArrayItemType;

export const arrayGenerator = (length: number, item: ArrayItemType): ArrayValue => {
  switch (item.valueType) {
    case "string":
      return [...new Array(length)].map((_, index) => stringGenerator(item.stringDummyType, item.stringOptions, index));
    case "number":
      return [...new Array(length)].map((_, index) => numberGenerator(item.numberDummyType, item.numberOptions, index));
    case "boolean":
      return [...new Array(length)].map(() => booleanGenerator(item.booleanDummyType));
    case "object":
      return [...new Array(length)].map((_, index) => (item.object ? jsonGenerator(item.object, index) : {}));
    default:
      return [];
  }
};

export const jsonGenerator = (object: JsonValue[], index: number): ObjectValue => {
  return object.reduce((json, property) => {
    switch (property.valueType) {
      case "string":
        return {
          ...json,
          [property.keyName || "key"]: stringGenerator(property.stringDummyType, property.stringOptions, index),
        };
      case "number":
        return {
          ...json,
          [property.keyName || "key"]: numberGenerator(property.numberDummyType, property.numberOptions, index),
        };
      case "boolean":
        return { ...json, [property.keyName || "key"]: booleanGenerator(property.booleanDummyType) };
      case "object":
        return {
          ...json,
          [property.keyName || "key"]: property.object ? jsonGenerator(property.object, index) : {},
        };
      case "array":
        return { ...json, [property.keyName || "key"]: arrayGenerator(property.length, property.item) };
    }
  }, {});
};
