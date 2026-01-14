import type { DynamicFormType } from "@/src/features/dynamicform/type";

export function isDynamicFormType(data: unknown): data is DynamicFormType {
  return (
    typeof data === "object" &&
    data !== null &&
    "formId" in data &&
    "title" in data &&
    "description" in data &&
    "submit" in data &&
    "sections" in data &&
    Array.isArray((data as DynamicFormType).sections)
  );
}

export function isDynamicFormFieldArray(
  data: unknown
): data is DynamicFormType["sections"] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "label" in item &&
        "type" in item &&
        "required" in item
    )
  );
}

export function isTextFieldType(
  data: unknown
): data is "text" | "email" | "password" | "number" {
  return (
    typeof data === "string" &&
    (data === "text" ||
      data === "email" ||
      data === "password" ||
      data === "number")
  );
}

export function isSelectFieldType(data: unknown): data is "select" {
  return typeof data === "string" && data === "select";
}

export function isCheckboxFieldType(
  data: unknown
): data is "checkbox" | "checkbox-group" {
  return typeof data === "string" && data === "checkbox";
}

export function isRadioFieldType(
  data: unknown
): data is "radio" | "radio-group" {
  return typeof data === "string" && data === "radio";
}

export function isTextareaFieldType(data: unknown): data is "textarea" {
  return typeof data === "string" && data === "textarea";
}

export function isDateFieldType(data: unknown): data is "date" {
  return typeof data === "string" && data === "date";
}

export function isTelFieldType(data: unknown): data is "tel" {
  return typeof data === "string" && data === "tel";
}

export function isUrlFieldType(data: unknown): data is "url" {
  return typeof data === "string" && data === "url";
}

export function isFileFieldType(data: unknown): data is "file" {
  return typeof data === "string" && data === "file";
}
export function isDynamicFormMethod(
  data: unknown
): data is "GET" | "POST" | "PUT" | "DELETE" {
  return (
    typeof data === "string" &&
    (data === "GET" || data === "POST" || data === "PUT" || data === "DELETE")
  );
}

export function isToggleFieldType(data: unknown): data is "toggle" {
  return typeof data === "string" && data === "toggle";
}
