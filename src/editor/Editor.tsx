import React, { FC, MutableRefObject, useRef } from "react";
import { Screenshot } from "../api/types";
import ImageEditor from "./ImageEditor";
import SideMenu from "./SideMenu";
import useBugShot from "./useBugShot";

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
    <div className="flex flex-row flex-wrap h-screen">
      <main className="w-3/4 h-full shadow-md border-2">
        <ImageEditor stageRef={stageRef} image={bugshot?.screenshotUrl} />
      </main>
      <SideMenu screenshot={screenshot} bugshot={bugshot} />
    </div>
  );
};

export default Editor;
