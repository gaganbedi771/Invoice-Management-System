import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/signin", {
        email: email,
        password: password,
      });
      const result=response.data;
      
       if (result.success) {

      localStorage.setItem("token", result.data.token);

      navigate("/dashboard");

    } else {

      alert(result.message);
      

    }
    } catch (error) {
      console.log(error);

    alert(
      error.response?.data?.message || "Login failed"
    );
    }
   
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
