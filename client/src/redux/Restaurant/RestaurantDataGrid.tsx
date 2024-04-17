
import { useMemo } from 'react';
import { useDeleteRestaurantMutation, useGetRestaurantsQuery } from './restaurantApiSlice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

type CustomerIdType = {
  email: string,
  name: string,
  password: string,
  phone: number,
  role: string,
  _id: string
}

export interface CustomerRaiting {
  customerId: CustomerIdType,
  customerRaiting: number
}

type ProductType = {
  productId: {
      _id: string,
      category: string,
      price: number,
      text: string,
      todoImage: string,
      title: string
  }
}

interface RestaurantType {
  _id: string,
  avatarPic: string,
  location: string,
  representationPic: string,
  restaurantInfo: string,
  title: string,
  workingHrs: number,
  customerRaiting: CustomerRaiting[],
  menuItems: ProductType[]
}

const Restaurant = () => {
  const {
    data: restaurants,
  } = useGetRestaurantsQuery("restaurantsList", {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });


  const [deleteRestaurant] = useDeleteRestaurantMutation();

  const handleDeleteRestaurant = async (id: string) => {
    try {
      await deleteRestaurant({ id }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const columns: GridColDef[] = useMemo(
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
      { field: '_id', headerName: 'Id', width: 220 },
      {
        field: "action", headerName: "Action", width: 150, renderCell: (params) => {
          return (
            <div className="flex gap-5">
              <Link to={`restaurant/${params.row.id}`} className="link">
                <div className="font-bold">Edit</div>
              </Link>
              <button className="font-bold" onClick={() => handleDeleteRestaurant(params.row.id)}>Delete</button>
            </div>
          );
        }
      }
    ],
    []
  );

  const rows = useMemo<RestaurantType[]>(() => {
    if (restaurants) {
      let raitings: number[] = [];

      const calculateTotalRating = (customerRaiting: { customerRaiting: number }[]) => {
        if (!customerRaiting || !customerRaiting.length) {
          return 0;
        }

        const totalRating = customerRaiting.reduce((total, rating) => total + rating.customerRaiting, 0);
        const averageRating = totalRating / customerRaiting.length;

        return averageRating;
      };

      restaurants?.map((item:RestaurantType) => {
        const totalRating = calculateTotalRating(item.customerRaiting);
        raitings.push(totalRating);
      });

      return restaurants.map((restaurant:RestaurantType, index:number) => ({
        id: restaurant._id,
        representationPic: restaurant.representationPic,
        avatarPic: restaurant.avatarPic,
        location: restaurant.location,
        workingHrs: restaurant.workingHrs,
        title: restaurant.title,
        raiting: raitings[index],
        restaurantInfo: restaurant.restaurantInfo,
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
  );
};

export default Restaurant;
