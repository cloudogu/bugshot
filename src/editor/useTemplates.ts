import { useEffect, useState } from "react";
import { Templates } from "../api/types";
import { template } from "../api/store";

const useTemplates = () => {
  const [templates, setTemplates] = useState<Templates>({});
  useEffect(() => {
    template().get().then(setTemplates);
  }, []);

  return {
    selected: "",
    templates,
  };
};

export default useTemplates;
