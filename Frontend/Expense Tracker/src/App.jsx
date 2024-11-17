import React, { useEffect,useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import Home from './components/Home'
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Expense from "./components/Expense";
import Email from "./components/Email";



export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null
  })
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/')
    .then(user => {
      setUser(user.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/editexpense/:id" element={<Edit/>}></Route>
          <Route path="/expense/:id" element={<Expense/>}></Route>
          <Route path="/email" element={<Email/>}></Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
