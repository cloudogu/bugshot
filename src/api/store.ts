import { AES, enc } from "crypto-js";
import { Connection, Template, Templates } from "./types";

type StoredConnection = Connection & {
  keySuffix: string;
};

const keyPrefix = "LIVjvMRo";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const random = (length: number) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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

const setInStore = (items: { [key: string]: unknown }) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => chrome.storage.sync.set(items, () => resolve(undefined)));

const removeFromStore = (key: string) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => chrome.storage.sync.remove(key, () => resolve(undefined)));

const getStoredConnection = () => getFromStore("connection") as Promise<StoredConnection>;

export const connection = () => {
  const get = () =>
    getStoredConnection().then((storedConnection: StoredConnection) => {
      if (!storedConnection) {
        return undefined;
      }
      return {
        url: storedConnection.url,
        apiKey: AES.decrypt(storedConnection.apiKey, keyPrefix + storedConnection.keySuffix).toString(enc.Utf8),
      };
    }) as Promise<Connection>;

  const set = (conn: Connection) => {
    const keySuffix = random(8);
    const storedConnection: StoredConnection = {
      ...conn,
      apiKey: AES.encrypt(conn.apiKey, keyPrefix + keySuffix).toString(),
      keySuffix,
    };
    return setInStore({ connection: storedConnection });
  };

  const remove = () => removeFromStore("connection");

  return { get, set, remove };
};

export const template = () => {
  const get = () => getFromStore("templates") as Promise<Templates>;
  const set = (name: string, tpl: Template) =>
    get()
      .then((tpls) => {
        const templates = tpls || [];
        templates.unshift({ name, template: tpl });
        return { templates };
      })
      .then(setInStore);
  const remove = (name: string) =>
    get()
      .then((tpls) => {
        const templates = (tpls || []).filter((t) => t.name !== name);
        return { templates };
      })
      .then(setInStore);

  const removeAll = () => removeFromStore("templates");

  const moveTopTop = (name: string) =>
    get()
      .then((tpls) => {
        const templates = tpls || [];
        const tpl = templates.find((t) => t.name === name);
        if (tpl) {
          const newTemplates = templates.filter((t) => t && t.name !== name);
          newTemplates.unshift(tpl);
          return {
            templates: newTemplates,
          };
        }
        return { templates };
      })
      .then(setInStore);

  return { get, set, remove, removeAll, moveTopTop };
};
