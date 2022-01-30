import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./Components/Add";
import All from "./Components/All";
import Sidebar from "./Components/Sidebar";
import SingleItem from "./Components/SingleItem";
import ItemsContextProvider from "./context";

function App() {
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);

  const handleSidebarState = () => {
    setSidebarExpand(!sidebarExpand);
  };

  return (
    <ItemsContextProvider>
      <div className="App">
        <Sidebar
          handleSidebarState={handleSidebarState}
          sidebarExpand={sidebarExpand}
        />
        <div className={`Routes ${sidebarExpand ? "" : "sidebar-compress"}`}>
          <Routes>
            <Route path="/" element={<All />} />
            <Route path="items">
              <Route path=":singleItem" element={<SingleItem />} />
            </Route>
            <Route path="add" element={<Add />} />
          </Routes>
        </div>
      </div>
    </ItemsContextProvider>
  );
}

export default App;
