// @ts-ignore
window.onBugShot = (url: string) => {
  const event = new CustomEvent("bugshot", {
    detail: {
      url
    },
    bubbles: true,
    cancelable: true,
    composed: false,
  });

  window.dispatchEvent(event);
};
