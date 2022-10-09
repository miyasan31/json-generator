import type { ArrayValue, ObjectValue } from "~/interfaces/model/object";
import type { BooleanValue } from "~/interfaces/model/primitive/boolean";
import type { NumberValue } from "~/interfaces/model/primitive/number";
import type { StringValue } from "~/interfaces/model/primitive/string";

export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface ICreateJson {
  length: number;
  json: JsonValue[];
}

type IJson = Record<string, string>;

export type ICreateJsonResponse = IJson[] | IJson;
