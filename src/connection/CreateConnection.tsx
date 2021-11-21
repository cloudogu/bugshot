import React, { FC } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import Button from "../form/Button";
import "twin.macro";
import ErrorNotification from "../form/ErrorNotification";
import FormContainer from "../form/FormContainer";
import Title from "../form/Title";
import useCreateConnection from "./useCreateConnection";
import { InitialConnection } from "api/types";

const CreateConnection: FC = () => {
  const { create, isLoading, error } = useCreateConnection();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialConnection>();

  const onSubmit = (connection: InitialConnection) => {
    create(connection, () => {
      chrome.runtime.sendMessage({
        type: "connection_stored"
      });

      window.close();
    });
  };

  return (
    <form tw="p-8" onSubmit={handleSubmit(onSubmit)}>
      <Title>Create Redmine Connection</Title>
      <ErrorNotification error={error} />
      <FormContainer>
        <InputField
          label="URL"
          autoFocus={true}
          {...register("url", { required: true })}
          error={errors.url && "Url is required"}
        />
        <p tw="bg-blue-500 rounded-md p-4 text-white">
          The credentials are used only to retrieve the api key from Redmine.
          The api key is used for every further request.
          The key is stored encrypted in the browser's snychronized storage.
        </p>
        <InputField
          label="Username"
          {...register("username", { required: true })}
          error={errors.username && "Username is required"}
        />
        <InputField
          label="Password"
          type="password"
          {...register("password", { required: true })}
          error={errors.password && "Password is required"}
        />
        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </FormContainer>
    </form>
  );
};

export default CreateConnection;
