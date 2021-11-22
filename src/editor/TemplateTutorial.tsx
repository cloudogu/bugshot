import React, { FC } from "react";
import GettingStarted from "../shared/GettingStarted";
import Button from "../shared/Button";
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
