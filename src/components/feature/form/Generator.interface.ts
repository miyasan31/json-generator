type ArrayValueType = string[] | number[] | boolean[] | ObjectValue[];

export type ArrayValue = ArrayValueType;

type ObjectValueType = string | number | boolean | ArrayValue;

export type ObjectValue = Record<string, ObjectValueType>;
