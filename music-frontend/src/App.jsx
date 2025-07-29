import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ManageSongs from "./pages/ManageSongs";
import AddSong from "./pages/AddSong";
import Song from "./pages/Song";

function App() {
  return (
    <>
      Music MERN APP
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AddSong" element={<AddSong />} />
          <Route path="/ManageSongs" element={<ManageSongs />} />
          <Route path="/Song" element={<Song />} />
        </Routes>
      </BrowserRouter>,
    </>
  )
}

export default App
