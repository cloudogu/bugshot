import { useCallback, useState } from "react";

const useDimension = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(-1);
  const ref = useCallback((node: T) => {
    if (node) {
      setWidth(node.clientWidth);
      setHeight(node.clientHeight);
    }
  }, []);
  
  return { ref, width, height };
};

export default useDimension;
