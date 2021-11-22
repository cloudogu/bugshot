import React, { FC } from "react"
import Title from "./Title";


const GettingStarted:FC = ({children}) => (
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
    {children}
  </div>
);

export default GettingStarted;
