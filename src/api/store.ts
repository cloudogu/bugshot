import { AES, enc } from "crypto-js";
import { Connection, Template, Templates } from "./types";

type StoredConnection = Connection & {
  keySuffix: string;
};

const keyPrefix = "LIVjvMRo";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const random = (length: number) => {
  var result = "";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
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

const setInStore = (items: { [key: string]: any }) =>
  new Promise((resolve) => chrome.storage.sync.set(items, () => resolve(undefined)));

const removeFromStore = (key: string) =>
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

  const set = (connection: Connection) => {
    const keySuffix = random(8);
    const storedConnection: StoredConnection = {
      ...connection,
      apiKey: AES.encrypt(connection.apiKey, keyPrefix + keySuffix).toString(),
      keySuffix,
    };
    return setInStore({ connection: storedConnection });
  };

  const remove = () => removeFromStore("connection");

  return { get, set, remove };
};

export const template = () => {
  const get = () => getFromStore("templates") as Promise<Templates>;
  const set = (name: string, template: Template) =>
    get()
      .then((tpls) => {
        const templates = tpls || [];
        templates.unshift({ name, template });
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
        console.log(templates);
        const template = templates.find((t) => t.name === name);
        console.log(template);

        if (template) {
          const newTemplates = templates.filter((t) => t && t.name !== name);
          newTemplates.unshift(template);
          console.log(newTemplates);
          return {
            templates: newTemplates,
          };
        }
        return { templates };
      })
      .then(setInStore);

  return { get, set, remove, removeAll, moveTopTop };
};
