import { type FieldType } from "@/src/features/shared/components/Form/type";

export type ToggleFieldProps = FieldType & {
  defaultChecked?: boolean;
  type?: "toggle";
};
