import React, { FC } from "react";
import GettingStarted from "../shared/GettingStarted";
import Button from "../shared/Button";

type Props = {
  reload: () => void;
};

const TemplateTutorial: FC<Props> = ({ reload }) => (
  <GettingStarted>
    <Button className="mt-6 w-full" onClick={reload}>
      Reload
    </Button>
  </GettingStarted>
);

export default TemplateTutorial;
