import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_NOTES } from "../utils/constants";
import toast from "react-hot-toast";
import NoteItem from "../components/NoteItem";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

export interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  isEdited: boolean;
  user: string;
  __v: number;
}

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_NOTES}/getAllNotes`, {
        withCredentials: true,
      });
      setNotes(response?.data?.notes);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("Some error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${SERVER_NOTES}/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      axios.isAxiosError(error)
        ? toast.error(error?.response?.data.message)
        : toast.error("some error");
      setLoading(true);
    }
  };

  const updateHandler = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      const { data } = await axios.put(
        `${SERVER_NOTES}/${id}`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      axios.isAxiosError(error)
        ? toast.error(error?.response?.data.message)
        : toast.error("some error");
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await axios.delete(`${SERVER_NOTES}/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      axios.isAxiosError(error)
        ? toast.error(error?.response?.data.message)
        : toast.error("some error");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [refresh]);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
            <button disabled={loading} type="submit">
              Add Note
            </button>
          </form>
        </section>
      </div>
      <section className="notesContainer">
        {notes.map((note) => (
          <NoteItem
            key={note?._id}
            title={note.title}
            id={note?._id}
            description={note.description}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
