import React, { SelectHTMLAttributes } from "react";
import FieldError from "./FieldError";
import Label from "./Label";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string | null;
};

const Select = React.forwardRef<HTMLSelectElement, Props>(({ label, error, children, ...props }, ref) => (
  <Label value={label}>
    <select
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder={label}
      ref={ref}
      {...props}
    >
      {children}
    </select>
    <FieldError error={error} />
  </Label>
));

export default Select;
