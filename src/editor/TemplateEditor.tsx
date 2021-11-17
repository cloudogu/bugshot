import React, { FC } from "react";
import useTemplates from "./useTemplates";
import "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useRemoveTemplate from "./useRemoveTemplate";
import Spinner from "../form/Spinner";

type Props = {
  name: string;
};

const TemplateLine: FC<Props> = ({ name }) => {
  const { isLoading, remove } = useRemoveTemplate();

  return (
    <li tw="w-full">
      <span>{name}</span>
      <button
        tw="float-right"
        onClick={() => remove(name)}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <FontAwesomeIcon icon={faTrash} />}
      </button>
    </li>
  );
};

const TemplateEditor: FC = ({}) => {
  const { templates } = useTemplates();

  return (
    <ul tw="w-full mt-4">
      {Object.keys(templates).map((name) => (
        <TemplateLine key={name} name={name} />
      ))}
    </ul>
  );
};

export default TemplateEditor;
