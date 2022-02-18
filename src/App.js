import "./App.css";
import { Route, Switch, BrowserRouter ,} from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/NavBar";
import About from "./component/About";
import NoteState from "./contexts/notes/NotesState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { useState } from "react";

const App = () => {
  const[alert,setAlert]=useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
        {/* <Router> */}
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/" >
              <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/login" ><Login showAlert={showAlert}/></Route>
              <Route exact path="/signup" ><SignUp showAlert={showAlert} /></Route>
              
              </Switch>
          </div>
          {/* </Router> */}
        </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
