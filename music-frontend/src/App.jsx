import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer.jsx";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { lazy, Suspense } from 'react';
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

const AddSong = lazy(() => import('./pages/AddSong'));
const Song = lazy(() => import('./pages/Song'));
const SongsList = lazy(() => import('./pages/SongsList'));

const UsersList = lazy(() => import('./pages/UsersList'));

const SongHistory = lazy(() => import('./pages/SongHistory'));

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <NavBar />
          <Suspense fallback={<div>Loading page...</div>}>
            <main className="flex-1 bg-gradient-to-b from-slate-100 to-slate-500 overflow-hidden">
              <Routes>
                {/* Public Routes */}
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/ChangePassword/:token" element={<ChangePassword />} />
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
            </main>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
