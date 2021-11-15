import React, { FC, ReactElement, ReactNode, useState } from "react";
import Title from "./Title";
import tw from "twin.macro";

type TabProps = {
  title: string;
};

export const Tab: FC<TabProps> = ({ title, children }) => (
  <div tw="p-8">
    <Title>{title}</Title>
    {children}
  </div>
);

type TabsProps = {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
};

const Tabs: FC<TabsProps> = ({ children }) => {
  const [active, setActive] = useState(0);
  const tabs = React.Children.toArray(children) as Array<
    ReactElement<TabProps>
  >;

  return (
    <div>
      <nav tw="flex flex-row w-full items-stretch">
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            css={[
              tw`flex-1 py-4 px-6 text-gray-500 hover:text-blue-500 focus:outline-none border-b-2 font-medium`,
              index == active && tw`font-bold text-blue-500 border-blue-500`,
            ]}
          >
            {tab.props.title}
          </button>
        ))}
      </nav>
      {tabs[active]}
    </div>
  );
};

export default Tabs;
