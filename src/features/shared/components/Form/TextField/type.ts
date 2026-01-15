import { type FieldType } from "@/src/features/shared/components/Form/type";

export type TextFieldProps = FieldType & {
  type: "text" | "email" | "number" | "password";
};
