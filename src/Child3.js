import React, { useContext } from 'react';
import UserContext from './UserContext';
import './App.css'; // Import the stylesheet

function Child3() {
  const usersArray = useContext(UserContext);

  return (
    <div className="child3">
      <h4>Child-3 Component</h4>
      <ul>
        {usersArray.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Child3;