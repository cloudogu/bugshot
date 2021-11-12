import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Connection } from "./useConnection";
import InputField from "../form/InputField";
import Button from "../form/Button";
import "twin.macro";

type Props = {
  setConnection: (connection: Connection) => void;
  error?: Error;
  isLoading: boolean;
};

const CreateConnection: FC<Props> = ({ setConnection, error, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Connection>();

  return (
    <form onSubmit={handleSubmit(setConnection)}>
      <h2 tw="text-2xl font-bold">Create Redmine Connection</h2>
      {error ? (
        <p tw="text-red-700">
          <strong>Error</strong> {error.message}
        </p>
      ) : null}
      <div tw="mt-8 grid grid-cols-1 gap-6">
        <InputField
          label="URL"
          {...register("url", { required: true })}
          error={errors.url && "Url is required"}
        />
        <InputField
          label="API Key"
          {...register("apiKey", { required: true })}
          error={errors.apiKey && "API Key is required"}
        />
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateConnection;
