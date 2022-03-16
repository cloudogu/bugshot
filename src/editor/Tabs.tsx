import React, { FC, ReactElement, useState } from "react";
import classNames from "classnames";
import Title from "../shared/Title";

type TabProps = {
  title: string;
};

export const Tab: FC<TabProps> = ({ title, children }) => (
  <div className="p-8">
    <Title>{title}</Title>
    {children}
  </div>
);

type TabsProps = {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
};

const Tabs: FC<TabsProps> = ({ children }) => {
  const [active, setActive] = useState(0);
  const tabs = React.Children.toArray(children) as Array<ReactElement<TabProps>>;

  return (
    <div>
      <nav className="flex flex-row w-full items-stretch">
        {tabs?.map((tab, index) => (
          <button
            type="button"
            key={tab.props.title}
            onClick={() => setActive(index)}
            className={classNames(
              "flex-1 py-4 px-6 text-gray-600 hover:text-blue-600 focus:outline-none border-b-2 font-medium",
              {
                "font-bold text-blue-600 border-blue-600": index === active,
              }
            )}
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
