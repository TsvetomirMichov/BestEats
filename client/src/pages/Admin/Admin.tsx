import { Link } from 'react-router-dom'
import NotesList from '../../redux/Products/NotesList';
import OrdersList from '../../redux/orders/OrderLIst';
import UserList from '../../redux/users/UserLIst';
import Restaurant from '../../redux/Restaurant/RestaurantDataGrid';

const Admin = () => {
  return (
    <div className='mt-[2em]'>
      <div className='flex justify-between flex-col md:flex-row '>
        <h1 className='font-bold m-5 text-5xl'>Products </h1>
        <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link>
      </div>
      <NotesList />

      <div className='flex justify-between flex-col md:flex-row mt-[2em]'>
        <h1 className='font-bold m-5 text-5xl'>Orders </h1>
        {/* <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link> */}
      </div>
      <OrdersList />

      <div className='flex justify-between flex-col md:flex-row mt-[2em]'>
        <h1 className='font-bold m-5 text-5xl'>Restaurants</h1>
        <Link to={'/admin/restaurant/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> New Restaurant</button>
        </Link>
      </div>
      <Restaurant />

      <div className='flex justify-between flex-col md:flex-row mt-[2em]'>
        <h1 className='font-bold m-5 text-5xl'>Users</h1>
        {/* <Link to={'/admin/new'} replace={true} >
          <button className='font-bold m-5 text-2xl bg-orange-400 p-1 rounded-xl'> Create Product</button>
        </Link> */}
      </div>
      <UserList />


    </div>
  )
}

export default Admin