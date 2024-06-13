import './App.css';
import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';




function App() {
  const [alert , setalert] = useState(null);
  
  const show_alert=(message, type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
      document.title = "Text Changer - Home"
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route path="/" element={<Home showAlert={show_alert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={show_alert} />} />
              <Route path="/signup" element={<Signup showAlert={show_alert} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
