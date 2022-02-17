import React, { FC, MutableRefObject } from "react";
import ReactImgEditor from "@cloudogu/react-img-editor";
import "@cloudogu/react-img-editor/lib/index.css";
import useDimension from "./useDimension";

type Props = {
  stageRef: MutableRefObject<unknown>;
  image?: string;
};

const ImageEditor: FC<Props> = ({ stageRef, image }) => {
  const { ref, width, height } = useDimension<HTMLDivElement>();

  const setStage = (stage: unknown) => {
    // eslint-disable-next-line no-param-reassign
    stageRef.current = stage;
  };

  if (!image) {
    return <p>Could not find Screenshot</p>;
  }

  return (
    <div className="overflow-scroll h-full" ref={ref}>
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
