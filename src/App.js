import logo from './logo.svg';
import './App.css';
// import BoxScene from './threejs/myapp';
import HomePage from './pages/main';
import { useState } from 'react';
function App() {
  let  [listener,setListener] = useState(false)
  if(listener)
  console.log('working')
  return (
    <div className="App">
        <HomePage setListener={setListener} listener={listener}/>
    </div>
  );
}

export default App;
