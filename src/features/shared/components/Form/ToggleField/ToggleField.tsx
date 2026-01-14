import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/src/features/shared/components/ui/field";
import { Switch } from "@/src/features/shared/components/ui/switch";
import { useFieldContext } from "@/src/features/shared/context/form/FormContext";
import type { ToggleFieldProps } from "./type";
import useToggle from "@/src/features/shared/hooks/useToggle";

const ToggleField = ({
  label,
  description,
  defaultChecked,
}: ToggleFieldProps) => {
  const field = useFieldContext<
    string | number | readonly string[] | undefined
  >();
  const [toggle, setToggle] = useToggle(defaultChecked || false);

  const handleChange = () => {
    setToggle();
    field.setValue(String(!toggle));
  };

  return (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      <Switch
        id={field.name}
        name={field.name}
        defaultChecked={defaultChecked}
        onCheckedChange={() => handleChange()}
        value={field.state.value}
        onBlur={field.handleBlur}
      />
    </Field>
  );
};

export default ToggleField;
