import { useGetSignleRestaurantQuery, useUpdateRestaurantRaitingMutation } from '../../redux/Restaurant/restaurantApiSlice';
import { useParams } from 'react-router-dom';
import { Box, Divider, Rating } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import Grid from '@mui/material/Grid';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PreviewIcon from '@mui/icons-material/Preview';
import InfoIcon from '@mui/icons-material/Info';
import PaginationItems from '@mui/material/Pagination';


import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cart/cartSlice';
import { AiFillShopping } from 'react-icons/ai'
import jwt_decode from 'jwt-decode';

import Advertisement from "../../assets/AdvertisementSVg.svg"

// Import Swiper styles\
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../index.css';

import { Pagination, Navigation } from 'swiper/modules';
import { RootState, useAppselector } from '../../redux/store';
import { useGetRestaurantRaitings } from './hooks/useGetRestaurantRaitings';


type DecodedTokenType = {
    _id: string,
    name: string,
    role: string,
    phone: string,
}

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

export interface RestaurantType {
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

const RestaurantDetails = () => {

    let { id } = useParams()
    const dispatch = useDispatch()
    const [updateRaiting, { isSuccess }] = useUpdateRestaurantRaitingMutation()

    const {
        data: restaurant,
    } = useGetSignleRestaurantQuery(id, {
        refetchOnFocus: true,
    })

    const token = useAppselector((state: RootState) => state.auth.token);
    const [customerId, setCustomerId] = useState<string>("") // Customer details
    const [userReview, setReviewOfUser] = useState<number>(0) // Customer details
    const [customerRaiting, setReview] = useState<number | null>(null)

    const [quantity, setQuantity] = useState(1); // Quantity of product before adding to cart
    const [activeButtonOpen, setActiveButtonOpen] = useState('Menu'); // Content Of centered grid item

    const [swiperRef, setSwiperRef] = useState<typeof Swiper | null>(null); // swiper state
    const [lowestSellingItem, setLowestSellingItem] = useState<ProductType>(); // swiper state
    const [highestSellingItem, setHighestSellingItem] = useState<ProductType>(); // swiper state
    const [selectedFilterItem, setSelectedFilterItem] = useState([]); // swiper state
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0); // swiper state
    const [selectedItemCategory, setSelectedItemCategory] = useState<string>(""); // swiper state


    const raitings = useGetRestaurantRaitings(restaurant?.customerRaiting);  // Restaurant raiting

    // console.log("Raiting : ", raitings)

    const handleSelectItemIndex = (index: number, category: string) => {
        setSelectedItemIndex(index)
        setSelectedItemCategory(category)
    }

