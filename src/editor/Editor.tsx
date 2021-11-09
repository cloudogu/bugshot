import React, { FC } from "react";
import ImageEditor from "./ImageEditor";
import IssueEditor from "./IssueEditor";
import "twin.macro";

const Editor: FC = () => (
  <div tw="flex flex-row flex-wrap h-screen">
    <main tw="w-3/4 h-full shadow-md border-2">
      <ImageEditor  />
    </main>
    <aside tw="w-1/4 h-full">
      <IssueEditor />
    </aside>
  </div>
);

export default Editor;
