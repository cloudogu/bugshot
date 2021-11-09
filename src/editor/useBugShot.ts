import { useEffect, useState } from "react";

const useBugShot = () => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const listener = (event: Event) => {
      // @ts-ignore
      const url = event.detail.url;
      setImage(url);
    };
    window.addEventListener("bugshot", listener);
    return () => {
      window.removeEventListener("bugshot", listener);
    };
  }, []);

  return image;
};

export default useBugShot;
