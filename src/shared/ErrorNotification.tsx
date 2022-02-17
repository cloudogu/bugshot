import React, { FC } from "react";

type Props = {
  error?: Error | string;
};

const isError = (error: Error | string): error is Error => (error as Error).message !== undefined;

const ErrorNotification: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <p className="text-red-700">
      <strong>Error</strong> {isError(error) ? error.message : error}
    </p>
  );
};

export default ErrorNotification;
