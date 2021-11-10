import { useEffect, useState } from "react";

export type Connection = {
  url: string;
  apiKey: string;
};

const useConnection = () => {
  const [connection, setConnection] = useState<Connection>();
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [errorOnUpdate, setErrorOnUpdate] = useState<Error>();

  useEffect(() => {
    chrome.storage.sync.get("connection", (result) => {
      if (result.connection) {
        setConnection(JSON.parse(result.connection));
      }
      setIsLoading(false);
    });
  }, []);

  const updateConnection = (connection: Connection) => {
    setUpdateIsLoading(true);

    let meUrl = connection.url;
    if (!meUrl.endsWith("/")) {
      meUrl += "/";
    }
    meUrl += "my/account.json";

    fetch(meUrl, {
      headers: {
        "X-Redmine-API-Key": connection.apiKey,
      },
      // do not prompt for basic auth if key authentication failed
      credentials: "omit"
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("request failed");
        }
      })
      .then(() => {
        chrome.storage.sync.set(
          { connection: JSON.stringify(connection) },
          () => setConnection(connection)
        );
      })
      .catch(setErrorOnUpdate)
      .finally(() => setUpdateIsLoading(false));
  };

  return {
    connection,
    isLoading,
    update: {
      setConnection: updateConnection,
      isLoading: updateIsLoading,
      error: errorOnUpdate,
    },
  };
};

export default useConnection;
