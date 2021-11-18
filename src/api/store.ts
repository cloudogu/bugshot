import { Connection, Template, Templates } from "./types";

const getFromStore = (key: string) =>
  new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      if (result[key]) {
        resolve(result[key]);
      } else {
        resolve(undefined);
      }
    });
  });

const setInStore = (items: { [key: string]: any }) =>
  new Promise((resolve) => {
    chrome.storage.sync.set(items, () => resolve(undefined));
  });

export const connection = () => {
  const get = () => getFromStore("connection") as Promise<Connection>;
  const set = (connection: Connection) => setInStore({ connection });

  return { get, set };
};

export const template = () => {
  const get = () => getFromStore("templates") as Promise<Templates>;
  const set = (name: string, template: Template) =>
    get()
      .then((templates) => {
        templates[name] = template;
        return { templates };
      })
      .then(setInStore);
  const remove = (name: string) =>
    get()
      .then((templates) => {
        delete templates[name];
        return { templates };
      })
      .then(setInStore);

  return { get, set, remove };
};
