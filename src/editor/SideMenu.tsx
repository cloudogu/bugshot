import React, { FC } from "react";
import IssueEditor from "./IssueEditor";
import Settings from "./Settings";
import { BugShot, Screenshot } from "../api/types";
import Tabs, { Tab } from "./Tabs";
import useTemplates from "./useTemplates";
import Spinner from "../shared/Spinner";
import TemplateTutorial from "./TemplateTutorial";

type Props = {
  screenshot: Screenshot;
  bugshot?: BugShot;
};

const Container: FC = ({ children }) => (
  <aside tw="w-1/4 h-full">{children}</aside>
);

const SideMenu: FC<Props> = ({ screenshot, bugshot }) => {
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
    <Container>
      <Tabs>
        <Tab title="Create Issue">
          <IssueEditor
            screenshot={screenshot}
            bugshot={bugshot}
            templates={entries}
          />
        </Tab>
        <Tab title="Settings">
          <Settings templates={entries} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default SideMenu;
