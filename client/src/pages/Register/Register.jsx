import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
//import  bgimg from "../assets/natural-landscape-wallpaper-video-conferencing_23-2148651571.webp"

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: null,
    role: "Customer"
  })

  const navigate = useNavigate();

  const fetchUserDataRegister = async () => {
     //Getting data from the backend
    try {
      const { data } = await axios.post('http://localhost:1337/register', {
        ...values,
      },
        {// // We use [ Credentials ]  To enable HTTP cookies over CORS 
          withCredentials: true,
        }
      )
      // log the data
      if (data) {
        if (data.error) {
          const { name, email, password } = data.error;
          if (name) return new Error("invalid credentials");
          else if (email) return new Error("invalid credentials");
          else if (password) return new Error("invalid credentials")
        } else {
          navigate("/login");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <section className="w-80 mx-auto">
      <header className='justify-center align-middle flex'>
        <h1 className="text-3xl font-bold mb-4 ">Register</h1>
      </header>
      <main className="bg-gray-100 rounded-lg p-6">
        <form className="flex " onSubmit={fetchUserDataRegister}>
          <header className='flex flex-col items-center justify-center gap-4 p-4 '>
            <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              name="name"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              type="text"
              placeholder='Enter your name'
            />
            <input   className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              name="email"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              type="text"
              placeholder='Enter valid email'
            />
            <input   className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              name="password"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              type="password"
              placeholder='Enter your password'
            />
            <input className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              name="phone"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              type="number"
              minLength={8}
              maxLength={8}
              placeholder='Enter your phone'
            />
            <input className="text-[2rem] border-[2px] border-black rounded-md p-1 mr-20 mt-3 text-black" type="submit" value="Sign up" />
            <div className='flex flex-col align-middle justify-center p-1'>
              <span className="text-[20px] text-black italic  decoration-yellow-100 pt-10">Already have an account? </span>
              <a href="/login" className="text-[20px] text-black italic  decoration-yellow-100 pt-1" ><ins> Sign in</ins></a>
            </div>
          </header>
          <div className='bg-formPicture flex-1 bg-cover ' />
        </form>
      </main>
      <footer className="text-center mt-4">
        <Link to="/" className="text-indigo-500 underline">Back to Home</Link>
      </footer>
    </section>
  );
}

export default Register;
