import React, { FC, MutableRefObject, useRef } from "react";
import ImageEditor from "./ImageEditor";
import IssueEditor from "./IssueEditor";
import "twin.macro";
import { Screenshot } from "./Screenshot";

const createScreenshot = (stageRef: MutableRefObject<any>): Screenshot => {
  return {
    toBlob: () => {
      const canvas = stageRef.current.clearAndToCanvas({
        pixelRatio: stageRef.current._pixelRatio,
      }) as HTMLCanvasElement;
      return new Promise<Blob>((resolve) => {
        canvas.toBlob(resolve);
      });
    },
  };
};

const Editor: FC = () => {
  const stageRef = useRef<unknown>(null);
  const screenshot = createScreenshot(stageRef);
  return (
    <div tw="flex flex-row flex-wrap h-screen">
      <main tw="w-3/4 h-full shadow-md border-2">
        <ImageEditor stageRef={stageRef} />
      </main>
      <aside tw="w-1/4 h-full">
        <IssueEditor screenshot={screenshot} />
      </aside>
    </div>
  );
};

export default Editor;
