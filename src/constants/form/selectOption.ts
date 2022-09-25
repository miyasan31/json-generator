import type { ArrayValueTypeOption, ObjectValueTypeOption } from "~/interfaces/model/object";
import type {
  BooleanDummyTypeOption,
  NumberDummyTypeOption,
  StringDummyTypeOption,
} from "~/interfaces/model/primitive";

export const jsonLengthOption = [
  { value: "1", label: "1" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export const stringDummyTypeOption: StringDummyTypeOption[] = [
  { value: "autoIncrement", label: "autoIncrement" },
  { value: "fullName", label: "full name" },
  { value: "firstName", label: "first name" },
  { value: "lastName", label: "last name" },
  { value: "email", label: "email" },
  { value: "password", label: "password" },
  { value: "dateTime", label: "date time" },
  { value: "date", label: "date" },
  { value: "time", label: "time" },
  { value: "image", label: "image" },
  { value: "uuid", label: "uuid" },
  { value: "cuid", label: "cuid" },
  { value: "local", label: "local" },
  { value: "country", label: "country" },
  { value: "prefecture", label: "prefecture" },
  { value: "address", label: "address" },
  { value: "zipCode", label: "zip code" },
  { value: "profile", label: "profile" },
  { value: "article", label: "article" },
  { value: "tweet", label: "tweet" },
  { value: "pokemon", label: "pokemon" },
  { value: "animal", label: "animal" },
];

export const numberDummyTypeOption: NumberDummyTypeOption[] = [
  { value: "autoIncrement", label: "autoIncrement" },
  { value: "age", label: "age" },
  { value: "height", label: "height" },
  { value: "weight", label: "weight" },
  { value: "price", label: "price" },
  { value: "random", label: "random" },
  { value: "zipCode", label: "zip code" },
];

export const booleanDummyTypeOption: BooleanDummyTypeOption[] = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
  { value: "random", label: "random" },
];

export const arrayValueTypeOption: ArrayValueTypeOption[] = [
  { value: "string", label: "string" },
  { value: "number", label: "number" },
  { value: "boolean", label: "boolean" },
  { value: "object", label: "object" },
];

export const objectValueTypeOption: ObjectValueTypeOption[] = [
  { value: "string", label: "string" },
  { value: "number", label: "number" },
  { value: "boolean", label: "boolean" },
  { value: "array", label: "array" },
  { value: "object", label: "object" },
];
