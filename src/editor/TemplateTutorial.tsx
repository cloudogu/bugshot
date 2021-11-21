import React, { FC } from "react";
import Title from "../form/Title";
import Button from "../form/Button";
import "twin.macro";

type Props = {
  reload: () => void;
};

const TemplateTutorial: FC<Props> = ({ reload }) => (
  <div tw="p-4">
    <Title>Getting started</Title>
    <p tw="mt-4">
      Before you can create a redmine issue, we have to create a template. To
      create an template, choose an issue from your redmine instance as
      reference. Then click <strong>BugShot</strong> from the issue action menu.
    </p>
    <img
      tw="my-4 border-2 shadow-lg"
      src="./images/create-template-1.png"
      alt="Create template"
    />
    <p>
      After you have clicked the <strong>BugShot</strong> link, you have to
      choose a name for the new template.
    </p>
    <img
      tw="my-4 border-2 shadow-lg"
      src="./images/create-template-2.png"
      alt="Name template"
    />
    <p>After you have named your template, click the reload button below.</p>
    <Button tw="mt-6 w-full" onClick={reload}>
      Reload
    </Button>
  </div>
);

export default TemplateTutorial;
