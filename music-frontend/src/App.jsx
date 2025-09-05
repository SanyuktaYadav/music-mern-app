import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddSong from "./pages/AddSong";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Song from "./pages/Song";
import SongsList from "./pages/SongsList";
import UsersList from "./pages/UsersList.jsx";
import SongHistory from "./pages/SongHistory.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-slate-100 to-slate-500 min-h-screen overflow-hidden">
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* Public Routes */}
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/" element={<SongsList />} /> {/* add restriction inside for if not loggedin */}
            <Route path="/Song/:id" element={<Song />} />  {/* add restriction inside if not loggedin */}

            {/* Protected Routes */}

            <Route
              path="/AddSong"
              element={
                <ProtectedRoute>
                  <AddSong />
                </ProtectedRoute>
              } />
            <Route
              path="/EditSong/:id"
              element={
                <ProtectedRoute>
                  <AddSong />
                </ProtectedRoute>}
            />
            <Route
              path="/Users"
              element={
                <ProtectedRoute>
                  <UsersList />
                </ProtectedRoute>}
            />
            <Route
              path="/SongHistory"
              element={
                <ProtectedRoute>
                  <SongHistory />
                </ProtectedRoute>}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
