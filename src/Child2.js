import React from 'react';
import Child3 from './Child3';
import './App.css'; // Import the stylesheet

function Child2() {
  return (
    <div className="child2">
      <h3>Child-2 Component</h3>
      <Child3 />
    </div>
  );
}

export default Child2;