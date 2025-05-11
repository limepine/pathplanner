import React from 'react';
import PathCanvas from './components/Canvas/pathCanvas'; // Adjust path as needed

function App() {
  return (
    <div className="App">
      <h1>PathPlanner</h1>
      <PathCanvas />  {/* Your main canvas component */}
    </div>
  );
}

export default App;