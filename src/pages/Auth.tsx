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
  email: "",
  password: "",
} as IUser;

function Auth() {
  const [userDetails, setUserDetails] = useState<IUser>(userDetailsState);
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticate, errors } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await authenticate(userDetails);
    setLoading(false);
    navigate("/", { replace: true });
  };

  return (
    <Paper
      sx={{
        backgroundColor: "primary",
        width: 500,
        maxWidth: "90%",
        margin: "auto",
        marginTop: 6,
      }}
    >
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}>
        <Typography
          align="center"
          children={"Login"}
          variant="h1"
          color="primary"
        />
        <Box mx={2} my={4} component={"div"}>
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
              control={<Checkbox size="small" />}
            />
          </Grid>
          <Grid textAlign={"right"} item xs={6} md={6}>
            <Link
              style={{ marginRight: 20, color: "primary.dark" }}
              to={"/register"}
            >
              Register
            </Link>
          </Grid>
        </Grid>
        <Typography textAlign={"center"} sx={{ fontSize: 16 }} color={"error"}>
          {errors.login.code}
        </Typography>
        <Button
          type="submit"
          fullWidth
          color="secondary"
          sx={{
            height: 80,
            backgroundColor: "primary.main",
            fontSize: 20,
            "&:hover": { color: "primary.main" },
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>
    </Paper>
  );
}

export default Auth;
