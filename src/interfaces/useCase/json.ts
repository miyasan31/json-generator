import type { IJson } from "~/interfaces/model/json";
import type { ArrayValue, ObjectValue } from "~/interfaces/model/object";
import type { BooleanValue, NumberValue, StringValue } from "~/interfaces/model/primitive";

export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface ICreateJson {
  length: number;
  json: JsonValue[];
}

export type ICreateJsonResponse = IJson[] | IJson;
