import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BugShot, Screenshot } from "../api/types";
import Spinner from "../shared/Spinner";
import IssueEditor from "./IssueEditor";
import Settings from "./Settings";
import Tabs, { Tab } from "./Tabs";
import TemplateTutorial from "./TemplateTutorial";
import useTemplates from "./useTemplates";

type Props = {
  screenshot: Screenshot;
  bugshot?: BugShot;
};

const Container: FC = ({ children }) => <aside className="w-1/4 h-full">{children}</aside>;

const SideMenu: FC<Props> = ({ screenshot, bugshot }) => {
  const form = useForm();
  const { entries, isLoading, reload } = useTemplates();

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (entries.length === 0) {
    return (
      <Container>
        <TemplateTutorial reload={reload} />
      </Container>
    );
  }

  return (
    <FormProvider {...form}>
      <Container>
        <Tabs>
          <Tab title={chrome.i18n.getMessage("createIssueTitle")}>
            <IssueEditor screenshot={screenshot} bugshot={bugshot} templates={entries} />
          </Tab>
          <Tab title={chrome.i18n.getMessage("settingsTitle")}>
            <Settings templates={entries} />
          </Tab>
        </Tabs>
      </Container>
    </FormProvider>
  );
};

export default SideMenu;
