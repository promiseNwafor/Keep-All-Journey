import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useItemsContext } from "../../context";
import { useAuthContext } from "../../context/AuthContext";
import Item from "./Item";

const All = () => {
  const { items, getItems } = useItemsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getItems();
  }, [user]);

  return (
    <>
      <Container>
        <h1>Welcome {user?.displayName}</h1>
        <img src={`${user?.photoURL}`} width={100} alt="" />
        <div className="Items-container">
          {items?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
        <div className="floating-button d-flex align-items-center justify-content-center">
          <h4 className="m-0">
            <Link to="add">+</Link>
          </h4>
        </div>
      </Container>
    </>
  );
};

export default All;
