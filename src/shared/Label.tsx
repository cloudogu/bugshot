import React, { FC, LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  value: string;
};

const Label: FC<Props> = ({ value, children, ...props }) => (
  <label className="block" {...props}>
    <span className="text-gray-700">{value}</span>
    {children}
  </label>
);

export default Label;
