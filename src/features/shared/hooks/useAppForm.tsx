import { createFormHook } from "@tanstack/react-form";
import {
  fieldContext,
  formContext,
} from "@/src/features/shared/context/form/FormContext";
import TextField from "@/src/features/shared/components/Form/TextField/TextField";
import CheckboxField from "@/src/features/shared/components/Form/CheckboxField";
import ToggleField from "@/src/features/shared/components/Form/ToggleField/ToggleField";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CheckboxField,
    ToggleField,
  },
  formComponents: {},
});
