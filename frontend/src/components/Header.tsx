import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_AUTH } from "../utils/constants";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${SERVER_AUTH}/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      axios.isAxiosError(error)
        ? toast.error(error?.response?.data.message)
        : toast.error("some error");
      setIsAuthenticated(true);
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
          <Link
            to="/logout"
            onMouseDown={logoutHandler}
            aria-disabled={loading}
          >
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
