import React, { FC, LabelHTMLAttributes } from "react";
import "twin.macro";

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  value: string;
};

const Label: FC<Props> = ({ value, children, ...props }) => (
  <label tw="block" {...props}>
    <span tw="text-gray-700">{value}</span>
    {children}
  </label>
);

export default Label;
