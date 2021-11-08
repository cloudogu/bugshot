import React, { FC, useRef } from "react";
import ReactImgEditor from "react-img-editor";
import "react-img-editor/assets/index.css";

type Props = {
  image: string;
};

const ImageEditor: FC<Props> = ({ image }) => {
  const stageRef = useRef<any>(null);

  const setStage = (stage: any) => {
    stageRef.current = stage;
  };

  return (
    <ReactImgEditor
      src={image}
      plugins={[]}
      getStage={setStage}
      defaultPluginName="arrow"
      crossOrigin="anonymous"
    />
  );
};

export default ImageEditor;
