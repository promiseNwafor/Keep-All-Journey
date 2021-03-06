import { createContext, FC, useContext, useState } from "react";
import { IItems, IItemsContext, IItemsState } from "../utils/interfaces";
import { db } from "../libs/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "@firebase/firestore";
import { useAuthContext } from "./AuthContext";

export interface IAppProps {}

export const ItemsContext = createContext<IItemsContext>({} as IItemsContext);

const ItemsContextProvider: FC = ({ children }) => {
  const [items, setItems] = useState<IItems[]>([]);
  const [itemsLoading, setItemsLoading] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<IItems[]>([]);
  const itemsCollectionRef = collection(db, "All Items");
  const { user } = useAuthContext();

  const addItem = async ({ title, body, date }: IItemsState) => {
    await addDoc(itemsCollectionRef, { title, body, date, userId: user?.uid });
  };

  const editItem = async (id: string, item: IItems) => {
    const itemDoc = doc(db, "All Items", id);
    await updateDoc(itemDoc, { ...item });
    getItems();
  };

  const deleteItem = async (id: string) => {
    const itemDoc = doc(db, "All Items", id);
    await deleteDoc(itemDoc);
  };

  const getItems = async () => {
    setItemsLoading(true);
    const q = query(itemsCollectionRef, where("userId", "==", user?.uid));
    // const itemDoc = doc(db, "All Items", user?.uid);
    const data = await getDocs(q);

    const itemData: IItems[] = data.docs.map((doc) => ({
      ...(doc.data() as IItems),
      id: doc.id,
    }));
    setItems(itemData);
    setItemsLoading(false);
  };

  const searchFilter = (q: string) => {
    let query = q.toLowerCase();
    const searched = items.filter((item) => {
      if (
        item.body.toLocaleLowerCase().includes(query) ||
        item.title.toLocaleLowerCase().includes(query)
      ) {
        return item;
      }
    });
    setFilteredItems(searched);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        deleteItem,
        addItem,
        editItem,
        getItems,
        searchFilter,
        itemsLoading,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;

export const useItemsContext = () => useContext<IItemsContext>(ItemsContext);
