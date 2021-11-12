import React, { ButtonHTMLAttributes, FC } from "react";
import Spinner from "./Spinner";
import tw from "twin.macro";

type Props = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Loading: FC = () => (
  <>
    <Spinner /> Processing
  </>
);

const Button: FC<Props> = ({ isLoading, children, ...props }) => (
  <button
    css={[
      tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center`,
      isLoading && tw`cursor-not-allowed`,
    ]}
    {...props}
  >
    {isLoading ? <Loading /> : children}
  </button>
);

export default Button;
