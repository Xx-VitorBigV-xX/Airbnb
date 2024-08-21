
import "./App.css";
import {Route, Routes,} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import {useEffect} from "react";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import axios from "axios";

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true;


function App() {
  return (
    <UserContextProvider>
  <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage />} />
      {/** //? este path /login é o indereço / da url */}
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Route>  
  </Routes>
   </UserContextProvider>
  )
}
export default App
