import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './component/Home';
import Navbar from "./component/NavBar";
import About from "./component/About"

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
         
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
