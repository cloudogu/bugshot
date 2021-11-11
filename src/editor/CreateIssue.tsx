import React, { FC } from "react";
import { useForm } from "react-hook-form";
import useCreateIssue, { Issue } from "./useCreateIssue";
import { Screenshot } from "./Screenshot";
import InputField from "./InputField";
import Button from "./Button";

type Props = {
  screenshot: Screenshot;
};

const CreateIssue: FC<Props> = ({ screenshot }) => {
  const { create, isLoading, error } = useCreateIssue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>();
  return (
    <form onSubmit={handleSubmit((issue) => create(issue, screenshot))}>
      <h2 tw="text-2xl font-bold">Create Issue</h2>
      {error ? (
        <p tw="text-red-700">
          <strong>Error</strong> {error.message}
        </p>
      ) : null}
      <div tw="mt-8 grid grid-cols-1 gap-6">
        <InputField
          label="Subject"
          {...register("subject", { required: true })}
          error={errors.subject ? "Subject is required" : null}
        />
        <label tw="block">
          <span tw="text-gray-700">Description</span>
          <textarea tw="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" {...register("description")}></textarea>
        </label>
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateIssue;