    // Pagination states
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const ITEMS_PER_PAGE = 3;  // number of items to show per page

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Pagination states


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top on component mount
    }, [])

    const handleButtonActive = (buttonName: string) => {
        setActiveButtonOpen(buttonName)
    }

    useEffect(() => {
        if (!restaurant || !restaurant.menuItems) return; // Exit early if there are no menu items

        let lowestSelling = restaurant.menuItems[0];
        let highestSelling = restaurant.menuItems[0];

        restaurant.menuItems.map((item: ProductType) => {
            // console.log("Item map ", item)
            if (item.productId.price < lowestSelling.productId.price) {
                lowestSelling = item;
            }

            if (item.productId.price > highestSelling.productId.price) {
                highestSelling = item;
            }
        });

        setLowestSellingItem(lowestSelling);
        setHighestSellingItem(highestSelling);

        if (token) {

            const decodedToken: DecodedTokenType = jwt_decode(token);
            const custId = decodedToken._id;

            setCustomerId(custId);

            const review = restaurant.customerRaiting?.filter((item: CustomerRaiting) => item.customerId._id === custId)

            setReviewOfUser(review[0]?.customerRaiting)
        }

    }, [restaurant, token])



    useEffect(() => {
        // console.log("Selected index : ", selectedItemIndex);

        if (!restaurant || !restaurant.menuItems.length) return; // Exit early if there are no menu items

        // Find the first category from the menu items
        const initialCategory = restaurant?.menuItems
            .filter((item: ProductType, index: number, self: ProductType[]) => self.findIndex(i => i.productId?.category === item.productId?.category) === index)
            .map((item: ProductType) => item.productId.category)[selectedItemIndex]; // Select the first category    

        // console.log("Initial category:", initialCategory);
        setSelectedItemCategory(initialCategory);

        // Filter items based on the first category
        const selectedItems = restaurant.menuItems.filter((item: ProductType) => item.productId?.category === initialCategory);

        // console.log("Selected items:", selectedItems);
        setSelectedFilterItem(selectedItems);
    }, [restaurant, selectedItemIndex]);


    // console.log("Selected items : ", selectedFilterItem)

    const handleSubmitReview = async (e: any) => {
        e.preventDefault();

        let updatedRaiting = await updateRaiting({ customerId, customerRaiting, id }).unwrap();
        if (isSuccess) {
            console.log("Success")
        }
    }

    return (
        <div className='w-full h-full flex flex-col relative'>
            <div className='w-full h-[25em]'>
                <img src={restaurant?.representationPic} className='w-full h-full object-cover' alt="" />
            </div>

            <div className='bg-white w-5/6 h-full p-5 gap-5 flex flex-col sm:flex-row relative justify-between m-auto'>
                <div className='flex felx-row gap-5'>
                    <img src={restaurant?.avatarPic} className='w-[8em] h-[8em] object-cover hidden lg:flex rounded-full' alt="" />
                    <div className='flex flex-col'>
                        {/* { raitings ?  <Rating value={raitings} readOnly precision={0.5} /> : <Rating value={0} readOnly precision={0.5} />}  */}
                        <Rating value={raitings} readOnly precision={0.5} />
                        <h1 className='font-bold text-3xl my-2'>{restaurant?.title}</h1>
                        <p className='text-lg w-3/4 '>
                            <FmdGoodTwoToneIcon sx={{ color: "#F97316", mr: "0.5em" }} />
                            {restaurant?.location}
                        </p>
                    </div>
                </div>
                <div className='mt-auto bg-yellow-500 text-black p-2 rounded-lg relative '>
                    <p className='text-lg font-bold'>Working hours 8.0am-{restaurant?.workingHrs + 8}.pm</p>
                </div>
            </div>

            <div className='w-full h-[full] bg-[#F2F2F2] '>
                <Box sx={{ flexGrow: 1, my: "5em" }}>

                    <Grid container spacing={1} alignItems="start" justifyContent="center" direction="row" gap={2}>
                        <Grid item xs={11} sm={10} md={3} sx={{ color: "black", borderRadius: "0.5em" }} >

                            <Box sx={{
                                width: "full", height: "full", display: "flex",
                                flexDirection: "column", backgroundColor: "white",
                                textAlign: "start", alignItems: "start", padding: "1em"
                            }}>
                                <h1 className='text-2xl font-bold'>All Details</h1>
                                <div className='flex flex-row w-full justify-start my-2 '>
                                    <Divider sx={{ backgroundColor: "#EAB308", width: "20%", py: "0.1em", mx: "0.1em" }} />
                                    <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                    <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                    <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                </div>
                                <button
                                    onClick={() => handleButtonActive('Menu')}
                                    className={`text-black text-base font-bold flex items-center space-x-2 py-4 px-4 mt-4 rounded-md transition-all duration-300 ${activeButtonOpen === 'Menu' ? 'bg-gray-200' : 'bg-white'}`}
                                >
                                    <MenuBookIcon className="text-yellow-500" />Menu
                                </button>
                                <button
                                    className={`text-black text-base font-bold flex items-center space-x-2 py-5 px-4 rounded-md transition-all duration-300 ${activeButtonOpen === 'Reviews' ? 'bg-gray-200' : 'bg-white'}`}
                                    onClick={() => handleButtonActive('Reviews')}
                                >
                                    <PreviewIcon className="text-yellow-500" />Reviews
                                </button>
                                <button
                                    className={`text-black text-base font-bold flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${activeButtonOpen === 'RestaurantInfo' ? 'bg-gray-200' : 'bg-white'}`}
                                    onClick={() => handleButtonActive('RestaurantInfo')}

                                >
                                    <InfoIcon className="text-yellow-500" />Restaurant Info
                                </button>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                mt: "2em",
                                backgroundColor: "white",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'center',
                                textAlign: "start"
                            }}>
                                <h1 className='text-2xl font-bold'>Advertisement</h1>
                                <img src={Advertisement} alt="Advertisement" className='w-[65%] h-[50%] p-5 object-cover justify-center items-center' />
                            </Box>

                        </Grid>
                        <Grid item xs={11} sm={10} md={5} sx={{ backgroundColor: "white", color: "black", borderRadius: "0.5em" }} >
                            <div className="flex flex-col ">

                                {/* Render components based on the activeButton state */}
                                {activeButtonOpen === 'Menu' &&
                                    <div className='flex flex-col gap-2'>

                                        <Swiper
                                            onSwiper={(swiper: any) => setSwiperRef(swiper)}
                                            slidesPerView={2}
                                            spaceBetween={10}
                                            pagination={{
                                                type: 'fraction',
                                            }}
                                            navigation={true}
                                            modules={[Pagination, Navigation]}
                                            className="mySwiper"

                                        >
                                            {
                                                restaurant?.menuItems
                                                    .filter((item: ProductType, index: number, self: ProductType[]) => self.findIndex(i => i.productId?.category === item.productId?.category) === index)
                                                    .map((item: ProductType, index: number) => {
                                                        return (
                                                            <SwiperSlide key={index}><button onClick={() => handleSelectItemIndex(index, item?.productId?.category)} className={index === selectedItemIndex ? "bg-gray-200 rounded-full p-3" : "bg-none"}>{item?.productId?.category} </button></SwiperSlide>
                                                        )
                                                    })
                                            }

                                        </Swiper>
                                        <div className='flex flex-col p-2 '>
                                            <h1 className='text-2xl text-black font-semibold'>{selectedItemCategory}</h1>
                                            {
                                                selectedFilterItem?.slice(startIndex, endIndex).map((item: ProductType, index: number) => (
                                                    <div key={index} className='my-5 flex flex-col'>
                                                        <div className='flex flex-col md:flex-row p-2 gap-2'>
                                                            <img src={item?.productId.todoImage} className='w-[100%] md:w-[7em] h-[10em] md:h-[7em] object-cover rounded-md' alt="" />
                                                            <div className='w-full h-full flex flex-col'>
                                                                <p className='text-2xl font-semibold text-black p-1'>{item.productId.title}</p>
                                                                <p className='text-md font-semibold text-black p-1'>{item.productId.text}</p>
                                                                <p className='text-lg font-semibold  p-1 text-yellow-500'>${item.productId.price}</p>
                                                            </div>
                                                        </div>

                                                        <div className='w-auto h-full'>
                                                            <button
                                                                className="flex w-[10em] items-center rounded-sm gap-2 bg-yellow-500 text-white font-medium py-2 px-2 mt-4 ml-auto "

                                                                onClick={() =>
                                                                    dispatch(
                                                                        addProduct({
                                                                            id: item.productId._id,
                                                                            title: item.productId.title,
                                                                            desc: item.productId.text,
                                                                            price: item.productId.price,
                                                                            img: item.productId.todoImage,
                                                                            quantity
                                                                        })
                                                                    )
                                                                }
                                                            >
                                                                <AiFillShopping /> ADD TO CART
                                                            </button>
                                                        </div>
                                                        <Divider variant="middle"
                                                            orientation="horizontal"
                                                            sx={{ paddingY: "0.5em" }} />
                                                    </div>
                                                ))
                                            }
                                            <PaginationItems count={Math.ceil(selectedFilterItem?.length / ITEMS_PER_PAGE)}
                                                page={page}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                }

                                {activeButtonOpen === 'Reviews' &&
                                    <div className='w-full h-full bg-white flex items-center'>
                                        <div className='w-full h-full p-5 border border-gray-300 flex flex-col items-start'>
                                            { userReview != 0 && userReview != undefined ?

                                                <div>
                                                    <h1 className='text-xl text-black font-semibold my-10 '>
                                                        Thank you for your review
                                                    </h1>
                                                    <Rating name="half-rating" value={userReview} precision={0.5}
                                                        readOnly
                                                    />
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        token != null ?
                                                            <div>

                                                                <h1 className='text-xl text-black font-semibold my-10 '>
                                                                    Write A Review
                                                                </h1>

                                                                <Rating name="half-rating" defaultValue={0} precision={0.5}
                                                                    onChange={(event, newValue) => {
                                                                        setReview(newValue);
                                                                    }}
                                                                />
                                                                <button onClick={handleSubmitReview} className='w-auto flex bg-gray-100 hover:bg-gray-200  content-start mt-5 p-3 font-medium text-lg rounded-lg ' >Add your review</button>
                                                            </div>
                                                            :
                                                            <div>

                                                                <h1 className='text-xl text-black font-semibold my-10 '>
                                                                    Log into your account to submit an review
                                                                </h1>

                                                                <Rating name="half-rating" disabled defaultValue={0} precision={0.5}
                                                                    onChange={(event, newValue) => {
                                                                        setReview(newValue);
                                                                    }}
                                                                />
                                                                <button disabled onClick={handleSubmitReview} className='w-auto flex bg-gray-100   content-start mt-5 p-3 font-medium text-lg rounded-lg ' >Add your review</button>
                                                            </div>

                                                    }
                                                </div>
                                            }

                                        </div>
                                    </div>
                                }

                                {activeButtonOpen === 'RestaurantInfo' &&
                                    <div className='w-full h-full bg-white flex'>
                                        <div className='w-full h-full p-5 flex flex-col'>

                                            <h1 className='text-2xl font-bold'>Restaurant Info</h1>
                                            <div className='flex flex-row w-full justify-start my-5 '>
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "20%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                            </div>
                                            <p className='text-xl text-black '>{restaurant?.restaurantInfo}</p>

                                            <h1 className='text-2xl font-bold mt-[1em]'>Current Location</h1>
                                            <div className='flex flex-row w-full justify-start my-5 '>
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "20%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                                <Divider sx={{ backgroundColor: "#EAB308", width: "1%", py: "0.1em", mx: "0.1em" }} />
                                            </div>
                                            <p className=' mt-auto text-lg '>
                                                <FmdGoodTwoToneIcon sx={{ color: "#F97316", mr: "0.5em" }} />
                                                {restaurant?.location}
                                            </p>
                                        </div>

                                    </div>
                                }
                            </div>

                        </Grid>
                        <Grid item xs={11} sm={10} md={3} sx={{ color: "black", borderRadius: "0.5em" }} >
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "white",
                                display: "flex",
                                flexDirection: "column",
                                padding: "1em"
                            }}>

                                <h1 className='text-xl font-semibold pb-5 text-center capitalize'>Recommended Product</h1>
                                <img src={highestSellingItem?.productId?.todoImage} alt="Dumy image" className='w-[50%] h-[50%] object-cover items-center rounded-xl' />
                                <h1 className='text-xl font-semibold text-start'>{highestSellingItem?.productId?.title}</h1>
                                <h1 className='text-xl font-semibold py-5 text-start text-yellow-500'>${highestSellingItem?.productId?.price}</h1>
                                <button
                                    className=" w-auto flex items-center rounded-sm gap-2 bg-yellow-500 text-white font-medium py-2 px-2 "
                                    onClick={() =>
                                        dispatch(
                                            addProduct({
                                                id: highestSellingItem?.productId._id,
                                                title: highestSellingItem?.productId.title,
                                                desc: highestSellingItem?.productId.text,
                                                price: highestSellingItem?.productId.price,
                                                img: highestSellingItem?.productId.todoImage,
                                                quantity
                                            })
                                        )
                                    }
                                >
                                    <AiFillShopping /> ADD TO CART
                                </button>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "white",
                                display: "flex",
                                flexDirection: "column",
                                padding: "1em",
                                marginTop: "1em"
                            }}>
                                <img src={lowestSellingItem?.productId?.todoImage} alt="" className='w-[50%] h-[50%] object-cover justify-center items-center rounded-lg' />
                                <h1 className='text-xl font-semibold text-start'>{lowestSellingItem?.productId?.title}</h1>
                                <div className='flex flex-row w-full justify-evenly align-baseline'>

                                    <p className='text-xl font-semibold py-5 text-start text-yellow-500'>${lowestSellingItem?.productId?.price}</p>

                                    <button
                                        className="flex w-auto items-center rounded-sm gap-2 bg-yellow-500 text-white font-medium py-2 px-2 "
                                        onClick={() =>
                                            dispatch(
                                                addProduct({
                                                    id: lowestSellingItem?.productId._id,
                                                    title: lowestSellingItem?.productId.title,
                                                    desc: lowestSellingItem?.productId.text,
                                                    price: lowestSellingItem?.productId.price,
                                                    img: lowestSellingItem?.productId.todoImage,
                                                    quantity
                                                })
                                            )
                                        }
                                    >
                                        <AiFillShopping /> ADD TO CART
                                    </button>
                                </div>
                            </Box>

                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default RestaurantDetails
