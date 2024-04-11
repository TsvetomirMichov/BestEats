import React from 'react'
import { useDeleteRestaurantMutation, useGetRestaurantsQuery } from './restaurantApiSlice'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useMemo } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

const Restaurant = () => {

  const {
    data: restaurants,
    isFetching,
    isLoading,
  } = useGetRestaurantsQuery("restaurantsList", {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const [deleteRestaurant, { isSuccess }] = useDeleteRestaurantMutation()

  const handleDeleteRestaurant = async (id) => {
    try {
       await deleteRestaurant({ id }).unwrap();
    } catch (err) {
      console.log(err)
    }
  }

  const columns = useMemo(
    () => [
      {
        field: 'representationPic',
        headerName: 'Exhibition Picture',
        width: 150,
        renderCell: (params) => <Avatar src={params.row.representationPic} />,
        sortable: false,
        filterable: false,
      },
      {
        field: 'avatarPic',
        headerName: 'Avatar Picture',
        width: 150,
        renderCell: (params) => <Avatar src={params.row.avatarPic} />,
        sortable: false,
        filterable: false,
      },
      { field: 'title', headerName: 'Title', width: 270 },
      {
        field: 'raiting',
        headerName: 'Customer raiting',
        width: 150,
        renderCell: (params) => <Rating value={params.row.raiting} readOnly precision={0.5} />,
        sortable: false,
        filterable: false,
      },
      { field: 'location', headerName: 'Location', width: 200 },
      { field: 'workingHrs', headerName: 'Working Hours', width: 150 },
      { field: 'restaurantInfo', headerName: 'Info', width: 150 },
      // Add other fields from your schema here
      { field: '_id', headerName: 'Id', width: 220 },
      {
        field: "action", headerName: "Action", width: 150, renderCell: (params) => {
          return (
            <div className="flex gap-5">
              <Link to={`restaurant/${params.row.id}`} className="link">
                <div className="font-bold">Edit</div>
              </Link>
              <button className="font-bold" onClick={() => handleDeleteRestaurant(params.id)}>Delete</button>
            </div>
          )
        }
      }
    ],
  );

  const rows = useMemo(() => {
    if (restaurants) {
      let raitings = []

      const calculateTotalRating = (customerRaiting) => {
          if (!customerRaiting || !customerRaiting.length) {
              return 0;
          }
  
          // Calculate the total rating using reduce
          const totalRating = customerRaiting.reduce((total, rating) =>  total + rating.customerRaiting , 0);
  
          // Calculate the average rating
          const averageRating = totalRating / customerRaiting.length;
  
          return averageRating;
      };
  
      // Now, you can use this function inside your map
      restaurants?.map((item) => {
          // Calculate the total rating for each restaurant
          const totalRating = calculateTotalRating(item.customerRaiting);
  
          // Return the restaurant object with the total rating
          raitings.push(totalRating)
      });
  
      console.log("raitings : ", raitings)

      return restaurants.map((restaurant,index) => ({
        id: restaurant._id, // Make sure to include a unique identifier for each row
        representationPic: restaurant.representationPic,
        avatarPic: restaurant.avatarPic,
        location: restaurant.location,
        workingHrs: restaurant.workingHrs,
        title: restaurant.title,
        raiting: raitings[index],
        restaurantInfo:restaurant.restaurantInfo,
        _id: restaurant._id,
      }));
    }
    return [];
  }, [restaurants]);

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={rows}
      />
    </div>
  )
}

export default Restaurant
