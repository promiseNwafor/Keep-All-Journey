import { Route, Routes } from "react-router-dom";
import Add from "./Components/Add";
import All from "./Components/All";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import SingleItem from "./Components/SingleItem";
import ItemsContextProvider from "./context";

function App() {
  return (
    <ItemsContextProvider>
      <div className="App">
        <Routes>
          <Route path="auth" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<All />} />
            <Route path="items">
              <Route path=":singleItem" element={<SingleItem />} />
            </Route>
            <Route path="add" element={<Add />} />
          </Route>
        </Routes>
      </div>
    </ItemsContextProvider>
  );
}

export default App;
