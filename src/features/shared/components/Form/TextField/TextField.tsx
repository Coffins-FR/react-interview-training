import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/src/features/shared/components/ui/field";
import type { TextFieldProps } from "@/src/features/shared/components/Form/TextField/type";
import { useFieldContext } from "@/src/features/shared/context/form/FormContext";

export const TextField = ({
  label,
  description,
  placeholder,
  required,
  disabled,
  type = "text",
}: TextFieldProps) => {
  const field = useFieldContext<
    string | number | readonly string[] | undefined
  >();
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        type={type}
        inputMode={type === "number" ? "numeric" : undefined}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="py-2 px-4 border-border border-2 rounded w-full"
      />
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

export default TextField;
