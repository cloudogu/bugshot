import React, { FC } from "react";
import { useForm } from "react-hook-form";
import useCreateIssue, { CreatedIssue } from "./useCreateIssue";
import { Screenshot } from "../api/types";
import InputField from "../form/InputField";
import Button from "../form/Button";
import { Connection } from "./useConnection";
import Textarea from "../form/Textarea";
import ErrorNotification from "../form/ErrorNotification";
import FormContainer from "../form/FormContainer";
import Select from "../form/Select";
import useTemplates from "./useTemplates";

type Props = {
  connection: Connection;
  screenshot: Screenshot;
  bugshot: BugShot;
};

type CreateIssueForm = {
  subject: string;
  description: string;
  template: string;
};

const CreateIssue: FC<Props> = ({ connection, screenshot, bugshot }) => {
  const { create, isLoading, error } = useCreateIssue();
  const { selected, templates } = useTemplates();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    defaultValues: {
      template: selected,
    },
  });

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
    <form
      onSubmit={handleSubmit((issue) =>
        create(
          {
            subject: issue.subject,
            description: issue.description,
            template: templates[issue.template],
            screenshot,
          },
          bugshot,
          close
        )
      )}
    >
      <ErrorNotification error={error} />
      <FormContainer>
        <Select
          label="Template"
          {...register("template", { required: true })}
          error={errors.template ? "Template is required" : null}
        >
          {Object.keys(templates).map((template) => (
            <option key={template}>{template}</option>
          ))}
        </Select>
        <InputField
          label="Subject"
          {...register("subject", { required: true })}
          error={errors.subject ? "Subject is required" : null}
        />
        <Textarea label="Description" {...register("description")} />
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </FormContainer>
    </form>
  );
};

export default CreateIssue;
