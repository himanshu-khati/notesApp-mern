import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_AUTH } from "../utils/constants";
import toast from "react-hot-toast";
import { Context } from "../main";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(name, email, password);
      const { data } = await axios.post(
        `${SERVER_AUTH}/register`,
        {
          name,
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
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
          <Link to="/login">
            <button type="submit" disabled={loading}>
              Login
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;