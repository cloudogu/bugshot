import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Connection } from "./useConnection";
import InputField from "../form/InputField";
import Button from "../form/Button";
import "twin.macro";
import ErrorNotification from "../form/ErrorNotification";
import FormContainer from "../form/FormContainer";
import Title from "./Title";

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
      <Title>Create Redmine Connection</Title>
      <ErrorNotification error={error} />
      <FormContainer>
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
      </FormContainer>
    </form>
  );
};

export default CreateConnection;
