import { IJson } from "../model/json.ts";
import { ArrayValue, ObjectValue } from "../model/object/index.ts";
import { BooleanValue, NumberValue, StringValue } from "../model/primitive.ts";

export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface ICreateJson {
  length: number;
  json: JsonValue[];
}

export type ICreateJsonResponse = IJson[] | IJson;
