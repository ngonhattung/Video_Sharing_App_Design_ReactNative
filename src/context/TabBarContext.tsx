import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabBarContextType {
  hideTabBar: boolean;
  setHideTabBar: (value: boolean) => void;
}
const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hideTabBar, setHideTabBar] = useState<boolean>(false);

  return (
    <TabBarContext.Provider value={{ hideTabBar, setHideTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = (): TabBarContextType => {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error("useTabBar must be used within a TabBarProvider");
  }
  return context;
};
