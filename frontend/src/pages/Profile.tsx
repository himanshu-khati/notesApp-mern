import { useContext, useEffect } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_AUTH } from "../utils/constants";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const Profile = () => {
  const {
    setUser,
    setIsAuthenticated,
    isAuthenticated,
    setLoading,
    loading,
    user,
  } = useContext(Context);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_AUTH}/me`, {
        withCredentials: true,
      });
      setUser(response?.data?.user);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("Some error occurred");
      }
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated && fetchUserDetails();
  }, []);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};
export default Profile;
