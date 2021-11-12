export type Screenshot = {
  toBlob: () => Promise<Blob | null>;
};
