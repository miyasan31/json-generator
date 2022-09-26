import { ArrayValue, ObjectValue } from "./object.ts";
import { BooleanValue, NumberValue, StringValue } from "./primitive.ts";

/** form */
export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface JsonCreateForm {
  length: number;
  json: JsonValue[];
}
