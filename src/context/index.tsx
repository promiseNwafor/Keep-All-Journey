import { createContext, FC, useContext, useState } from "react";
import { IItems, IItemsContext } from "../utils/interfaces";

export interface IAppProps {}

export const ItemsContext = createContext<IItemsContext>({} as IItemsContext);

const ItemsContextProvider: FC = ({ children }) => {
  const [items, setItems] = useState<IItems[]>([]);
  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, handleDelete }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;

export const useItemsContext = () => useContext<IItemsContext>(ItemsContext);
