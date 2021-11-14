import createRedmineApi from "./api";
import useConnection from "./useConnection";

const useRedmineApi = () => {
  const { connection } = useConnection();
  if (connection) {
    return createRedmineApi(connection);
  }
  return undefined;
};

export default useRedmineApi;
