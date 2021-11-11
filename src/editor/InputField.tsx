import React from "react";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
};

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <label tw="block">
      <span tw="text-gray-700">{label}</span>
      <input
        tw="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={label}
        type="text"
        ref={ref}
        {...props}
      />
      {error && <p tw="text-red-700">{error}</p>}
    </label>
  )
);

export default InputField;
