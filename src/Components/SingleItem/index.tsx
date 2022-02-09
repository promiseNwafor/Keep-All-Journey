import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import { IItems } from "../../utils/interfaces";
import { card } from "../../utils/styles";

const SingleItem = () => {
  const { state }: any = useLocation();
  const item: IItems = state.item;
  const { editItem, deleteItem } = useItemsContext();
  const navigate = useNavigate();

  const [editState, setEditState] = useState<IItems>({
    title: item.title,
    body: item.body,
    date: item.date,
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
    editItem(item.id as string, editState);
    toggleEdit();
    navigate(`/`);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
    navigate(`/`);
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
                <small
                  className=""
                  onClick={() => handleDelete(item.id as string)}
                >
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
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={handleInputChange}
                value={editState?.date}
                placeholder="Date"
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
