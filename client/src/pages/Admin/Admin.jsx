import React from 'react'
import { Link } from 'react-router-dom'
import NotesList from '../../redux/notes/NotesList';
import OrdersList from '../../redux/orders/OrderLIst';
import UserList from '../../redux/users/UserLIst';
const Admin = () => {
  return (
    <div className='mt-[2em]'>
      <div className='flex justify-between flex-col md:flex-row '>
        <h1 className='font-bold m-5 text-5xl'>Products list</h1>
        <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link>
      </div>
      <NotesList />

      <div className='flex justify-between flex-col md:flex-row mt-[2em]'>
        <h1 className='font-bold m-5 text-5xl'>Orders list</h1>
        {/* <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link> */}
      </div>
      <OrdersList/>

      <div className='flex justify-between flex-col md:flex-row mt-[2em]'>
        <h1 className='font-bold m-5 text-5xl'>Users list</h1>
        {/* <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link> */}
      </div>
      <UserList/>
   
    </div>
  )
}

export default Admin