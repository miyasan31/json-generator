import type { ArrayValueTypeOption, ObjectValueTypeOption } from "~/interfaces/model/object";
import type {
  BooleanDummyTypeOption,
  NumberDummyTypeOption,
  StringDummyTypeOption,
} from "~/interfaces/model/primitive";

export const jsonLengthOption = [
  { value: "1", label: "1" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export const stringDummyTypeOption: StringDummyTypeOption[] = [
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

export const numberDummyTypeOption: NumberDummyTypeOption[] = [
  { value: "any", label: "任意" },
  { value: "random", label: "ランダム" },
  { value: "autoIncrement", label: "連番" },
  { value: "age", label: "年齢" },
  { value: "height", label: "身長" },
  { value: "weight", label: "体重" },
  { value: "price", label: "価格" },
  // { value: "amount", label: "amount" },
  // { value: "volume", label: "volume" },
  // { value: "priority", label: "priority" },
  // { value: "permission", label: "permission" },
];

export const booleanDummyTypeOption: BooleanDummyTypeOption[] = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
  { value: "random", label: "ランダム" },
];

export const arrayValueTypeOption: ArrayValueTypeOption[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "object", label: "Object" },
];

export const objectValueTypeOption: ObjectValueTypeOption[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "array", label: "Array" },
  { value: "object", label: "Object" },
];
