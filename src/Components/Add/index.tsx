import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";

const Add = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { setItems } = useItemsContext();

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setItems((prevState) => [
      ...prevState,
      {
        id: prevState.length,
        title: (titleRef.current as HTMLInputElement).value,
        body: (bodyRef.current as HTMLInputElement).value,
        date: new Date().toLocaleDateString(),
      },
    ]);
    navigate("/");
    (titleRef.current as HTMLInputElement).value = "";
    (bodyRef.current as HTMLInputElement).value = "";
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleAddItem(e)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Enter Title</Form.Label>
          <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Note</Form.Label>
          <Form.Control ref={bodyRef} type="text" placeholder="Body" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
