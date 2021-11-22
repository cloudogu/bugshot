import { useEffect, useState } from "react";
import { Template } from "../api/types";
import { template } from "../api/store";

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

  const increase = () => setCounter((c) => ++c);

  const remove = (name: string) => {
    template()
      .remove(name)
      .then(() => setEntries((e) => [...e.filter((e) => e.name !== name)]));
  };

  const moveToTop = (name: string) => {
    template().moveTopTop(name).then(increase);
  };

  useEffect(() => {
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
    reload: () => setCounter((c) => ++c),
  };
};

export default useTemplates;
