export type DynamicFormType = {
  formId: string;
  title: string;
  description: string;
  submit: DynamicFormSubmit;
  sections: DynamicFormSection[];
};

export type DynamicFormValidation = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
  rules?: DynamicFormValidation[];
};

export type DynamicFormField = {
  id: string;
  label: string;
  type: DynamicFormFieldType;
  placeholder?: string;
  required: boolean;
  visibleWhen?: {
    fieldId: string;
    value: string | number | boolean;
  };
  options?: { label: string; value: string }[];
  defaultValue?: string | number | boolean;
  validation?: DynamicFormValidation;
  dependsOn?: {
    fieldId: string;
    value: string | number | boolean;
  };
};

export type DynamicFormSubmit = {
  label: string;
  endpoint: string;
  method: DynamicFormMethod;
};

export type DynamicFormSection = {
  id: string;
  title: string;
  description?: string;
  fields: DynamicFormField[];
};

export type DynamicFormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea"
  | "date"
  | "tel"
  | "url"
  | "file"
  | "checkbox-group"
  | "radio-group"
  | "toggle";

export enum DynamicFormMethod {
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
}
