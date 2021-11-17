import { useEffect, useState } from "react";

import { connection as store } from "../api/store";
import createRedmineApi from "../api/redmine";

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
    store().get().then(setConnection).then(() => setIsLoading(false));
  }, []);

  const updateConnection = (connection: Connection) => {
    setUpdateIsLoading(true);

    const api = createRedmineApi(connection);
    api
      .me()
      .then(store().set)
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
