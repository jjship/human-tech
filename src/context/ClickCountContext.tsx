import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

type ClickCountContextType = {
  clickCount: number;
  setClickCount: Dispatch<SetStateAction<number>>;
};

export const ClickCountContext = createContext({} as ClickCountContextType);

export const ClickCountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [clickCount, setClickCount] = useState<number>(0);

  return (
    <ClickCountContext.Provider value={{ clickCount, setClickCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};
