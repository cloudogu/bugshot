import React, { FC } from "react";
import Button from "../shared/Button";
import GettingStarted from "../shared/GettingStarted";
import useConnection from "./useConnection";
import ExternalInstanceLink from "./ExternalInstanceLink";

type Props = {
  reload: () => void;
};

const TemplateTutorial: FC<Props> = ({ reload }) => {
  const { connection, isLoading } = useConnection();

  if (isLoading) {
    return <p>{chrome.i18n.getMessage("loading")}</p>;
  }

  return (
    <GettingStarted withReload>
      <ExternalInstanceLink url={connection?.url} type={connection?.type}/>
      <Button className="mt-6 w-full" onClick={reload}>
        {chrome.i18n.getMessage("reload")}
      </Button>
    </GettingStarted>
  );
};
export default TemplateTutorial;
