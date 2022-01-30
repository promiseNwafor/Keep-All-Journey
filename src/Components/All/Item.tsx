import { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IItems } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import "./style.css";

interface ItemProps {
  item: IItems;
}

const Item: FC<ItemProps> = ({ item }) => {
  const [editState, setEditState] = useState<IItems>({
    id: item.id,
    title: item.title,
    body: item.body,
    date: new Date().toLocaleDateString(),
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { items, setItems } = useItemsContext();

  const toggleEdit = () => setShowEdit(!showEdit);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let index = items.indexOf(item);
    items[index] = editState;
    setItems((prevState) => [...prevState]);
    toggleEdit();
  };

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

      <Modal show={showEdit} onHide={toggleEdit}>
        <Form onSubmit={(e) => handleEdit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Enter Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleInputChange}
                value={editState?.title}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                name="body"
                onChange={handleInputChange}
                value={editState?.body}
                placeholder="Body"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button className="w-50" variant="secondary" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Item;
