import React, { FC } from "react";
import { TemplateEntry } from "./useTemplates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "twin.macro";

type LineProps = {
  template: TemplateEntry;
};

const TemplateLine: FC<LineProps> = ({ template }) => (
  <li tw="w-full p-2 text-sm">
    <span>{template.name}</span>
    <button tw="float-right w-4 h-4" onClick={template.remove}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </li>
);

type EditorProps = {
  templates: TemplateEntry[];
};

const TemplateEditor: FC<EditorProps> = ({ templates }) => (
  <ul tw="w-full mt-4">
    {templates.map((template) => (
      <TemplateLine key={template.name} template={template} />
    ))}
  </ul>
);

export default TemplateEditor;
