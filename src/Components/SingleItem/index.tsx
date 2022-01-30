import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useItemsContext } from "../../context";
import { IItems } from "../../utils/interfaces";
import { card } from "../../utils/styles";

const SingleItem = () => {
  const { state }: any = useLocation();
  const item: IItems = state.item;
  const { items, setItems, handleDelete } = useItemsContext();

  const [editState, setEditState] = useState<IItems>({
    id: item.id,
    title: item.title,
    body: item.body,
    date: new Date().toLocaleDateString(),
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);

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
      <Container>
        <Row key={item.id} className="my-4 p-2" style={card}>
          <Col>
            <div className="d-flex justify-content-between">
              <small>{item.date}</small>
              <div className="actions">
                <small className="m-2" onClick={toggleEdit}>
                  Edit
                </small>
                <small className="" onClick={() => handleDelete(item.id)}>
                  Delete
                </small>
              </div>
            </div>
            <hr />
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </Col>
        </Row>
      </Container>
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

export default SingleItem;
