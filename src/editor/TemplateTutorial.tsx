import React, { FC } from "react";
import GettingStarted from "../form/GettingStarted";
import Button from "../form/Button";
import "twin.macro";

type Props = {
  reload: () => void;
};

const TemplateTutorial: FC<Props> = ({ reload }) => (
  <GettingStarted>
    <Button tw="mt-6 w-full" onClick={reload}>
      Reload
    </Button>
  </GettingStarted>
);

export default TemplateTutorial;
