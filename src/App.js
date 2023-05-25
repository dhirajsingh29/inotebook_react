import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from 'react';

import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [alert, setAlert] = useState(null);

  const displayAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>

              <Route exact path='/'
                element={<Home />}>
              </Route>

              <Route exact path='/about'
                element={<About />}>
              </Route>

              <Route exact path='/login'
                element={<Login displayAlert={displayAlert} />}>
              </Route>

              <Route exact path='/signup'
                element={<Signup displayAlert={displayAlert} />}>
              </Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
