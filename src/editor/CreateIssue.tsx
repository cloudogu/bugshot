import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Screenshot, BugShot, Connection } from "../api/types";
import Button from "../shared/Button";
import ErrorNotification from "../shared/ErrorNotification";
import FormContainer from "../shared/FormContainer";
import InputField from "../shared/InputField";
import Select from "../shared/Select";
import Textarea from "../shared/Textarea";
import useCreateIssue, { CreatedIssue } from "./useCreateIssue";
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

const CreateIssue: FC<Props> = ({ connection, screenshot, bugshot, templates }) => {
  const { create, isLoading, error } = useCreateIssue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>();

  const close = (issue: CreatedIssue, template: TemplateEntry) => {
    template.moveToTop();

    chrome.notifications.create(`bugshot-${connection.url}/issues/${issue.id}`, {
      type: "basic",
      iconUrl: "images/bugshot-icon-128x128.png",
      title: `Created issue ${issue.id}`,
      message: `Bugshot create a new issue with the id ${issue.id}`,
      buttons: [
        {
          title: "Open",
          iconUrl: "images/bugshot-icon-128x128.png",
        },
      ],
    });

    // wait for the notification popsup
    setTimeout(() => {
      chrome.tabs.getCurrent((tab) => {
        if (tab?.id) {
          // then close the screenshot tab
          chrome.tabs.remove(tab.id);
        }
      });
    }, 100);
  };

  const onSubmit = (issue: CreateIssueForm) => {
    const template = templates.find((t) => t.name === issue.template);
    if (!template) {
      throw new Error(`could not find template ${issue.template}`);
    }
    if (!bugshot) {
      throw new Error(`BugShot is undefined`);
    }
    create(
      {
        subject: issue.subject,
        description: issue.description,
        template: template.template,
        screenshot,
      },
      bugshot,
      (createdIssue: CreatedIssue) => close(createdIssue, template)
    );
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
