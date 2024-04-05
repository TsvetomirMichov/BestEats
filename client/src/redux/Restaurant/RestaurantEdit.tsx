import { ChangeEventHandler, useState } from 'react'
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { Divider, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetSeachDataQuery } from '../Products/productApiSlice';
import { useGetRestaurantMenuItemsQuery, useUpdateRestaurantMutation } from './restaurantApiSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSignleRestaurantQuery } from './restaurantApiSlice'
import { FileToDataString } from '../../hooks/utils';
import axios from 'axios';

type DataType = {
    category: string,
    price: number,
    text: string,
    title: string,
    todoImage: string,
    _id: number
}

type MenuItemType = {

    productId: {
        category: string,
        price: number,
        text: string,
        todoImage: string,
        _id: number
    }
}

type MenuItemArrayType = {
    menuItems: {
        productId: {
            category: string,
            price: number,
            text: string,
            todoImage: string,
            _id: number
        },
        title: string,
        _id: string

    }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "auto",
            fontSize: "2em"
        },
    },
};


function getStyles(name: DataType, selectedItems: DataType[], theme: Theme) {
    return {
        fontWeight: selectedItems.some((item) => item.title === name.title)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}


const RestaurantEdit = () => {
    const { id } = useParams();

    const {
        data: restaurant,
    } = useGetSignleRestaurantQuery(id, {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [restaurantInfo, setRestaurantInfo] = useState('');
    const [workingHrs, setWorkingHrs] = useState('');
    const [representationPic, setRepresentationPic] = useState<string>('');
    const [avatarPic, setAvatarPic] = useState<string>('');

    // const [productIdsSelected, setProductIdsSelected] = useState<number[]>([]);
    const [selectedChipItems, setSelectedChipItems] = useState<DataType[]>([]);
    const [productDetails, setProductDetails] = useState<DataType[]>([]);

    const [updatedRecepi, result] = useUpdateRestaurantMutation()

    const navigate = useNavigate()

    const handleUploadRepresentationPic: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }
        try {
            setRepresentationPic(await FileToDataString(file))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUploadAvatarPic: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }
        try {
            setAvatarPic(await FileToDataString(file))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (restaurant) {
            setTitle(restaurant.title || '');
            setLocation(restaurant.location || '');
            setRestaurantInfo(restaurant.restaurantInfo || '');
            setWorkingHrs(restaurant.workingHrs || '');

            setSelectedChipItems(
                restaurant.menuItems.map((item: MenuItemType) => item.productId) || []
            );

            setProductDetails(
                restaurant.menuItems.map((item: MenuItemType) => item.productId) || []
            )
        }

    }, [restaurant]);


    const { data = [], isLoading, isFetching, isError } = useGetSeachDataQuery('', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: menuItemsArray,
    } = useGetRestaurantMenuItemsQuery("restaurantsList", {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Chip component
    const theme = useTheme();

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;

        setSelectedChipItems(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );

    };

    useEffect(() => {
        const updateProductDetails = () => {

            if (data && menuItemsArray) {
                const productIds = [...new Set(menuItemsArray.map((item: MenuItemArrayType) => item.menuItems.productId._id))];
                const selectedItemsInDetails = data.filter((item: DataType) => !productIds.includes(item?._id));
                // console.log(selectedItemsInDetails.length)
                setProductDetails((prevProductDetails) => [...prevProductDetails, ...selectedItemsInDetails]);
            }
        }
        updateProductDetails()
        // console.log("Product details : ", productDetails)

    }, [menuItemsArray, data]);

    const newPost = {
        id,
        title,
        representationPic,
        avatarPic,
        location,
        workingHrs,
        restaurantInfo,
        menuItems: selectedChipItems?.map(itemId => ({ productId: itemId })),
    }

    const fetchTodos = async (e: any) => {
        e.preventDefault();

        try {
            // Upload representationPic to Cloudinary
            // console.log(representationPic != "" ? "create rep image " : '')
            // console.log(avatarPic != "" ? "create avatar image " : '')

            if (representationPic != "") {
                const representationData = new FormData();
                representationData.append("file", representationPic);
                representationData.append('upload_preset', "foodordering");

                const representationRes = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", representationData);
                newPost.representationPic = representationRes.data.secure_url;
            }

            // Upload avatarPic to Cloudinary
            if (avatarPic != "") {
                const avatarData = new FormData();
                avatarData.append("file", avatarPic);
                avatarData.append('upload_preset', "foodordering");

                const avatarRes = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", avatarData);
                newPost.avatarPic = avatarRes.data.secure_url;
            }

            // console.log("Product ids: ", productIdsSelected)
            if (title !== null && location !== null && workingHrs !== null && restaurantInfo !== null) {
                const initialResaurant = newPost

                // console.log("Before update", initialResaurant)

                // Make a POST request to your API endpoint
                // const response = await axios.post("http://localhost:1337/restaurants/new", { ...newPost });
                const updateResult = await updatedRecepi({ initialResaurant })
                // console.log("Response : ", response)
                // console.log("Response : ", response.data)
                if (updateResult) {
                    // Redirect after successful creation
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.error('Error creating restaurant:', error);
        }
    };

    // console.log("Menu items : ", menuItemsArray)

    return (
        <main className='w-full h-full '>
            <p className='text-5xl font-bold mt-[1em] ml-[1em] text-orange-400'>Edit Restaurant</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-900" />
            <form onSubmit={fetchTodos} className="h-full gap-10 mb-[10em] ml-[2em] mt-[1em]" encType="multipart/form-data">
                <Grid container spacing={2} >
                    {/* Left Column - Text Fields */}
                    <Grid item xs={12} sm={6} md={6} lg={6}  >
                        {/* First Text Field - 4 times bigger */}
                        <TextField
                            id="first-text-field"
                            label="Restaurant Info"
                            multiline
                            rows={4}
                            variant="filled"
                            color="warning"
                            sx={{ width: "100%" }}
                            value={restaurantInfo}
                            onChange={e => setRestaurantInfo(e.target.value)}
                        />

                        {/* Second Text Field */}
                        <TextField
                            id="second-text-field"
                            label="Title"
                            multiline
                            variant="filled"
                            color="warning"
                            value={title}
                            sx={{ width: "100%", my: "2em" }}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <TextField
                            id="second-text-field"
                            label="Location"
                            multiline
                            variant="filled"
                            color="warning"
                            value={location}
                            sx={{ width: "100%", my: "2em" }}
                            onChange={e => setLocation(e.target.value)}
                        />

                        <TextField
                            id="second-text-field"
                            label="Working Hour"
                            multiline
                            variant="filled"
                            color="warning"
                            sx={{ width: "100%", my: "2em" }}
                            value={workingHrs}
                            onChange={e => setWorkingHrs(e.target.value)}
                        />

                    </Grid>

                    {/* Right Column - Image Inputs */}
                    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ ml: "1em" }}>
                        {/* First Image Input */}
                        <div className='flex flex-col  justify-center items-center border border-1 border-orange-400'>
                            <p className='text-lg font-semibold mt-[1em] ml-[1em] text-black'>Background Picture</p>
                            <Divider style={{ height: "0.5em", width: '100%' }} variant="middle" />
                            <img className='w-[25em] h-[15em] object-cover my-5 rounded-sm' src={representationPic?.length > 0 ? representationPic : restaurant?.representationPic} alt="" />
                            <div className='flex flex-row justify-center items-center mb-2'>
                                <label htmlFor="first-image-file" className='text-[1em] font-bold bg-orange-400 p-2 mt-2 rounded-lg cursor-pointer '>SELECT IMAGE</label>
                                <input type="file" id='first-image-file' style={{ display: "none" }} onChange={handleUploadRepresentationPic} />
                            </div>
                        </div>

                        {/* Second Image Input */}
                        <div className='flex flex-col  justify-center items-center border border-1 border-orange-400 my-[2em]'>
                            <p className='text-lg font-semibold mt-[1em] ml-[1em] text-black'>Avatar Picture</p>
                            <Divider style={{ height: "0.5em", width: '100%' }} variant="middle" />

                            <img className='w-[10em] h-[10em] object-cover my-5 rounded-sm' src={avatarPic?.length > 0 ? avatarPic : restaurant?.avatarPic} alt="" />
                            <div className='flex flex-row justify-center items-center mb-2'>
                                <label htmlFor="second-image-file" className='text-[1em] font-bold bg-orange-400 p-2 mt-2 rounded-lg cursor-pointer '>SELECT IMAGE</label>
                                <input type="file" id='second-image-file' style={{ display: "none" }} onChange={handleUploadAvatarPic} />
                            </div>
                        </div>

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Menu Items</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectedChipItems}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" color="primary" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value, index: number) => (
                                            <Chip key={index} label={value.title} sx={{ fontSize: '1em' }} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >

                                {productDetails?.map((name: DataType, index: number) => (
                                    <MenuItem
                                        key={index}
                                        value={name as any}
                                        style={getStyles(name, selectedChipItems, theme)}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <button type="submit" className='text-2xl text-black font-bold bg-orange-400 p-3 rounded-lg m-5'>Edit Restaurant</button>
                    </Grid>
                </Grid>
            </form>
        </main>
    )
}

export default RestaurantEdit
