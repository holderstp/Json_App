import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Users from "./pages/Users";
import Photos from "./pages/photos";
import UserDetail from "./pages/userDetails";

function App() {
  return (
    <div className=" h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<UserDetail />}></Route>
            <Route path="/photos" element={<Photos />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
