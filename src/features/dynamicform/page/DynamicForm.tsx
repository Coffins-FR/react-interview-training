import { useMemo, useId } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/src/features/shared/components/ui/card";
import useFetch from "@/src/features/shared/hooks/useFetch/useFetch";
import type { DynamicFormType } from "@/src/features/dynamicform/type";
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldDescription,
} from "@/src/features/shared/components/ui/field";
import {
  isDynamicFormType,
  isTextFieldType,
  isCheckboxFieldType,
  isToggleFieldType,
  isSelectFieldType,
} from "@/src/features/dynamicform/predicates";
import { useAppForm } from "@/src/features/shared/hooks/useAppForm";
import Button from "@/src/features/shared/components/Button/Button";

const DynamicForm = () => {
  const { data, error, loading } = useFetch<DynamicFormType>(
    "/mock/dynamicform/onboardingform.json"
  );

  const fieldID = useId();

  console.log(data);

  const defaultValues = useMemo(() => {
    if (isDynamicFormType(data)) {
      const values: Record<string, unknown> = {};
      data.sections.map((section) =>
        section.fields.forEach((field) => {
          values[field.id] = field.defaultValue || "";
        })
      );
      return values;
    }
    return {};
  }, [data]);

  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-auto max-w-[1024px] pt-16">
      <Card className="px-4">
        <CardHeader className="text-2xl">{data?.title}</CardHeader>
        <CardDescription className="pl-6">{data?.description}</CardDescription>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {isDynamicFormType(data) &&
              data.sections.map((item) => (
                <FieldGroup key={item.id} className="mb-4">
                  <FieldSet>
                    <FieldLegend>{item.title}</FieldLegend>
                    {item.description && (
                      <FieldDescription>{item.description}</FieldDescription>
                    )}
                    <div className="pl-2 space-y-4">
                      {item.fields.map((subField) => (
                        <form.AppField
                          key={fieldID + subField.id}
                          name={subField.id}
                          children={(field) => {
                            if (isTextFieldType(subField)) {
                              return (
                                <field.TextField
                                  name={subField.id}
                                  label={subField.label}
                                  placeholder={subField.placeholder}
                                  // required={subField.required}
                                  type={
                                    subField.type as
                                      | "text"
                                      | "email"
                                      | "password"
                                      | "number"
                                  }
                                />
                              );
                            }
                            if (isCheckboxFieldType(subField)) {
                              return (
                                <field.CheckboxField
                                  name={subField.id}
                                  label={subField.label}
                                  // required={subField.required}
                                />
                              );
                            }
                            if (isToggleFieldType(subField)) {
                              return (
                                <field.ToggleField
                                  name={subField.id}
                                  label={subField.label}
                                  // required={subField.required}
                                  defaultChecked={
                                    subField.defaultValue as boolean
                                  }
                                />
                              );
                            }
                            if (isSelectFieldType(subField)) {
                              return (
                                <field.SelectField
                                  name={subField.id}
                                  label={subField.label}
                                  placeholder={subField.placeholder}
                                  options={
                                    subField.options as {
                                      label: string;
                                      value: string;
                                    }[]
                                  }
                                />
                              );
                            }
                            return (
                              <div>
                                Field {subField.type} is not supported yet !
                              </div>
                            ); // Unsupported field type
                          }}
                        />
                      ))}
                    </div>
                  </FieldSet>
                </FieldGroup>
              ))}
            <Button type="submit" onClick={form.handleSubmit}>
              {data?.submit.label}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicForm;
