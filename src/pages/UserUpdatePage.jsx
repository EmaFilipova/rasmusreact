import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();

    async function getUser() {
      const response = await fetch(
        `https://book-app-8d131-default-rtdb.firebaseio.com/users/${id}.json`
      );
      const data = await response.json(); // get data from local storage
      setUser(data); // set the user state with the data from local storage
    }
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!
  useEffect(() => {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    setUser(usersData.find((user) => user.id === id));
  }, [id]); // <--- "[params.id]" VERY IMPORTANT!!!

  async function updateUser(userToUpdate) {
    const response = await fetch(
      `https://book-app-8d131-default-rtdb.firebaseio.com/users/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userTopUpdate),
      }
    );
    console.log(response);
    if (response.ok) {
      navigate(`/users/${id}`);
    } else {
      console.log("An arror occurred while updating the user");
    }
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <UserForm onSubmit={updateUser} onCancel={handleCancel} user={user} />
      </div>
    </section>
  );
}
