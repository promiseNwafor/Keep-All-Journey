import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import { IItems } from "../../utils/interfaces";

const Add = () => {
  const [state, setState] = useState<IItems>({
    title: "",
    body: "",
    date: new Date().toString(),
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { addItem } = useItemsContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(state);
    navigate("/");
    (titleRef.current as HTMLInputElement).value = "";
    (bodyRef.current as HTMLInputElement).value = "";
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleAddItem(e)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Enter Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={handleInputChange}
            value={state?.title}
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="body"
            onChange={handleInputChange}
            value={state?.body}
            placeholder="Body"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            onChange={handleInputChange}
            value={state?.date}
            placeholder="Date"
          />
        </Form.Group>
        <Button className="w-50" variant="secondary" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
