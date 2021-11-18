import { useEffect, useState } from "react";
import { BugShot } from "api/types";

const useBugShot = () => {
  const [bugshot, setBugShot] = useState<BugShot>();

  useEffect(() => {
    const listener = (event: Event) => {
      const url = (event as CustomEvent<BugShot>).detail;
      setBugShot(url);
    };
    window.addEventListener("bugshot", listener);
    return () => {
      window.removeEventListener("bugshot", listener);
    };
  }, []);

  return bugshot;
};

export default useBugShot;
