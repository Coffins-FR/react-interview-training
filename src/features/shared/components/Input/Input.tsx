import clsx from "clsx";
import React, { forwardRef } from "react";
import { Field, FieldLabel } from "@/src/features/shared/components/ui/field";

interface InputProps {
  className?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, onChange, className }, ref) => {
    const mainClassName = clsx(className, "flex flex-col gap-2");
    return (
      <Field className={mainClassName}>
        <FieldLabel>{label}</FieldLabel>
        <input
          className="border border-grey-300 rounded-md p-2"
          type="text"
          ref={ref}
          onChange={onChange}
        />
      </Field>
    );
  }
);

export default Input;
