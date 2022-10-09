import { ActionIcon, Space } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type OptionToggleButtonProps = {
  isVisible: boolean;
  onToggle: () => void;
  name: {
    valueType: FilterFieldPath<FieldPath<ICreateJson>, "valueType">;
    stringDummyType: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
    numberDummyType: FilterFieldPath<FieldPath<ICreateJson>, "numberDummyType">;
  };
};

export const OptionToggleButton: FC<OptionToggleButtonProps> = ({ name, onToggle, isVisible }) => {
  const { control } = useCreateJsonFormContext();
  const type = useWatch({ name: name.valueType, control });
  const stringDummyType = useWatch({ name: name.stringDummyType, control });
  const numberDummyType = useWatch({ name: name.numberDummyType, control });

  const isOptionVisible =
    type === "string"
      ? ["autoIncrement", "fullName", "firstName", "lastName", "email", "any"].includes(stringDummyType)
      : type === "number"
      ? numberDummyType === "random"
      : ["array", "object"].includes(type);

  if (!isOptionVisible) return <Space w={28} />;

  return (
    <ActionIcon mt={26} component="button" onClick={onToggle}>
      {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
    </ActionIcon>
  );
};
