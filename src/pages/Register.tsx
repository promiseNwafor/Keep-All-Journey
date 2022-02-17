import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { IUser } from "../utils/interfaces";

const userDetailsState: IUser = {
  name: "",
  email: "",
  password: "",
};

function Register() {
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
    <Paper
      sx={{
        width: 500,
        margin: "auto",
        marginTop: 6,
      }}
    >
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSignUp(e)}>
        <Typography
          align="center"
          color={"primary"}
          children={"Register"}
          variant="h2"
          py={2}
        />
        <Box mx={2} my={2} component={"div"}>
          <TextField
            id="name"
            type={"text"}
            label="Name"
            fullWidth
            variant="outlined"
            name="name"
            sx={{ marginBottom: 6 }}
            value={userDetails?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <TextField
            id="email"
            type={"email"}
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            sx={{ marginBottom: 6 }}
            value={userDetails?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <TextField
            id="password"
            type={"password"}
            label="Password"
            fullWidth
            variant="outlined"
            name="password"
            value={userDetails?.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
        </Box>
        <Grid height={60} container spacing={2}>
          <Grid item xs={6} md={6}>
            <FormControlLabel
              label="Remember me"
              sx={{ marginLeft: 0.5, color: "primary.dark" }}
              control={<Checkbox color="primary" size="small" />}
            />
          </Grid>
          <Grid textAlign={"right"} item xs={6} md={6}>
            <Link
              style={{ marginRight: 20, color: "primary.dark" }}
              to={"/auth"}
            >
              Login
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          children={"Register"}
          color="secondary"
          sx={{
            height: 80,
            backgroundColor: "primary.main",
            fontSize: 20,
            "&:hover": { color: "primary.main" },
          }}
        />
      </form>
    </Paper>
  );
}

export default Register;
