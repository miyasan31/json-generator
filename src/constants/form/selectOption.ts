import type { ArrayValueTypeOption, ObjectValueTypeOption } from "~/interfaces/model/object";
import type { BooleanDummyTypeOption } from "~/interfaces/model/primitive/boolean";
import type { NumberDummyTypeOption } from "~/interfaces/model/primitive/number";
import type { StringDummyTypeOption } from "~/interfaces/model/primitive/string";

/** JSON生成数のセレクトオプション */
export const JSON_LENGTH_OPTIONS = [
  { value: "1", label: "1" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

/** String型ダミーデータのセレクトオプション */
export const STRING_DUMMY_TYPE_OPTIONS: StringDummyTypeOption[] = [
  { value: "any", label: "任意" },
  { value: "autoIncrement", label: "連番" },
  { value: "fullName", label: "姓 + 名" },
  { value: "firstName", label: "姓" },
  { value: "lastName", label: "名" },
  { value: "email", label: "メールアドレス" },
  { value: "password", label: "パスワード" },
  { value: "dateTime", label: "日時" },
  // { value: "date", label: "date" },
  // { value: "time", label: "time" },
  { value: "image", label: "画像" },
  { value: "dataUli", label: "Data URI" },
  { value: "uuid", label: "uuid" },
  // { value: "cuid", label: "cuid" },
  // { value: "ulid", label: "ulid" },
  // { value: "local", label: "local" },
  { value: "country", label: "国名" },
  // { value: "city", label: "city" },
  // { value: "prefecture", label: "prefecture" },
  // { value: "address", label: "address" },
  { value: "zipCode", label: "郵便番号" },
  // { value: "profile", label: "profile" },
  // { value: "article", label: "article" },
  // { value: "tweet", label: "tweet" },
  // { value: "pokemon", label: "pokemon" },
  { value: "ipAddress", label: "IPアドレス" },
  { value: "domain", label: "ドメイン" },
  { value: "phone", label: "電話番号" },
  // { value: "role", label: "role" },
  // { value: "tech", label: "tech" },
];

/** Number型ダミーデータのセレクトオプション */
export const NUMBER_DUMMY_TYPE_OPTIONS: NumberDummyTypeOption[] = [
  { value: "any", label: "任意" },
  { value: "random", label: "ランダム" },
  { value: "autoIncrement", label: "連番" },
  { value: "age", label: "年齢" },
  { value: "height", label: "身長" },
  { value: "weight", label: "体重" },
  // { value: "amount", label: "amount" },
  // { value: "volume", label: "volume" },
  // { value: "priority", label: "priority" },
  // { value: "permission", label: "permission" },
];

/** Boolean型ダミーデータのセレクトオプション */
export const BOOLEAN_DUMMY_TYPE_OPTIONS: BooleanDummyTypeOption[] = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
  { value: "random", label: "ランダム" },
];

/** Array型のデータ型のセレクトオプション */
export const ARRAY_VALUE_TYPE_OPTIONS: ArrayValueTypeOption[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "object", label: "Object" },
];

/** Object型のデータ型のセレクトオプション */
export const OBJECT_VALUE_TYPE_OPTIONS: ObjectValueTypeOption[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "array", label: "Array" },
  { value: "object", label: "Object" },
];
