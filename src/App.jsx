import Home from "./views/HomeView/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/LoginView";
import Layout from "./components/Layout/Layout";
import Users from "./views/Users/Users";
import Groups from "./views/Groups/Groups";
import Roles from "./views/Roles/Roles";
import { faUser, faUserGroup, faGear } from "@fortawesome/free-solid-svg-icons";
import AddUpdate from "./views/AddUpdate/AddUpdate";
import ViewData from "./views/View-Mode/ViewData";

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
            <Route
              path="add-new-user"
              element={<AddUpdate entity={"user"} icon={faUser} task={"add"} />}
            />
            <Route
              path="add-new-group"
              element={
                <AddUpdate entity={"group"} icon={faUserGroup} task={"add"} />
              }
            />
            <Route
              path="add-new-role"
              element={<AddUpdate entity={"role"} icon={faGear} task={"add"} />}
            />
            <Route
              path="edit-role"
              element={
                <AddUpdate entity={"role"} icon={faGear} task={"update"} />
              }
            />
            <Route
              path="edit-user"
              element={
                <AddUpdate entity={"user"} icon={faUser} task={"update"} />
              }
            />
            <Route
              path="edit-group"
              element={
                <AddUpdate
                  entity={"group"}
                  icon={faUserGroup}
                  task={"update"}
                />
              }
            />
            <Route
              path="/users/:id"
              element={
                <ViewData
                  entity={"users"}
                  showRoles={true}
                  showGroups={true}
                  showUsers={false}
                />
              }
            />
            <Route
              path="/roles/:id"
              element={
                <ViewData
                  entity={"roles"}
                  showRoles={false}
                  showGroups={true}
                  showUsers={true}
                />
              }
            />
            <Route
              path="/groups/:id"
              element={
                <ViewData
                  entity={"groups"}
                  showRoles={true}
                  showGroups={false}
                  showUsers={true}
                />
              }
            />
            <Route
              path="/users/:id/change-password"
              element={
                <AddUpdate
                  entity={"user"}
                  icon={faUser}
                  task={"change-password"}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
