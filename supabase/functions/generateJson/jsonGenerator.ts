import { FirstNestArrayItemType } from "./interfaces/model/object/first-nest.ts";
import { SecondNestArrayItemType } from "./interfaces/model/object/second-nest.ts";
import { BooleanDummyType, NumberDummyType, StringDummyType } from "./interfaces/model/primitive.ts";
import { JsonValue } from "./interfaces/useCase/json.ts";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

type ArrayValue = string[] | number[] | boolean[] | ObjectValue[];
type ObjectValueType = string | number | boolean | ArrayValue;
type ObjectValue = Record<string, ObjectValueType>;

const StringGenerator = (
  options: { stringDummyType: StringDummyType; prefix: string; suffix: string },
  index: number,
): string => {
  faker.setLocale("en");
  const { stringDummyType, prefix, suffix } = options;
  switch (stringDummyType) {
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
    case "password":
      return `${prefix}${faker.internet.password()}${suffix}`;
    case "dateTime":
      return faker.datatype.datetime();
    // case "date":
    //   return `${prefix}{date}${suffix}`;
    // case "time":
    //   return `${prefix}{time}${suffix}`;
    case "image":
      return faker.image.image();
    case "dataUli":
      return faker.image.dataUri();
    // case "cuid":
    //   return `${prefix}{cuid}${suffix}`;
    case "uuid":
      return `${prefix}${faker.datatype.uuid()}${suffix}`;
    // case "ulid":
    //   return `${prefix}{ulid}${suffix}`;
    // case "local":
    //   return `${prefix}{local}${suffix}`;
    case "country":
      faker.setLocale("ja");
      return faker.address.country();
    // case "city":
    //   return `${prefix}{city}${suffix}`;
    // case "address":
    //   return `${prefix}{address}${suffix}`;
    case "zipCode":
      return faker.address.zipCode("###-####");
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
    case "ipAddress":
      return faker.internet.ip();
    case "domain":
      return faker.internet.domainName();
    case "phone":
      return faker.phone.phoneNumber("080-###-###");
    // case "role":
    //   return `${prefix}{role}${suffix}`;
    // case "tech":
    //   return `${prefix}{tech}${suffix}`;
    default:
      return `${prefix}{any}${suffix}`;
  }
};

const NumberGenerator = (options: { numberDummyType: NumberDummyType }, index: number): number => {
  const { numberDummyType } = options;
  switch (numberDummyType) {
    case "autoIncrement":
      return index;
    case "random":
      return Math.floor(Math.random() * 1000);
    case "age":
      return Math.floor(Math.random() * 100);
    case "height":
      return Math.floor(Math.random() * 100) + 100;
    case "weight":
      return Math.floor(Math.random() * 100) + 100;
    case "price":
      return Number(faker.commerce.price(100, 2000, 0));
    // case "amount":
    //   return Math.floor(Math.random() * 100);
    // case "volume":
    //   return Math.floor(Math.random() * 100);
    // case "priority":
    //   return Math.floor(Math.random() * 100);
    // case "permission":
    //   return Math.floor(Math.random() * 100);
    default:
      return 0;
  }
};

const BooleanGenerator = (options: { booleanDummyType: BooleanDummyType }): boolean => {
  const { booleanDummyType } = options;
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

const arrayGenerator = (options: { item: ArrayItemType; length: number }): ArrayValue => {
  const { item, length } = options;
  switch (item.valueType) {
    case "string":
      return [...new Array(length)].map((_, index) => StringGenerator(item.options, index));
    case "number":
      return [...new Array(length)].map((_, index) => NumberGenerator(item.options, index));
    case "boolean":
      return [...new Array(length)].map(() => BooleanGenerator(item.options));
    case "object":
      return [...new Array(length)].map((_, index) =>
        item.options.object ? jsonGenerator(item.options.object, index) : {},
      );
    default:
      return [];
  }
};

export const jsonGenerator = (object: JsonValue[], index: number): ObjectValue => {
  return object.reduce((json, property) => {
    switch (property.valueType) {
      case "string":
        return { ...json, [property.keyName || "key"]: StringGenerator(property.options, index) };
      case "number":
        return { ...json, [property.keyName || "key"]: NumberGenerator(property.options, index) };
      case "boolean":
        return { ...json, [property.keyName || "key"]: BooleanGenerator(property.options) };
      case "object":
        return {
          ...json,
          [property.keyName || "key"]: property.options.object ? jsonGenerator(property.options.object, index) : {},
        };
      case "array":
        return { ...json, [property.keyName || "key"]: arrayGenerator(property.options) };
    }
  }, {});
};
