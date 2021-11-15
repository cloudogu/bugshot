import React, { FC } from "react";
import "twin.macro";

const FormContainer: FC = ({ children }) => (
  <div tw="mt-4 grid grid-cols-1 gap-6">{children}</div>
);

export default FormContainer;
