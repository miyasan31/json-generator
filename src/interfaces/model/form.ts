import type { ArrayValue, ObjectValue } from "~/interfaces/model/object";
import type { BooleanValue, NumberValue, StringValue } from "~/interfaces/model/primitive";

/** form */
export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface JsonCreateForm {
  length: number;
  json: JsonValue[];
}
