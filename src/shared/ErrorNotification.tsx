import React, { FC } from "react";
import "twin.macro";

type Props = {
  error?: Error | string;
};

const isError = (error: Error | string): error is Error => {
  return (error as Error).message !== undefined;
};

const ErrorNotification: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <p tw="text-red-700">
      <strong>Error</strong> {isError(error) ? error.message : error}
    </p>
  );
};

export default ErrorNotification;
