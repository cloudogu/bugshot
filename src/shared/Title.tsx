import React, { FC } from "react";
import classNames from "classnames";

type Props = {
  className?: string;
};

const Title: FC<Props> = ({ children, className }) => (
  <h1 className={classNames("text-2xl font-bold", className)}>{children}</h1>
);

export default Title;
