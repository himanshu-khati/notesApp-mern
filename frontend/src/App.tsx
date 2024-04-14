import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { SERVER_AUTH } from "./utils/constants";
import { Context } from "./main";

function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${SERVER_AUTH}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        axios.isAxiosError(error)
          ? toast.error(error?.response?.data.message)
          : toast.error("some error");
        setUser({
          _id: "",
          name: "",
          email: "",
          createdAt: new Date(),
          __v: 0,
        });
        setIsAuthenticated(false);
      });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
