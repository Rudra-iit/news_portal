import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    axios.get("http://localhost:3000/news")
      .then(res => setNews(res.data));

    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));
  }, []);

  const getAuthorName = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : "Unknown";
  };

  const handleDelete = async (id, authorId) => {
    if (loggedInUser.id !== authorId) {
      alert("You can only delete your own posts!");
      return;
    }
    await axios.delete(`http://localhost:3000/news/${id}`);
    setNews(news.filter(n => n.id !== id));
  };

  return (
    <div>
      <h2>News List</h2>
      <p>Logged in as: {loggedInUser.name}</p>
      <button onClick={() => window.location.href="/create"}>Create News</button>
      <ul>
        {news.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>By {getAuthorName(item.author_id)}</p>
            <button onClick={() => window.location.href=`/news/${item.id}`}>View Details</button>
            {loggedInUser.id === item.author_id && (
              <>
                <button onClick={() => window.location.href=`/edit/${item.id}`}>Edit</button>
                <button onClick={() => handleDelete(item.id, item.author_id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
