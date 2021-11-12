import React, { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string | null;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => (
    <label tw="block">
    <span tw="text-gray-700">{label}</span>
    <textarea
      tw="h-80 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder={label}
      ref={ref}
      {...props}
    ></textarea>
    {error && <p tw="text-red-700">{error}</p>}
  </label>
  )
);

export default Textarea;
