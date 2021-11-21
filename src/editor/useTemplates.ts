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
  const [counter, setCounter] = useState(0);

  const remove = (name: string) => {
    template()
      .remove(name)
      .then(() => setEntries((e) => [...e.filter((e) => e.name !== name)]));
  };

  useEffect(() => {
    template()
      .get()
      .then((templates) => templates || {})
      .then((templates) =>
        Object.keys(templates).map((name) => ({
          name,
          template: templates[name],
          remove: () => remove(name),
        }))
      )
      .then(setEntries)
      .finally(() => setIsLoading(false));
  }, [counter]);

  return {
    isLoading,
    entries,
    reload: () => setCounter((c) => ++c),
  };
};

export default useTemplates;
