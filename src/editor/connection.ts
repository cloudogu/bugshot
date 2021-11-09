import { useEffect, useState } from "react";

type Connection = {
  url: string;
  username: string;
  apiKey: string;
};

const useConnection = () => {
  const [connection, setConnection] = useState<Connection>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get("connection", (result) => {
      if (result.connection) {
        setConnection(JSON.parse(result.connection));
      }
      setIsLoading(false);
    });
  }, []);

  return {
    connection,
    isLoading,
  };
};

const useSetConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  
  const setConnection = (connection: Connection) => {
    setIsLoading(true);

    // todo check connection

    chrome.storage.sync.set({ connection: JSON.stringify(connection) }, () => {
      setConnection(connection);
      setIsLoading(false);
    });
  };

  return {
    setConnection,
    isLoading,
    error
  };
};

export { Connection, useConnection, useSetConnection };
