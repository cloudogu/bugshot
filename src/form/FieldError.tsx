import React, { FC } from "react";
import "twin.macro";

type Props = {
  error?: string | null;
};

const FieldError: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  return <p tw="mt-2 text-red-700">{error}</p>;
};

export default FieldError;
