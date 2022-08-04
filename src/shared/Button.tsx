import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";
import Spinner from "./Spinner";

type Props = {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Loading: FC = () => (
  <>
    <Spinner /> Processing
  </>
);

const Button: FC<Props> = ({ isLoading, children, className, variant = "primary", ...props }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={classNames(
      "text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center shadow",
      {
        "cursor-not-allowed": isLoading,
        "bg-emerald-500 hover:bg-emerald-700 text-emerald-50": variant === "primary",
        "bg-gray-50 hover:bg-gray-300 text-gray-700": variant === "secondary",
      },
      className
    )}
    {...props}
  >
    {isLoading ? <Loading /> : children}
  </button>
);

export default Button;
