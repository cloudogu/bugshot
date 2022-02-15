import React, { InputHTMLAttributes } from "react";
import FieldError from "./FieldError";
import Label from "./Label";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
};

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <Label value={label}>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={label}
        type="text"
        ref={ref}
        {...props}
      />
      <FieldError error={error} />
    </Label>
  )
);

export default InputField;
