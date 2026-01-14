import {
  Field,
  FieldLabel,
  FieldError,
} from "@/src/features/shared/components/ui/field";
import { Checkbox } from "@/src/features/shared/components/ui/checkbox";
import type { CheckboxFieldProps } from "@/src/features/shared/components/Form/CheckboxField/type";
import { useFieldContext } from "@/src/features/shared/context/form/FormContext";

const CheckboxField = ({ label, required, disabled }: CheckboxFieldProps) => {
  const field = useFieldContext<
    string | number | readonly string[] | undefined
  >();
  return (
    <Field orientation="horizontal">
      <Checkbox
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) =>
          field.handleChange(checked ? "true" : "false")
        }
        required={required}
        disabled={disabled}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {!field.state.meta.isValid && (
        <FieldError role="alert">
          {field.state.meta.errors
            .map((error: { message: string }) => error.message)
            .join(", ")}
        </FieldError>
      )}
    </Field>
  );
};

export default CheckboxField;
