import React from 'react';
import Child2 from './Child2';
import './App.css'; // Import the stylesheet

function Child1() {
  return (
    <div className="child1">
      <h2>Child-1 Component</h2>
      <Child2 />
    </div>
  );
}

export default Child1;