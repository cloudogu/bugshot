import { useState } from "react";

export type CustomField = {
  id: number;
  value: string;
};

export type Template = {
  project_id: number;
  tracker_id: number;
  status_id: number;
  priority_id: number;
  category_id: number;
  custom_fields: CustomField[];
};

export type Templates = { [key: string]: Template };

const templates: Templates = {
  "CES Bug": {
    project_id: 1,
    tracker_id: 1,
    status_id: 1,
    priority_id: 1,
    category_id: 57,
    custom_fields: [
      {
        id: 1,
        value: "ITZ TAM",
      },
      {
        id: 36,
        value: "Team CES",
      },
      {
        id: 38,
        value: "Created with bugshot!",
      },
    ],
  },
  "SCM Bug": {
    project_id: 1,
    tracker_id: 1,
    status_id: 1,
    priority_id: 1,
    category_id: 57,
    custom_fields: [
      {
        id: 1,
        value: "ITZ TAM",
      },
      {
        id: 36,
        value: "Team SCM",
      },
      {
        id: 38,
        value: "Created with bugshot!",
      },
    ],
  },
};

const useTemplates = () => {
  return {
    selected: "SCM Bug",
    templates: templates || {}
  };
};

export default useTemplates;
