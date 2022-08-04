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

  const sendNotification = (issue: CreatedIssue) => {
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
  };

  const close = () => {
    chrome.tabs.getCurrent((tab) => {
      if (tab?.id) {
        // then close the screenshot tab
        chrome.tabs.remove(tab.id);
      }
    });
  };

  const createIssue = (issue: CreateIssueForm, open: boolean) => {
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
      (createdIssue: CreatedIssue) => {
        template.moveToTop();
        if (!open) {
          sendNotification(createdIssue);
          // wait for the notification popup
          setTimeout(close, 100);
        } else {
          window.location.href = `${connection.url}/issues/${createdIssue.id}`;
        }
      }
    );
  };

  const onSubmit = (issue: CreateIssueForm) => createIssue(issue, false);
  const onSubmitAndOpen = (issue: CreateIssueForm) => createIssue(issue, true);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorNotification error={error} />
      <FormContainer>
        <Select
          label={chrome.i18n.getMessage("createIssueTemplate")}
          {...register("template", { required: true })}
          error={errors.template ? chrome.i18n.getMessage("validationTemplateMissing") : null}
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
        <div className="flex gap-2">
          <Button isLoading={isLoading} variant="secondary" className="w-full" onClick={handleSubmit(onSubmitAndOpen)}>
            {chrome.i18n.getMessage("createIssueSaveAndOpenButton")}
          </Button>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            {chrome.i18n.getMessage("createIssueSaveButton")}
          </Button>
        </div>
      </FormContainer>
    </form>
  );
};

export default CreateIssue;
