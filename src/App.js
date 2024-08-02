import Home from "./views/HomeView/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/LoginView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route>
            <Route path="/home" element={<Navbar />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
