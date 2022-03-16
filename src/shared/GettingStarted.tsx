import React, { FC } from "react";
import logout from "../editor/logout";
import useConnection from "../editor/useConnection";
import Button from "./Button";
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

const GettingStarted: FC<{ withReload?: boolean }> = ({ children, withReload = false }) => {
  const { connection } = useConnection();

  return (
    <div className="h-full p-4">
      <Button className="bg-white hover:bg-gray-200 text-gray-500 top-2 right-2 absolute" onClick={logout}>
        {chrome.i18n.getMessage("settingsLogout")}
      </Button>
      <Title className="mb-4">{chrome.i18n.getMessage("gettingStartedTitle")}</Title>
      {connection?.type === "EasyRedmine" ? <EasyRedmine /> : <Redmine />}
      <p>{chrome.i18n.getMessage("gettingStarted1")}</p>
      <Img src="./images/create-template-2.png" alt={chrome.i18n.getMessage("gettingStartedAltText")} />
      <p>{chrome.i18n.getMessage(withReload ? "gettingStarted2WithReload" : "gettingStarted2")}</p>
      {children}
    </div>
  );
};

export default GettingStarted;
