import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";
import Spinner from "./Spinner";

type Props = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Loading: FC = () => (
  <>
    <Spinner /> Processing
  </>
);

const Button: FC<Props> = ({ isLoading, children, className, ...props }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={classNames(
      "bg-emerald-700 hover:bg-emerald-900 text-white font-extrabold py-2 px-4 rounded inline-flex items-center justify-center",
      className,
      {
        "cursor-not-allowed": isLoading,
      }
    )}
    {...props}
  >
    {isLoading ? <Loading /> : children}
  </button>
);

export default Button;
