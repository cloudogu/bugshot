export type BugShot = {
  url?: string;
  screenshotUrl: string;
  resolution?: {
    width: number;
    height: number;
  };
};

export type BugShotMessage = {
  type: "BugShot";
  bugShot: BugShot;
};

export const connectionTypes = ["Redmine", "EasyRedmine"] as const;

type BaseConnection = {
  url: string;
  type: typeof connectionTypes[number];
}

export type Connection = BaseConnection & {
  apiKey: string;
};

export type InitialConnection = BaseConnection & {
  username: string;
  password: string;
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
  category_id?: number;
  parent_issue_id?: number;
  custom_fields: CustomField[];
};

export type NamedTemplate = {
  name: string;
  template: Template;
};

export type Templates = NamedTemplate[];

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
  category?: IdAndName;
  fixed_version: IdAndName;
  parent?: {
    id: number;
  };
  subject: string;
  description: string;
  custom_fields: CustomField[];
};

export type Me = {
  id: number;
  login: string;
  admin: boolean;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: string;
  last_login_on: string;
  api_key: string;
};
