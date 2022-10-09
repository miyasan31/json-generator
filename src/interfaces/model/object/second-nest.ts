import type { BooleanValue } from "~/interfaces/model/primitive/boolean";
import type { NumberValue } from "~/interfaces/model/primitive/number";
import type { StringValue } from "~/interfaces/model/primitive/string";

/** array */
export type SecondNestArrayItemType = StringValue | NumberValue | BooleanValue;

/** object */
export type SecondNestObjectPropertyType = StringValue | NumberValue | BooleanValue;
