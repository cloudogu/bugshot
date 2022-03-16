import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Screenshot, BugShot, Connection } from "../api/types";
import Button from "../shared/Button";
import ErrorNotification from "../shared/ErrorNotification";
import FormContainer from "../shared/FormContainer";
import InputField from "../shared/InputField";
import Select from "../shared/Select";
import Textarea from "../shared/Textarea";
import { CreateIssueForm } from "./CreateIssueForm";
import useCreateIssue, { CreatedIssue } from "./useCreateIssue";
import { TemplateEntry } from "./useTemplates";

type Props = {
  connection: Connection;
  screenshot: Screenshot;
  bugshot?: BugShot;
  templates: TemplateEntry[];
};

const CreateIssue: FC<Props> = ({ connection, screenshot, bugshot, templates }) => {
  const { create, isLoading, error } = useCreateIssue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateIssueForm>();

  const close = (issue: CreatedIssue, template: TemplateEntry) => {
    template.moveToTop();

    chrome.notifications.create(`bugshot-${connection.url}/issues/${issue.id}`, {
      type: "basic",
      iconUrl: "images/bugshot-icon-128x128.png",
      title: `${chrome.i18n.getMessage("notificationTitle")} ${issue.id}`,
      message: `${chrome.i18n.getMessage("notificationMessage")} ${issue.id}`,
      buttons: [
        {
          title: chrome.i18n.getMessage("notificationButtonTitle"),
          iconUrl: "images/bugshot-icon-128x128.png",
        },
      ],
    });

    // wait for the notification popup
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
          label={chrome.i18n.getMessage("createIssueTemplate")}
          {...register("template", { required: true })}
          error={errors.template ? "Template is required" : null}
        >
          {templates.map((template) => (
            <option key={template.name}>{template.name}</option>
          ))}
        </Select>
        <InputField
          label={chrome.i18n.getMessage("createIssueSubject")}
          {...register("subject", { required: true })}
          error={errors.subject ? chrome.i18n.getMessage("validationSubjectMissing") : null}
        />
        <Textarea label={chrome.i18n.getMessage("createIssueDesc")} {...register("description")} />
        <Button type="submit" isLoading={isLoading}>
          {chrome.i18n.getMessage("createIssueSaveButton")}
        </Button>
      </FormContainer>
    </form>
  );
};

export default CreateIssue;
