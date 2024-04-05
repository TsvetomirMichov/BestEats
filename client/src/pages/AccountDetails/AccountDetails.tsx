import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { RootState, useAppselector } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/orders/orderApiSlice';
import axios from 'axios';
import UserAccImage from '../../assets/UserAccount.svg'
import { BiSolidDashboard } from 'react-icons/bi'
import { VscAccount } from 'react-icons/vsc'


type UserType = {
  _id: number,
  name: string,
  email: string,
  role: string,
  status: string,
  phone: string
}


type DecodedTokenType = {
  _id: string,
  name: string,
  role: string,
  phone: string,
}


type OrderType = {
  desc: string,
  id: string,
  img: string,
  price: number,
  quantity: number,
  title: string
}


type OrderDetailsType = {
  orderDetails: [OrderType],
  _id: number,
  userName: string,
  email: string,
  role: string,
  status: string,
  phone: string
}

const AccountDetails = () => {

  const token = useAppselector((state: RootState) => state.auth.token);
  const [userData, setUserData] = useState<UserType[]>([]);
  const [name, setUserName] = useState('');

  const [activeButtonOpen, setActiveButtonOpen] = useState('Dashboard');

  const handleButtonActive = (buttonName: string) => {
    setActiveButtonOpen(buttonName)
  }

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async (name: string) => {
      try {
        const res = await axios.get('http://localhost:1337/getSingleUser', {
          params: { name },
        });

        if (res.data ) {
          setUserData([res.data ]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      const decodedToken = jwt_decode<DecodedTokenType>(token);
      const userName = decodedToken?.name;
      setUserName(userName);

      loadUser(userName);
    } else {
      navigate('/');
    }

  }, [token, setUserName, navigate]);

  const {
    data: notes,
    isLoading,
    isSuccess,
  } = useGetOrdersQuery('ordersList', {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  // console.log("Notes ", notes)
  // console.log("User data : ", userData)


  if (isSuccess) {
    let myoders = notes
      .filter((item:OrderDetailsType) => item.userName === name)
      .map((item:OrderDetailsType, index: number) => (
        <div className="flex flex-col my-5  drop-shadow-lg rounded-md " key={index}>
          <div className="flex flex-col overflow-x-auto  ">
            <div>
              {item.orderDetails.map((order, index: number) => (
                <div key={index} className="flex flex-col my-1 text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <div className="flex flex-col ">
                    <div>
                      <table className=" min-w-[55em]">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className="mx-1">
                            <th scope="col" className="px-3 py-3">
                              Image
                            </th>
                            <th scope="col" className="px-3 py-3">
                              Title
                            </th>
                            <th scope="col" className="px-3 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-3 py-3 ">
                              Quantity
                            </th>

                            <th scope="col" className="px-3 py-3 ">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-3 py-4">
                              <img className="h-[10em] min-w-[10em] cover rounded-md border-1 border-teal-900" src={order.img} alt="" />
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                              {order.title}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                              <p className="max-w-[10em]">{order.price}</p>
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white ">
                              {order.quantity}
                            </td>

                            <td className={item.status === 'in-progress' ? 'px-3 py-4 font-semibold text-red-500 dark:text-white' : 'px-3 py-4 font-semibold text-green-500 dark:text-white'}>
                              {item.status}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ));
    content = myoders;
  }

  return (
    <div className="flex flex-col  mt-5 justify-center">
      <div className="flex flex-col mt-5 justify-center items-center h-[25em]" style={{ backgroundImage: `url(${UserAccImage})`, backgroundSize: 'cover', width: '100%' }}>
        <div className=" text-white text-center">
          <h1 className='text-6xl font-extrabold capitalize'>
            Profile Page
          </h1>
          <div className='mt-10 text-xl'>
            <Link className=' hover:text-orange-500' to="/">Home</Link> / Profile Page
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-evenly m-10 gap-10'>
        <div className='flex flex-col gap-2'>

          <button className={activeButtonOpen === 'Dashboard' ? 'text-lg text-white font-semibold  flex flex-row m-2 text-center items-center p-2 gap-3 bg-orange-400 ' : 'text-lg font-semibold text-black  flex flex-row m-2 text-center items-center p-2 gap-3 '}
            onClick={() => handleButtonActive('Dashboard')}>
            <BiSolidDashboard />
            <span>Dashboard</span>
          </button>

          <button className={activeButtonOpen === 'AccountDetails' ? 'text-lg text-white font-semibold  flex flex-row m-2 text-center items-center p-2 gap-3 bg-orange-400 ' : 'text-lg font-semibold text-black  flex flex-row m-2 text-center items-center p-2 gap-3 '}
            onClick={() => handleButtonActive('AccountDetails')}>
            <VscAccount />
            <span>Account Details</span>
          </button>
        </div>
        <div className="flex flex-col max-w-[55em] ">

          {/* Render components based on the activeButton state */}
          {activeButtonOpen === 'Dashboard' &&
            <div className='flex flex-col gap-2'>
              <span className='text-[2em] font-semibold  capitalize'>Hello {name}! </span>
              <span className='text-[1em] font-semibold my-[1em]'>From your account dashboard. you can easily check & view your recent orders,
                and view account details. </span>
              <span className='text-[2em] font-semibold mb-[1em]'>Your Orders </span>
              {content}
            </div>
          }

          {activeButtonOpen === 'AccountDetails' &&
            <div className='w-[30em]'>

              <h2 className="text-3xl font-semibold mb-3 text-orange-500">Account Details</h2>
              {userData.map((item: UserType) => (
                <div key={item._id} className="flex flex-col gap-3 rounded-3xl p-5 bg-white border border-gray-200 shadow-lg">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center text-2xl">
                      <label className="text-gray-600">Name:</label>
                      <input type="text" value={item.name} className="input-field ml-3" readOnly />
                    </div>
                    <div className="flex items-center text-2xl">
                      <label className="text-gray-600">Email:</label>
                      <input type="text" value={item.email} className="input-field ml-3" readOnly />
                    </div>
                    <div className="flex items-center text-2xl">
                      <label className="text-gray-600">Phone:</label>
                      <input type="text" value={item.phone} className="input-field ml-3" readOnly />
                    </div>
                    <div className="flex items-center text-2xl">
                      <label className="text-gray-600">Role:</label>
                      <input type="text" value={item.role} className="input-field ml-3" readOnly />
                    </div>
                  </div>
                </div>
              ))}


            </div>
          }
        </div>

      </div>
    </div>
  );
};

export default AccountDetails;

