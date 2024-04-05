import { store } from '../store';
import { notesApiSlice } from '../Products/productApiSlice';

import { useEffect } from 'react';
 import { Outlet } from 'react-router-dom';
import { ordersApiSlice } from '../orders/orderApiSlice';
import { usersApiSlice } from '../users/userApiSlice';
import { restaurantApiSclice } from '../Restaurant/restaurantApiSlice';

 const Prefetch = () => {
    useEffect(() => {
        // store.dispatch(notesApiSlice.util.prefetch('getProducts', 'productsList', { force: true }))
        store.dispatch(ordersApiSlice.util.prefetch('getOrders', 'ordersList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(restaurantApiSclice.util.prefetch('getRestaurants', 'restaurantsList', { force: true }))
    }, [])

    return <Outlet/>
}
export default Prefetch