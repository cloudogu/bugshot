import { useEffect, useState } from "react";
import { template } from "../api/store";
import { Template } from "../api/types";

export type TemplateEntry = {
  name: string;
  template: Template;
  remove: () => void;
  moveToTop: () => void;
};

const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<TemplateEntry[]>([]);
  const [counter, setCounter] = useState(0);

  const increase = () => setCounter((c) => c + 1);

  const remove = (name: string) => {
    template()
      .remove(name)
      .then(() => setEntries((e) => [...e.filter((entry) => entry.name !== name)]));
  };

  useEffect(() => {
    const moveToTop = (name: string) => {
      template().moveTopTop(name).then(increase);
    };

    template()
      .get()
      .then((templates) => templates || [])
      .then((templates) =>
        templates.map((t) => ({
          ...t,
          remove: () => remove(t.name),
          moveToTop: () => moveToTop(t.name),
        }))
      )
      .then(setEntries)
      .finally(() => setIsLoading(false));
  }, [counter]);

  return {
    isLoading,
    entries,
    reload: () => setCounter((c) => c + 1),
  };
};

export default useTemplates;
