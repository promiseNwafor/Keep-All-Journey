import { Route, Routes } from "react-router-dom";
import Add from "./Components/Add";
import All from "./Components/All";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import SingleItem from "./Components/SingleItem";
import ItemsContextProvider from "./context";
import Auth from "./pages/Auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, purple, pink } from "@mui/material/colors";
import Register from "./pages/Register";

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: {
      main: pink[50],
    },
  },
});

function App() {
  return (
    <ItemsContextProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<All />} />
            <Route path="items">
              <Route path=":singleItem" element={<SingleItem />} />
            </Route>
            <Route path="add" element={<Add />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ItemsContextProvider>
  );
}

export default App;
