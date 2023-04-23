import './App.css';
import { useEffect, useState } from 'react';
import { Channel } from './Components/Channel/Channel';

function App() {
  const [initialState, setState] = useState([]);

  const url = "/api";

  useEffect(() => {
    fetch(url).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(data => {
      setState(data);
    })
  }, []);

  return (
    <div className="App">
      <h1>React app</h1>
      <Channel data={initialState} />
    </div>
  );
}

export default App;
