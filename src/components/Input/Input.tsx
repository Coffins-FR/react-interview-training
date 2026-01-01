import clsx from "clsx";
import React, { forwardRef } from "react";

interface InputProps {
  className?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, onChange, className }, ref) => {
    const mainClassName = clsx(className, "flex flex-col gap-2");
    return (
      <label className={mainClassName}>
        <span>{label}</span>
        <input
          className="border border-grey-300 rounded-md p-2"
          type="text"
          ref={ref}
          onChange={onChange}
        />
      </label>
    );
  }
);

export default Input;
