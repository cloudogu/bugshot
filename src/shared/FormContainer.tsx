import React, { FC } from "react";

const FormContainer: FC = ({ children }) => (
  <div className="mt-4 grid grid-cols-1 gap-6">{children}</div>
);

export default FormContainer;
