import { Issue, Template } from "./types";

export const converIssueToTemplate = (issue: Issue): Template => {
  return {
    project_id: issue.project.id,
    category_id: issue.category.id,
    priority_id: issue.priority.id,
    status_id: issue.status.id,
    tracker_id: issue.tracker.id,
    parent_issue_id: issue.parent?.id,
    custom_fields: issue.custom_fields?.map((cf) => ({
      id: cf.id,
      value: cf.value,
    })),
  };
};
