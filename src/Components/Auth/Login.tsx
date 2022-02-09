import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useAuthContext } from "../../context/AuthContext";
import { IUser } from "../../utils/interfaces";

const userDetailsState: IUser = {
  email: "",
  password: "",
} as IUser;

const Login = () => {
  const [userDetails, setUserDetails] = useState<IUser>(userDetailsState);
  const { authenticate, errors, loading } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authenticate(userDetails);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={(e) => handleLogin(e)}>
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
          <div className="error">{<h3>{errors?.login?.code}</h3>}</div>
          <div className="d-flex align-items-center justify-content-between">
            <Button type="submit">{loading ? "Loading..." : ""} Login</Button>
            <p>
              <Link to={"/register"}>Register here</Link>
            </p>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
