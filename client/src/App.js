import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserCard from './components/UserCard';



function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res =>{
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("failed to retrieve users", err)
      });
  }, []);
  

  return (
    
    <div className="App">
          <h1>Hobbit Users</h1>
          {users.map(user => {
            return <UserCard users={user} />
          })}
    </div>
  );
}

export default App;
