export type FilterFieldPath<FieldPaths, FilterString extends string> = FieldPaths extends `${infer T}.${FilterString}`
  ? `${T}.${FilterString}`
  : never;
