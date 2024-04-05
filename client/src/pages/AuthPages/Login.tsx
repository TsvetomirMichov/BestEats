import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/auth/AuthSlice'
import { useLoginMutation } from '../../redux/auth/authApiSlice'
import usePersist from '../../hooks/usePersist'




const Login = () => {

  const errRef = useRef(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation();

  const [persist, setPersist] = usePersist()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      console.log('fulfilled', accessToken)
      dispatch(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg("Login failed");
      }
      errRef.current;
    }
  }

  const handleUserInput = (e: any) => setEmail(e.target.value)
  const handlePwdInput = (e: any) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev: unknown) => !prev)


  if (isLoading) return <p>Loading...</p>
  if(errMsg) return <p>Error: ${errMsg}</p>

  const content = (
    <section className="w-80 mx-auto">
      <header>
        <h1 className="text-3xl font-bold mb-4 flex w-full justify-center">Sign in</h1>
      </header>
      <main className="bg-gray-100 rounded-lg p-6">

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-black font-bold block mb-2">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="email"
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
              minLength={8}
              maxLength={12}
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

          <div className="flex text-center justify-center flex-col">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
            <Link to={'/register'} className="text-indigo-500 underline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create account
            </Link>
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