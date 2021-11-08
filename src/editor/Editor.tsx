import React, { FC } from "react";
import ImageEditor from "./ImageEditor";
import useBugShot from "./useBugShot";
import "twin.macro";

const Editor: FC = () => {
  const bugshot = useBugShot();
  return (
      <div tw="flex flex-row">
        <main role="main" tw="w-full w-3/4">
          {bugshot ? (
            <ImageEditor image={bugshot} />
          ) : (
            <p>No screenshot taken</p>
          )}
        </main>
        <aside tw="w-full w-1/4">
          Redmine
        </aside>
      </div>
  );
};

export default Editor;
