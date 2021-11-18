import { useEffect, useState } from "react";
import { Template } from "../api/types";
import { template } from "../api/store";

export type TemplateEntry = {
  name: string;
  template: Template;
  remove: () => void;
};

const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<TemplateEntry[]>([]);

  const remove = (name: string) => {
    template()
      .remove(name)
      .then(() => setEntries((e) => [...e.filter((e) => e.name !== name)]));
  };

  useEffect(() => {
    template()
      .get()
      .then((templates) =>
        Object.keys(templates).map((name) => ({
          name,
          template: templates[name],
          remove: () => remove(name),
        }))
      )
      .then(setEntries)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    entries,
  };
};

export default useTemplates;
