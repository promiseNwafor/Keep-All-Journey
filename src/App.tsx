import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./Components/Add";
import All from "./Components/All";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Sidebar from "./Components/Sidebar";
import SingleItem from "./Components/SingleItem";
import ItemsContextProvider from "./context";
import AuthContextProvider from "./context/AuthContext";

function App() {
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);

  const handleSidebarState = () => {
    setSidebarExpand(!sidebarExpand);
  };

  return (
    // <AuthContextProvider>
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
      {/* </AuthContextProvider> */}
    </ItemsContextProvider>
  );
}

export default App;
