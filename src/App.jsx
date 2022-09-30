import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import MainRecipies from "./Components/Recipies/Main";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Recipies" element={<MainRecipies/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
