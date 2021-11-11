import React, { FC, MutableRefObject, useRef } from "react";
import ReactImgEditor from "react-img-editor";
import "react-img-editor/assets/index.css";
import useBugShot from "./useBugShot";
import "twin.macro";
import useDimension from "./useDimension";

type Props = {
  stageRef: MutableRefObject<unknown>;
};

const ImageEditor: FC<Props> = ({ stageRef }) => {
  const image = useBugShot();
  const { ref, width, height } = useDimension<HTMLDivElement>();

  const setStage = (stage: any) => {
    stageRef.current = stage;
  };

  if (!image) {
    return <p>Could not find Screenshot</p>;
  }

  return (
    <div tw="overflow-scroll h-full" ref={ref}>
      <div style={{ width, height }}>
        <ReactImgEditor
          src={image}
          width={width}
          height={height}
          plugins={[]}
          getStage={setStage}
          defaultPluginName="arrow"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
};

export default ImageEditor;
