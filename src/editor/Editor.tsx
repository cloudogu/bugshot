import React, { FC, MutableRefObject, useRef } from "react";
import ImageEditor from "./ImageEditor";
import useBugShot from "./useBugShot";
import { Screenshot } from "../api/types";
import SideMenu from "./SideMenu";
import "twin.macro";

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
      <SideMenu screenshot={screenshot} bugshot={bugshot} />
    </div>
  );
};

export default Editor;
