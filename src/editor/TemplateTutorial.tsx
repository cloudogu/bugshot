import React, { FC } from "react";
import Button from "../shared/Button";
import GettingStarted from "../shared/GettingStarted";

type Props = {
  reload: () => void;
};

const TemplateTutorial: FC<Props> = ({ reload }) => (
  <GettingStarted>
    <Button className="mt-6 w-full" onClick={reload}>
      {chrome.i18n.getMessage("reload")}
    </Button>
  </GettingStarted>
);

export default TemplateTutorial;
