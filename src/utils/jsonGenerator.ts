import type { FirstNestArrayItemType } from "~/interfaces/model/object/first-nest";
import type { SecondNestArrayItemType } from "~/interfaces/model/object/second-nest";
import type { BooleanDummyType, NumberDummyType, StringDummyType } from "~/interfaces/model/primitive";
import type { JsonValue } from "~/interfaces/useCase/json";

type ArrayValue = string[] | number[] | boolean[] | ObjectValue[];
type ObjectValueType = string | number | boolean | ArrayValue;
type ObjectValue = Record<string, ObjectValueType>;

const StringGenerator = (
  options: { stringDummyType: StringDummyType; prefix: string; suffix: string },
  index: number,
): string => {
  const { stringDummyType, prefix, suffix } = options;
  switch (stringDummyType) {
    case "autoIncrement":
      return `${prefix}{${String(index)}}${suffix}`;
    case "fullName":
      return `${prefix}{full name}${suffix}`;
    // case "firstName":
    //   return `${prefix}{first name}${suffix}`;
    // case "lastName":
    //   return `${prefix}{last name}${suffix}`;
    case "email":
      return `${prefix}{email}${suffix}`;
    case "password":
      return `${prefix}{password}${suffix}`;
    case "dateTime":
      return `${prefix}{date time}${suffix}`;
    // case "date":
    //   return `${prefix}{date}${suffix}`;
    // case "time":
    //   return `${prefix}{time}${suffix}`;
    // case "image":
    //   return `${prefix}{image}${suffix}`;
    // case "cuid":
    //   return `${prefix}{cuid}${suffix}`;
    // case "uuid":
    //   return `${prefix}{uuid}${suffix}`;
    // case "ulid":
    //   return `${prefix}{ulid}${suffix}`;
    // case "local":
    //   return `${prefix}{local}${suffix}`;
    // case "country":
    //   return `${prefix}{country}${suffix}`;
    // case "city":
    //   return `${prefix}{city}${suffix}`;
    // case "address":
    //   return `${prefix}{address}${suffix}`;
    // case "zipCode":
    //   return `${prefix}{zip code}${suffix}`;
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
    // case "ipAddress":
    //   return `${prefix}{ip address}${suffix}`;
    // case "domain":
    //   return `${prefix}{domain}${suffix}`;
    // case "phone":
    //   return `${prefix}{phone}${suffix}`;
    // case "role":
    //   return `${prefix}{role}${suffix}`;
    // case "tech":
    //   return `${prefix}{tech}${suffix}`;
    case "any":
      return `${prefix}{any}${suffix}`;
    default:
      return `${prefix}${suffix}`;
  }
};

const NumberGenerator = (options: { numberDummyType: NumberDummyType }, index: number): number => {
  const { numberDummyType } = options;
  switch (numberDummyType) {
    case "autoIncrement":
      return index;
    case "random":
      return Math.floor(Math.random() * 100);
    case "age":
      return Math.floor(Math.random() * 100);
    // case "height":
    //   return Math.floor(Math.random() * 100);
    // case "weight":
    //   return Math.floor(Math.random() * 100);
    // case "price":
    //   return Math.floor(Math.random() * 100);
    // case "zipCode":
    //   return Math.floor(Math.random() * 100);
    // case "amount":
    //   return Math.floor(Math.random() * 100);
    // case "volume":
    //   return Math.floor(Math.random() * 100);
    // case "priority":
    //   return Math.floor(Math.random() * 100);
    // case "permission":
    //   return Math.floor(Math.random() * 100);
    case "any":
      return Math.floor(Math.random() * 100);
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
