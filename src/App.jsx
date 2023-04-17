import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navegation from "./components/Navigation";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="App">
      <Navegation />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/edit/:id" element={<CreateUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
