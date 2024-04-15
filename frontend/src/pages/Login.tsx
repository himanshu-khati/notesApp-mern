import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_AUTH } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${SERVER_AUTH}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setEmail("");
      setPassword("");
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      axios.isAxiosError(error)
        ? toast.error(error?.response?.data.message)
        : toast.error("some error");
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
          <Link to={"/register"}>
            <button type="submit" disabled={loading}>
              Sign Up
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
