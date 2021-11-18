import React, { FC } from "react";
import { useForm } from "react-hook-form";
import useCreateIssue, { CreatedIssue } from "./useCreateIssue";
import { Screenshot, BugShot } from "../api/types";
import InputField from "../form/InputField";
import Button from "../form/Button";
import { Connection } from "./useConnection";
import Textarea from "../form/Textarea";
import ErrorNotification from "../form/ErrorNotification";
import FormContainer from "../form/FormContainer";
import Select from "../form/Select";
import { TemplateEntry } from "./useTemplates";

type Props = {
  connection: Connection;
  screenshot: Screenshot;
  bugshot?: BugShot;
  templates: TemplateEntry[];
};

type CreateIssueForm = {
  subject: string;
  description: string;
  template: string;
};

const CreateIssue: FC<Props> = ({
  connection,
  screenshot,
  bugshot,
  templates,
}) => {
  const { create, isLoading, error } = useCreateIssue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>();

  const onSubmit = (issue: CreateIssueForm) => {
    const template = templates.find((t) => t.name === issue.template);
    if (!template) {
      throw new Error(`could not find template ${issue.template}`);
    }
    create(
      {
        subject: issue.subject,
        description: issue.description,
        template: template.template,
        screenshot,
      },
      bugshot,
      close
    );
  };

  const close = (issue: CreatedIssue) => {
    chrome.notifications.create(
      `bugshot-${connection.url}/issues/${issue.id}`,
      {
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
      }
    );

    // wait for the notification popsup
    setTimeout(() => {
      chrome.tabs.getCurrent((tab) => {
        if (tab && tab.id) {
          // then close the screenshot tab
          chrome.tabs.remove(tab.id);
        }
      });
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorNotification error={error} />
      <FormContainer>
        <Select
          label="Template"
          {...register("template", { required: true })}
          error={errors.template ? "Template is required" : null}
        >
          {templates.map((template) => (
            <option key={template.name}>{template.name}</option>
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
