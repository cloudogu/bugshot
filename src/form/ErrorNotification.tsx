import React, { FC } from "react";
import "twin.macro";

type Props = {
  error?: Error;
};

const ErrorNotification: FC<Props> = ({error}) => {
  if (!error) {
    return null;
  }
  return (
    <p tw="text-red-700">
      <strong>Error</strong> {error.message}
    </p>
  );
};

export default ErrorNotification;
