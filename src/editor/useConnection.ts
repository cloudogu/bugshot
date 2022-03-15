import { useEffect, useState } from "react";
import { connection as store } from "../api/store";
import { Connection } from "../api/types";

const useConnection = () => {
  const [connection, setConnection] = useState<Connection>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store()
      .get()
      .then(setConnection)
      .then(() => setIsLoading(false));
  }, []);

  return {
    connection,
    isLoading,
  };
};

export default useConnection;
