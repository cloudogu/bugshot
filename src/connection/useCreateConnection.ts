import { useState } from "react";
import { connection as store } from "../api/store";
import { InitialConnection } from "../api/types";
import createRedmineApi from "../api/redmine";

export type ApiKeyRequest = {
  url: string;
  apiKey: string;
};

const useCreateConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const create = (connection: InitialConnection, callback: () => void) => {
    setIsLoading(true);

    let url = connection.url;
    if (url.endsWith("/")) {
      url = url.substring(0, url.length - 1);
    }

    const api = createRedmineApi({
      ...connection,
      url
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
