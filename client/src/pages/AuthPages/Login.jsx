import React from 'react'
import {useRef,useState,useEffect} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'  
import { setCredentials } from '../../redux/auth/AuthSlice' 
import { useLoginMutation } from '../../redux/auth/authApiSlice'
import useAuth from '../../hooks/useAuth'
import jwtDecode from 'jwt-decode'
import { useAppselector } from '../../redux/store'
import usePersist from '../../hooks/usePersist'

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation();

    const [persist, setPersist] = usePersist()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
             const { accessToken } = await login({ email, password }).unwrap()
             console.log('fulfilled', accessToken)
            dispatch(setCredentials({accessToken}))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="w-80 mx-auto">
        <header>
          <h1 className="text-3xl font-bold mb-4">Employee Login</h1>
        </header>
        <main className="bg-gray-100 rounded-lg p-6">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
      
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-black font-bold block mb-2">
                Email:
              </label>
              <input
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="email"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="password" className="text-black font-bold block mb-2">
                Password:
              </label>
              <input
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="persist" className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                />
                <span className="text-sm">Trust This Device</span>
              </label>
            </div>
      
            <div className="flex justify-center">
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </main>
        <footer className="text-center mt-4">
          <Link to="/" className="text-indigo-500 underline">Back to Home</Link>
        </footer>
      </section>
      
    )

    return content

}

export default Login