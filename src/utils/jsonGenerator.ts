import type {
  ArrayItemType,
  BooleanDummyType,
  JsonValue,
  NumberDummyType,
  StringDummyType,
} from "~/components/feature/form/From.interface";
import type { ArrayValue, ObjectValue } from "~/components/feature/form/Generator.interface";

const StringGenerator = (options: { dummyType: StringDummyType; prefix: string; suffix: string }): string => {
  const { dummyType, prefix, suffix } = options;
  switch (dummyType) {
    case "name":
      return `${prefix}name${suffix}`;
    case "email":
      return `${prefix}email${suffix}`;
    case "date":
      return `${prefix}date${suffix}`;
    case "time":
      return `${prefix}time${suffix}`;
    case "dateTime":
      return `${prefix}datetime${suffix}`;
    case "password":
      return `${prefix}password${suffix}`;
    case "image":
      return `${prefix}image${suffix}`;
    default:
      return `${prefix}${suffix}`;
  }
};

const NumberGenerator = (options: { dummyType: NumberDummyType }, index: number): number => {
  const { dummyType } = options;
  switch (dummyType) {
    case "autoincrement":
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
    default:
      return 0;
  }
};

const BooleanGenerator = (options: { dummyType: BooleanDummyType }): boolean => {
  const { dummyType } = options;
  switch (dummyType) {
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

const arrayGenerator = (options: { item: ArrayItemType; length: number }): ArrayValue => {
  const { item, length } = options;
  switch (item.valueType) {
    case "string":
      return [...new Array(length)].map(() => StringGenerator(item.options));
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
        return { ...json, [property.keyName]: StringGenerator(property.options) };
      case "number":
        return { ...json, [property.keyName]: NumberGenerator(property.options, index) };
      case "boolean":
        return { ...json, [property.keyName]: BooleanGenerator(property.options) };
      case "object":
        return {
          ...json,
          [property.keyName]: property.options.object ? jsonGenerator(property.options.object, index) : {},
        };
      case "array":
        return { ...json, [property.keyName]: arrayGenerator(property.options) };
    }
  }, {});
};
