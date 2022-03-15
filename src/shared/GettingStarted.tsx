import React, { FC } from "react";
import useConnection from "../editor/useConnection";
import Title from "./Title";

type ImgProps = {
  src: string;
  alt: string;
};

const Img: FC<ImgProps> = ({ src, alt }) => <img className="my-4 border-2 shadow-lg" src={src} alt={alt} />;

const Redmine: FC = () => (
  <>
    <p>
      Before you can create a Redmine issue, we have to create a template. To create an template, choose an issue from
      your Redmine instance as reference. Then click <strong>BugShot</strong> from the issue action menu.
    </p>
    <Img src="./images/create-template-1.png" alt="Create Redmine template" />
  </>
);

const EasyRedmine: FC = () => (
  <>
    <p>
      Before you can create a EasyRedmine issue, we have to create a template. To create an template, choose an issue
      from your EasyRedmine instance as reference. Then click <strong>the BugShot icon</strong>.
    </p>
    <Img src="./images/create-template-3.png" alt="Create EasyRedmine template" />
  </>
);

const GettingStarted: FC = ({ children }) => {
  const { connection } = useConnection();

  return (
    <div className="p-4">
      <Title className="mb-4">Getting started {connection?.type}</Title>
      {connection?.type === "EasyRedmine" ? <EasyRedmine /> : <Redmine />}
      <p>
        After you have clicked the <strong>BugShot</strong> link, you have to choose a name for the new template.
      </p>
      <Img src="./images/create-template-2.png" alt="Name template" />
      <p>After you have named your template, click the reload button below.</p>
      {children}
    </div>
  );
};

export default GettingStarted;
