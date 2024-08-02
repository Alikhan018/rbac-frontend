// import Table from "./components/Table/Table";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "./components/shared/Card/Card";
import Home from "./views/HomeView/Home";

// import LoginView from "./views/Login/LoginView";
const user = {
  icon: faUser,
  name: "users",
  qty: 5,
};
function App() {
  return (
    <div>
      {/* <LoginView /> */}
      <Home />
      {/* <Table /> */}
      <Card entity={user} />
    </div>
  );
}

export default App;
