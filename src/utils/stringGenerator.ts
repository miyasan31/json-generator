import { faker } from "@faker-js/faker";

import type { StringDummyType } from "~/interfaces/model/primitive";

export const stringGenerator = (
  dummyType: StringDummyType,
  options: { prefix?: string; suffix?: string; stringAnyValue?: string } | null,
  index: number,
): string => {
  faker.setLocale("en");

  if (["autoIncrement", "fullName", "firstName", "lastName", "email"].includes(dummyType)) {
    const prefix = options?.prefix ?? "";
    const suffix = options?.suffix ?? "";

    switch (dummyType) {
      case "autoIncrement":
        return `${prefix}${index}${suffix}`;
      case "fullName":
        faker.setLocale("ja");
        return `${prefix}${faker.helpers.fake("{{name.lastName}} {{name.firstName}}")}${suffix}`;
      case "firstName":
        faker.setLocale("ja");
        return `${prefix}${faker.name.firstName()}${suffix}`;
      case "lastName":
        faker.setLocale("ja");
        return `${prefix}${faker.name.lastName()}${suffix}`;
      case "email":
        return `${prefix}${faker.internet.email()}${suffix}`.toLowerCase();
    }
  }

  if (dummyType === "any") {
    const stringAnyValue = options?.stringAnyValue ?? "";
    return stringAnyValue;
  }

  switch (dummyType) {
    case "password":
      return faker.internet.password();
    case "dateTime":
      return `${faker.datatype.datetime()}`;
    case "image":
      return faker.image.image();
    case "dataUli":
      return faker.image.dataUri();
    case "uuid":
      return faker.datatype.uuid();
    case "country":
      faker.setLocale("ja");
      return faker.address.country();
    case "zipCode":
      return faker.address.zipCode("###-####");
    case "ipAddress":
      return faker.internet.ip();
    case "domain":
      return faker.internet.domainName();
    case "phone":
      return faker.phone.phoneNumber("080-###-###");
    default:
      return "";

    // case "date":
    //   return `${prefix}{date}${suffix}`;
    // case "time":
    //   return `${prefix}{time}${suffix}`;
    // case "cuid":
    //   return `${prefix}{cuid}${suffix}`;
    // case "ulid":
    //   return `${prefix}{ulid}${suffix}`;
    // case "local":
    //   return `${prefix}{local}${suffix}`;
    // case "city":
    //   return `${prefix}{city}${suffix}`;
    // case "address":
    //   return `${prefix}{address}${suffix}`;
    // case "prefecture":
    //   return `${prefix}{prefecture}${suffix}`;
    // case "profile":
    //   return `${prefix}{profile}${suffix}`;
    // case "article":
    //   return `${prefix}{article}${suffix}`;
    // case "tweet":
    //   return `${prefix}{tweet}${suffix}`;
    // case "pokemon":
    //   return `${prefix}{pokemon}${suffix}`;
    // case "role":
    //   return `${prefix}{role}${suffix}`;
    // case "tech":
    //   return `${prefix}{tech}${suffix}`;
  }
};
