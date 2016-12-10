import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ResouceList from './component/ResourceList.jsx'

function App() {
  return (
    <div style={{ margin: 10 }}>
      <ResouceList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
