import React from "react";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { Connection, useSetConnection } from "./connection";
import "twin.macro";
import Button from "./Button";


const CreateConnection = () => {
  const { setConnection, isLoading, error } = useSetConnection();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Connection>();

  return (
    <div tw="p-8 max-w-md">
      <h2 tw="text-2xl font-bold">Create Redmine Connection</h2>
      <form onSubmit={handleSubmit(setConnection)}>
        <div tw="mt-8 grid grid-cols-1 gap-6">
          <InputField
            label="URL"
            {...register("url", { required: true })}
            error={errors.url && "Url is required"}
          />
          <InputField
            label="Username"
            {...register("username", { required: true })}
            error={errors.username && "Username is required"}
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
    </div>
  );
};

export default CreateConnection;
