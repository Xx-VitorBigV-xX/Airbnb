import axios from "axios";
import Header from "../Header";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev){
    ev.preventDefault();
    try{
      await axios.post('http://localhost:4000/register',{
        name,
        email,
        password,
      });
      alert('registration successful. Now you can log in');
    }catch (e){
      alert('Resgistration failed, Email its alredy use. Pleas try again later')
    }
 
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto "onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
