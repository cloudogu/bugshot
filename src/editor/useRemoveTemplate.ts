import { useState } from "react";
import { template } from "../api/store";

const useRemoveTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const remove = (name: string) => {
    setIsLoading(true);
    template()
      .remove(name)
      .finally(() => setIsLoading(false));
  };
  return {
    isLoading,
    remove,
  };
};

export default useRemoveTemplate;
