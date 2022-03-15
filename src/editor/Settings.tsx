import React, { FC, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../shared/Button";
import { TemplateEntry } from "./useTemplates";

type LineProps = {
  templates: TemplateEntry[];
  template: TemplateEntry;
};

const TemplateLine: FC<LineProps> = ({ templates, template }) => (
  <li className="w-full p-2 text-sm">
    <span>{template.name}</span>
    {templates.length > 1 ? (
      <button type="button" className="float-right w-4 h-4" onClick={template.remove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    ) : null}
  </li>
);

type EditorProps = {
  templates: TemplateEntry[];
};

const Settings: FC<EditorProps> = ({ templates }) => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = () => {
    setIsLoading(true);
    chrome.runtime.sendMessage({
      type: "logout",
    });
    chrome.tabs.getCurrent((tab) => {
      if (tab?.id) {
        chrome.tabs.remove(tab.id);
      }
    });
  };
  return (
    <>
      <h2 className="text-xl font-bold py-4 mt-2">{chrome.i18n.getMessage("settingsTemplates")}</h2>
      <ul className="w-full">
        {templates.map((template) => (
          <TemplateLine key={template.name} templates={templates} template={template} />
        ))}
      </ul>
      <h2 className="text-xl font-bold py-4">{chrome.i18n.getMessage("settingsLogout")}</h2>
      <Button className="w-full" onClick={logout} isLoading={isLoading}>
        {chrome.i18n.getMessage("settingsLogout")}
      </Button>
    </>
  );
};

export default Settings;
