import Home from "./views/HomeView/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/LoginView";
import Layout from "./components/Layout/Layout";
import Users from "./views/Users/Users";
import Groups from "./views/Groups/Groups";
import Roles from "./views/Roles/Roles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="groups" element={<Groups />} />
            <Route path="roles" element={<Roles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
