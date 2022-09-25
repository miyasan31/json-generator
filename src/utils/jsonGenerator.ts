import type { FirstNestArrayItemType } from "~/interfaces/model/first-nest/object";
import type { SecondNestArrayItemType } from "~/interfaces/model/first-nest/second-nest/object";
import type { JsonValue } from "~/interfaces/model/form";
import type { BooleanDummyType, NumberDummyType, StringDummyType } from "~/interfaces/model/primitive";

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
    case "firstName":
      return `${prefix}{first name}${suffix}`;
    case "lastName":
      return `${prefix}{last name}${suffix}`;
    case "email":
      return `${prefix}{email}${suffix}`;
    case "date":
      return `${prefix}{date}${suffix}`;
    case "time":
      return `${prefix}{time}${suffix}`;
    case "dateTime":
      return `${prefix}{date time}${suffix}`;
    case "password":
      return `${prefix}{password}${suffix}`;
    case "image":
      return `${prefix}{image}${suffix}`;
    case "cuid":
      return `${prefix}{cuid}${suffix}`;
    case "uuid":
      return `${prefix}{uuid}${suffix}`;
    case "local":
      return `${prefix}{local}${suffix}`;
    case "country":
      return `${prefix}{country}${suffix}`;
    case "prefecture":
      return `${prefix}{prefecture}${suffix}`;
    case "address":
      return `${prefix}{address}${suffix}`;
    case "zipCode":
      return `${prefix}{zip code}${suffix}`;
    case "profile":
      return `${prefix}{profile}${suffix}`;
    case "article":
      return `${prefix}{article}${suffix}`;
    case "tweet":
      return `${prefix}{tweet}${suffix}`;
    case "pokemon":
      return `${prefix}{pokemon}${suffix}`;
    case "animal":
      return `${prefix}{animal}${suffix}`;
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
    case "height":
      return Math.floor(Math.random() * 100);
    case "weight":
      return Math.floor(Math.random() * 100);
    case "price":
      return Math.floor(Math.random() * 100);
    case "zipCode":
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
