import React, { FC } from "react";
import "twin.macro";

const FormContainer: FC = ({ children }) => (
  <div tw="mt-8 grid grid-cols-1 gap-6">{children}</div>
);

export default FormContainer;
