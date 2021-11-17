export type Connection = {
  url: string;
  apiKey: string;
};

export type UploadResponse = {
  upload: {
    token: string;
  };
};

export type CustomField = {
  id: number;
  name?: string;
  value: string;
};

export type Upload = {
  token: string;
  filename: string;
  content_type: string;
};

export type Template = {
  project_id: number;
  tracker_id: number;
  status_id: number;
  priority_id: number;
  category_id: number;
  parent_issue_id?: number;
  custom_fields: CustomField[];
};

export type Templates = {
  [key: string]: Template;
};

export type CreateIssueRequest = Template & {
  subject: string;
  description?: string;
  uploads: Upload[];
};

export type Project = {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  inherit_members: boolean;
  trackers: {
    id: number;
    name: string;
  }[];
  issue_categories: {
    id: number;
    name: string;
  }[];
  default_version: {
    id: number;
    name: string;
  };
};

export type Enumeration = {
  id: number;
  name: string;
  is_default: boolean;
};

export type Screenshot = {
  toBlob: () => Promise<Blob | null>;
};

export type IdAndName = {
  id: number;
  name: string;
};

export type Issue = {
  id: number;
  project: IdAndName;
  tracker: IdAndName;
  status: IdAndName;
  priority: IdAndName;
  author: IdAndName;
  category: IdAndName;
  fixed_version: IdAndName;
  parent?: {
    id: number;
  };
  subject: string;
  description: string;
  custom_fields: CustomField[];
};
