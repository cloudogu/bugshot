import createRedmineApi from "../api/redmine";
import useConnection from "./useConnection";

const useRedmineApi = () => {
  const { connection } = useConnection();
  if (connection) {
    return createRedmineApi(connection);
  }
  return undefined;
};

export default useRedmineApi;
