import { useState } from "react";
import createRedmineApi from "../api/redmine";
import { connection as store } from "../api/store";
import { InitialConnection } from "../api/types";

export type ApiKeyRequest = {
  url: string;
  apiKey: string;
};

const useCreateConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const create = (connection: InitialConnection, callback: () => void) => {
    setIsLoading(true);

    let { url } = connection;
    if (url.endsWith("/")) {
      url = url.substring(0, url.length - 1);
    }

    const api = createRedmineApi({
      ...connection,
      url,
    });
    api
      .me()
      .then((me) => ({ url, apiKey: me.api_key }))
      .then(store().set)
      .then(callback)
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return {
    create,
    isLoading,
    error,
  };
};

export default useCreateConnection;
