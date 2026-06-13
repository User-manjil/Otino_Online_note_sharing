import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/reusable/Navbar";
import Footer from "./Components/reusable/Footer";

import Home from "./Components/Pages/Home";
import BrowseNote from "./Components/Pages/BrowseNote";
import NoteDetail from "./Components/Pages/NoteDetail";
import Proflile from "./Components/Pages/Proflile";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";

const App = () => {
  return (
    <div className="w-full px-2 sm:px-10 ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/profile" element={<Proflile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

