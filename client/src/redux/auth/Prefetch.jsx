import { store } from '../store';
import { notesApiSlice } from '../notes/noteApiSlice';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ordersApiSlice } from '../orders/orderApiSlice';
import { usersApiSlice } from '../users/userApiSlice';

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(ordersApiSlice.util.prefetch('getOrders', 'ordersList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch