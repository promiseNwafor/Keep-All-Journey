import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useAuthContext } from "../../context/AuthContext";
import { IUser } from "../../utils/interfaces";

const userDetailsState: IUser = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [userDetails, setUserDetails] = useState<IUser>(userDetailsState);
  const { signUp, authenticate, errors, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(userDetails);
    // await authenticate(userDetails);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={(e) => handleSignUp(e)}>
          <FormGroup>
            <Label for="name">Username</Label>
            <Input
              name="name"
              placeholder="Enter name"
              value={userDetails?.name}
              onChange={(e) => handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              name="email"
              placeholder="Enter email"
              value={userDetails?.email}
              onChange={(e) => handleInputChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={userDetails?.password}
              onChange={(e) => handleInputChange(e)}
            />
          </FormGroup>
          <div className="error">{<h3>{errors?.register?.code}</h3>}</div>
          <div className="d-flex align-items-center justify-content-between">
            <Button type="submit">{loading ? "Loading..." : ""} Sign Up</Button>
            <p>
              <Link to={"/auth"}>Login here</Link>
            </p>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
