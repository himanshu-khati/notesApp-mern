import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_AUTH } from "../utils/constants";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, setLoading, setUser } =
    useContext(Context);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_AUTH}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsAuthenticated(false);
        setUser(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Notes App</h2>
      </div>
      <article>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <Link to="#" onClick={logoutHandler}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </article>
    </nav>
  );
};

export default Header;
