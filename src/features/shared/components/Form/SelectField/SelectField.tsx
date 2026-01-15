import { type SelectFieldProps } from "./type";
import { useFieldContext } from "@/src/features/shared/context/form/FormContext";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/src/features/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/features/shared/components/ui/select";

const SelectField = ({
  label,
  placeholder,
  options,
  description,
}: SelectFieldProps) => {
  const field = useFieldContext<string | number | string[] | undefined>();

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Select onValueChange={(value) => field.setValue(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
};

export default SelectField;
