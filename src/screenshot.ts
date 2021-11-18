import { BugShot } from "./api/types"

// @ts-ignore
window.onBugShot = (bugshot: BugShot) => {
  const event = new CustomEvent<BugShot>("bugshot", {
    detail: bugshot,
    bubbles: true,
    cancelable: true,
    composed: false,
  });

  window.dispatchEvent(event);
};
