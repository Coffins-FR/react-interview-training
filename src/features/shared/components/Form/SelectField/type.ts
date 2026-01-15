import { type FieldType } from "@/src/features/shared/components/Form/type";

export type SelectFieldProps = FieldType & {
  type?: "checkbox";
  options: { label: string; value: string }[];
};
