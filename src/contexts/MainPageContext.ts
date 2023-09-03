import { createContext, useContext } from "react";

type MainPageContextType = {
  account: null | any;
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  provider: any;
  nft: any;
};

export const MainPageContext = createContext<MainPageContextType | null>(null);
