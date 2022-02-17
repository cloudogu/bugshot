import { decrypt, encrypt } from "./crypto";
import { Connection, Template, Templates } from "./types";

type StoredConnection = Connection & {
  keySuffix: string;
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
        apiKey: decrypt({ encrypted: storedConnection.apiKey, keySuffix: storedConnection.keySuffix }),
      };
    }) as Promise<Connection>;

  const set = (conn: Connection) => {
    const encrypted = encrypt(conn.apiKey);
    const storedConnection: StoredConnection = {
      ...conn,
      apiKey: encrypted.encrypted,
      keySuffix: encrypted.keySuffix,
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
