import { FC } from "react";
import { IItems } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface ItemProps {
  item: IItems;
}

const Item: FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`items/${item.id}`, { state: { item } })}
        className="Item-container p-3 my-3"
      >
        <div className="d-flex justify-content-between">
          <h4 className="date">{item.date}</h4>
        </div>
        <hr />
        <h2>{item.title}</h2>
        <p>{item.body}</p>
      </div>
    </>
  );
};

export default Item;
