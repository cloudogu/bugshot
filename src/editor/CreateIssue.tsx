import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import useCreateIssue, { CreatedIssue, Issue } from "./useCreateIssue";
import { Screenshot } from "./Screenshot";
import InputField from "./InputField";
import Button from "./Button";
import useConnection, { Connection } from "./useConnection";

type Props = {
  connection: Connection;
  screenshot: Screenshot;
  bugshot: BugShot;
};

const CreateIssue: FC<Props> = ({ connection, screenshot, bugshot }) => {
  const { create, isLoading, error } = useCreateIssue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>();

  const close = (issue: CreatedIssue) => {
    let baseUrl = connection.url;
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
    }

    chrome.notifications.create(`bugshot-${baseUrl}issues/${issue.id}`, {
      type: "basic",
      iconUrl: "camera.png",
      title: `Created issue ${issue.id}`,
      message: `Bugshot create a new issue with the id ${issue.id}`,
      buttons: [
        {
          title: "Open",
          iconUrl: "camera.png",
        },
      ],
    });

    setTimeout(() => {
      chrome.tabs.getCurrent((tab) => {
        if (tab && tab.id) {
          chrome.tabs.remove(tab.id);
        }
      });
    }, 50);
  };

  return (
    <form onSubmit={handleSubmit((issue) => create(issue, screenshot, bugshot, close))}>
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
          <textarea
            tw="h-80 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Issue description"
            {...register("description")}
          ></textarea>
        </label>
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateIssue;
