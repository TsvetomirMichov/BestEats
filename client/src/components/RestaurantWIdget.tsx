import { useState } from 'react'
import { useGetRestaurantsQuery } from '../redux/Restaurant/restaurantApiSlice'
import { useEffect } from 'react'
import { Divider } from '@mui/material'
import Rating from '@mui/material/Rating';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import { Link } from 'react-router-dom';

type CustomerIdType = {
    email: string,
    name: string,
    password: string,
    phone: number,
    role: string,
    _id: number
}

type CustomerRaiting = {
    customerId: CustomerIdType,
    customerRaiting: number
}

type ProductType = {
    productId: {
        category: string,
        price: number,
        text: string,
        todoImage: string,
        _id: number
    }
}

type RestaurantType = {
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

const RestaurantWIdget = () => {

    const {
        data: restaurants,
    } = useGetRestaurantsQuery("restaurantsList", {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // console.log("Restaurants", restaurants)

    const [raitings, setRaitings] = useState<number[]>([])

    useEffect(() => {
        const calculateTotalRating = (customerRaiting: RestaurantType) => {
            let averageRating: number = 0
            if (customerRaiting) {
                // console.log("Customor raiting :", customerRaiting.customerRaiting)
                // Calculate the total rating using reduce
                const totalRating = customerRaiting?.customerRaiting.reduce((total: number, result) => total + result?.customerRaiting, 0);

                // console.log("Total raiting :",totalRating)
                // Calculate the average rating
                averageRating = totalRating / customerRaiting?.customerRaiting?.length

            }
            return averageRating;
        };

        // Now, you can use this function inside your map
        const newRaiting = restaurants?.map((item: RestaurantType) => {
            // let totalRating: number = 0
            const totalRating = calculateTotalRating(item);
            // console.log("Total raiting : ", totalRating)
            return totalRating;
            // Return the restaurant object with the total rating
        });
        setRaitings(newRaiting)
    }, [restaurants])

    // console.log("raitings ", raitings)

    return (
        <div className='w-full h-full bg-[#FFFCF2]  mb-[10em] relative '>
            <div className='flex mt-[2em] p-5'>
                <h1 className='text-[#CC3333] font-bold text-4xl m-auto'>
                    Our Restaurants
                </h1>
            </div>
            <div className='w-full h-full py-[5em] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-10  '>
                {
                    restaurants?.map((restaurantData: RestaurantType, index: number) => (
                        <div key={index} className='w-5/6 h-full flex flex-col bg-white shadow-lg hover:scale-105 duration-300 m-auto'>
                            <Link to={`restaurantDetails/${restaurantData?._id}`} >
                                <img className='w-full h-[15em] object-cover rounded-t-md' src={restaurantData?.representationPic} alt="representationPic" />
                            </Link>
                            <div className='w-full h-full flex flex-col px-2'>

                                <Rating value={raitings?.length > 0 ? raitings[index] ?? 0 : 0} readOnly precision={0.5} />
                                <p className='text-xl font-semibold'>{restaurantData?.title}</p>

                                <div className='flex w-full flex-wrap h-auto'>
                                    {
                                        restaurantData?.menuItems
                                            .filter((item: ProductType, index: number, self: ProductType[]) => self.findIndex(i => i.productId?.category === item.productId?.category) === index)
                                            .map((item: ProductType, key: number) => (
                                                <p key={key} className='bg-slate-300 w-auto flex flex-wrap p-2 m-1 rounded-lg '>{item.productId.category}</p>
                                            ))



                                    }
                                </div>

                                <Divider variant="middle" sx={{ paddingY: "0.3em" }} />
                                <div className='w-full h-full flex flex-col sm:flex-row pb-5 justify-between'>
                                    <div className=' mt-auto '>
                                        <img className='min-w-[4.5rem] max-w-[4.5rem] max-h-[4.5rem] min-h-[4.5rem] object-cover rounded-lg' src={restaurantData?.avatarPic} alt="representationPic" />
                                    </div>
                                    <p className='mx-[0.4em] mt-auto flex-wrap'><FmdGoodTwoToneIcon sx={{ color: "#F97316" }} />{restaurantData.location}Street 5,</p>
                                </div>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default RestaurantWIdget