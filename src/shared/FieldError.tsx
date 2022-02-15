import React, { FC } from "react";

type Props = {
  error?: string | null;
};

const FieldError: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  return <p className="mt-2 text-red-700">{error}</p>;
};

export default FieldError;
