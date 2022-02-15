import React, { TextareaHTMLAttributes } from "react";
import FieldError from "./FieldError";
import Label from "./Label";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string | null;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => (
    <Label value={label}>
      <textarea
        className="h-80 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={label}
        ref={ref}
        {...props}
      ></textarea>
      <FieldError error={error} />
    </Label>
  )
);

export default Textarea;
