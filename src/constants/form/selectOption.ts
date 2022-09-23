import type {
  ArrayValueTypeOption,
  BooleanDummyTypeOption,
  NumberDummyTypeOption,
  ObjectValueTypeOption,
  StringDummyTypeOption,
} from "~/interfaces/model/From.interface";

export const jsonLengthOption = [
  { value: "1", label: "1" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export const stringDummyTypeOption: StringDummyTypeOption[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
  { value: "dateTime", label: "Date-Time" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "image", label: "Image" },
];

export const numberDummyTypeOption: NumberDummyTypeOption[] = [
  { value: "autoincrement", label: "Autoincrement" },
  { value: "age", label: "Age" },
  { value: "height", label: "Height" },
  { value: "weight", label: "Width" },
  { value: "price", label: "Price" },
  { value: "random", label: "Random" },
];

export const booleanDummyTypeOption: BooleanDummyTypeOption[] = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
  { value: "random", label: "Random" },
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
