import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { connectionTypes, InitialConnection } from "../api/types";
import Button from "../shared/Button";
import ErrorNotification from "../shared/ErrorNotification";
import FormContainer from "../shared/FormContainer";
import GettingStarted from "../shared/GettingStarted";
import InputField from "../shared/InputField";
import Select from "../shared/Select";
import Title from "../shared/Title";
import useCreateConnection from "./useCreateConnection";

const CreateConnection: FC = () => {
  const { create, isLoading, error } = useCreateConnection();
  const [configured, setConfigured] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialConnection>();

  const onSubmit = (connection: InitialConnection) => {
    create(connection, () => {
      chrome.runtime.sendMessage({
        type: "connection_stored",
      });

      setConfigured(true);
    });
  };

  if (configured) {
    return (
      <GettingStarted>
        <Button className="mt-6 w-full" onClick={window.close}>
          OK
        </Button>
      </GettingStarted>
    );
  }

  return (
    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
      <Title>{chrome.i18n.getMessage("connectionTitle")}</Title>
      <ErrorNotification error={error} />
      <FormContainer>
        <InputField
          label={`${connectionTypes[0]} ${chrome.i18n.getMessage("connectionUrl")}`}
          autoFocus
          {...register("url", { required: true })}
          error={errors.url && chrome.i18n.getMessage("validationUrlMissing")}
        />
        <p className="bg-blue-500 rounded-md p-4 text-white">{chrome.i18n.getMessage("connectionApiKeyHint")}</p>
        <InputField
          label={chrome.i18n.getMessage("connectionUsername")}
          {...register("username", { required: true })}
          error={errors.username && chrome.i18n.getMessage("validationUsernameMissing")}
        />
        <InputField
          label={chrome.i18n.getMessage("connectionPassword")}
          type="password"
          {...register("password", { required: true })}
          error={errors.password && chrome.i18n.getMessage("validationPasswordMissing")}
        />
        <Select
          label={chrome.i18n.getMessage("connectionType")}
          {...register("type", { required: true })}
        >
          {connectionTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
        <Button type="submit" isLoading={isLoading}>
          {chrome.i18n.getMessage("connectionLoginButton")}
        </Button>
      </FormContainer>
    </form>
  );
};

export default CreateConnection;
