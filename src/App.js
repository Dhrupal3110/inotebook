import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/NavBar";
import About from "./component/About";
import NoteState from "./contexts/notes/NotesState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message={"This is amysiging"}/>
          <div className="container">
            <Switch>
              <Route exact path="/" >
              <Home />
              </Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/login" ><Login/></Route>
              <Route exact path="/signup" ><SignUp /></Route>
              
              </Switch>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
