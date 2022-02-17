import { useEffect, useState } from "react";
import { BugShot, BugShotMessage } from "api/types";

const isBugShotMessage = (message: any): message is BugShotMessage => {
  return message.type === "BugShot";
};

const useBugShot = () => {
  const [bugshot, setBugShot] = useState<BugShot>();

  useEffect(() => {
    const listener = (msg: any) => {
      if (isBugShotMessage(msg)) {
        setBugShot(msg.bugShot);
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return bugshot;
};

export default useBugShot;
