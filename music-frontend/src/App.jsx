import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SongsLists from "./pages/SongsList";
import AddSong from "./pages/AddSong";
import Song from "./pages/Song";
import NavBar from "./components/NavBar"
import SongsList from "./pages/SongsList";

function App() {
  return (
    <div className="bg-slate-300 min-h-screen">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<SongsList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AddSong" element={<AddSong />} />
          <Route path="/Song" element={<Song />} />
        </Routes>
      </BrowserRouter>,
    </div>
  )
}

export default App
