import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import usePersist from "../../hooks/usePersist"
import { RootState, useAppselector } from "../store"
import { useRefreshMutation } from "./authApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useAppselector((state: RootState) => state.auth.token);
  // const effectRan = useRef(false);
  // const [trueSuccess, setTrueSuccess] = useState<boolean>(false);

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation();

  useEffect(() => {

    const verifyRefreshToken = async () => {

      try {

        await refresh('');

      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();

    return () => console.log("")

    // eslint-disable-next-line
  }, []);

  let content
  if (token || !token) { // persist: no
    // console.log('no persist')
    content = <Outlet />
  }
  else if (isLoading) { //persist: yes, token: no
    // console.log('loading')
    content = <PulseLoader color={"#FFF"} />
  } else if (isError) { //persist: yes, token: no
    // console.log('error')
    content = (
      <p className='errmsg'>
        {`${error} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess) { //persist: yes, token: yes
    // console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
    // console.log('token and uninit')
    content = <Outlet />
  }

  return content

};

export default PersistLogin;

