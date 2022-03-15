import { Connection, Template, Templates } from "./types";
import { decrypt, encrypt } from "./webcrypto";

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

const getStoredConnection = () => getFromStore("connection") as Promise<Connection>;

export const connection = () => {
  const get = async (): Promise<Connection | undefined> => {
    const storedConnection = await getStoredConnection();
    if (!storedConnection) {
      return undefined;
    }
    const apiKey = await decrypt(storedConnection.apiKey);
    return {
      ...storedConnection,
      apiKey,
    };
  };

  const set = async (conn: Connection) => {
    const encrypted = await encrypt(conn.apiKey);
    const storedConnection: Connection = {
      ...conn,
      apiKey: encrypted,
    };
    await setInStore({ connection: storedConnection });
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
