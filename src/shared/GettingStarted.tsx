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
      {chrome.i18n.getMessage("gettingStartedRedmine1")}
      <strong>{chrome.i18n.getMessage("gettingStartedRedmine2")}</strong>
      {chrome.i18n.getMessage("gettingStartedRedmine3")}.
    </p>
    <Img src="./images/create-template-1.png" alt={chrome.i18n.getMessage("gettingStartedRedmineAltText")} />
  </>
);

const EasyRedmine: FC = () => (
  <>
    <p>
      {chrome.i18n.getMessage("gettingStartedEasyRedmine1")}
      <strong> {chrome.i18n.getMessage("gettingStartedEasyRedmine2")}</strong>
      {chrome.i18n.getMessage("gettingStartedEasyRedmine3")}
    </p>
    <Img src="./images/create-template-3.png" alt={chrome.i18n.getMessage("gettingStartedEasyRedmineAltText")} />
  </>
);

const GettingStarted: FC = ({ children }) => {
  const { connection } = useConnection();

  return (
    <div className="p-4">
      <Title className="mb-4">{chrome.i18n.getMessage("gettingStartedTitle")}</Title>
      {connection?.type === "EasyRedmine" ? <EasyRedmine /> : <Redmine />}
      <p>
        {chrome.i18n.getMessage("gettingStarted1")}
      </p>
      <Img src="./images/create-template-2.png" alt={chrome.i18n.getMessage("gettingStartedAltText")} />
      <p>{chrome.i18n.getMessage("gettingStarted2")}</p>
      {children}
    </div>
  );
};

export default GettingStarted;
