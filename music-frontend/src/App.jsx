import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddSong from "./pages/AddSong";
import Song from "./pages/Song";
import NavBar from "./components/NavBar"
import SongsList from "./pages/SongsList";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <div className="bg-slate-300 min-h-screen overflow-hidden">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                {/* Public Routes */}
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <SongsList />
                    </ProtectedRoute>
                  } />
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
                  path="/Song/:id"
                  element={
                    <ProtectedRoute>
                      <Song />
                    </ProtectedRoute>
                  } />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
