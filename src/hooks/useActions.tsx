import { FC, useState } from "react";
import { IItems } from "../utils/interfaces";

interface ItemProps {
  item: IItems;
}

const useActions: FC<ItemProps> = ({ item }) => {
  const [editState, setEditState] = useState<IItems>({
    id: item.id,
    title: item.title,
    body: item.body,
    date: new Date().toLocaleDateString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return <div></div>;
};

export default useActions;
