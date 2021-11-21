import React, { FC } from "react";
import IssueEditor from "./IssueEditor";
import TemplateEditor from "./Settings";
import { BugShot, Screenshot } from "../api/types";
import Tabs, { Tab } from "./Tabs";
import useTemplates from "./useTemplates";
import Spinner from "../form/Spinner";

type Props = {
  screenshot: Screenshot;
  bugshot?: BugShot;
};

const Container: FC = ({ children }) => (
  <aside tw="w-1/4 h-full">{children}</aside>
);

const SideMenu: FC<Props> = ({ screenshot, bugshot }) => {
  const { entries, isLoading } = useTemplates();

  if (isLoading) {
    return (
      <Container>
        <Spinner />
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
          <TemplateEditor templates={entries} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default SideMenu;
