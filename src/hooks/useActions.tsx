import { createContext, FC, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface ItemProps {
  isMobile: boolean;
}

export const ActionsContext = createContext<ItemProps>({} as ItemProps);

const UseActionsProvider: FC<ItemProps> = ({ children }) => {
  const isMobile = useMediaQuery("(min-width:500px)");

  return (
    <ActionsContext.Provider value={{ isMobile }}>
      {children}
    </ActionsContext.Provider>
  );
};

export default UseActionsProvider;

export const useActions = () => useContext<ItemProps>(ActionsContext);
