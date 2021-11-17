import React, { FC, MutableRefObject, useRef } from "react";
import ImageEditor from "./ImageEditor";
import IssueEditor from "./IssueEditor";
import useBugShot from "./useBugShot";
import Tabs, { Tab } from "./Tabs";
import "twin.macro";
import TemplateEditor from "./TemplateEditor";
import { Screenshot } from "../api/types";

const createScreenshot = (stageRef: MutableRefObject<any>): Screenshot => {
  return {
    toBlob: () => {
      const canvas = stageRef.current.clearAndToCanvas({
        pixelRatio: stageRef.current._pixelRatio,
      }) as HTMLCanvasElement;
      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob));
      });
    },
  };
};

const Editor: FC = () => {
  const bugshot = useBugShot();
  const stageRef = useRef<unknown>(null);
  const screenshot = createScreenshot(stageRef);
  return (
    <div tw="flex flex-row flex-wrap h-screen">
      <main tw="w-3/4 h-full shadow-md border-2">
        <ImageEditor stageRef={stageRef} image={bugshot?.screenshotUrl} />
      </main>
      <aside tw="w-1/4 h-full">
        <Tabs>
          <Tab title="Create Issue">
            <IssueEditor screenshot={screenshot} bugshot={bugshot} />
          </Tab>
          <Tab title="Templates">
            <TemplateEditor />
          </Tab>
        </Tabs>
      </aside>
    </div>
  );
};

export default Editor;
