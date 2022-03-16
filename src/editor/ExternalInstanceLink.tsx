import React, { FC } from "react";
import { connectionTypes } from "../api/types";

type Props = {
  url?: string;
  type?: string;
};

const ExternalInstanceLink: FC<Props> = ({ url = "", type = connectionTypes[0] }) => (
  <a className="mt-6 w-full text-blue-500 flex justify-center" href={url} target="_blank" rel="noreferrer">
    {`${chrome.i18n.getMessage("externalInstanceLink")}  ${type}`}
  </a>
);

export default ExternalInstanceLink;
