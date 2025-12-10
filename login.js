import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogin = () => {
    if (!selectedUser) return alert("Please select a user!");
    const user = users.find(u => u.id === parseInt(selectedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "/news"; // redirect
  };

  return (
    <div>
      <h2>Login</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
