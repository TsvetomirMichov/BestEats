import axios from 'axios'
import React, { ChangeEventHandler, useState } from 'react'
import DefautrPic from "../../assets/no-image.jpg"
import { redirect } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { Divider, TextField, Theme } from '@mui/material';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetSeachDataQuery } from '../Products/productApiSlice';
import { useGetRestaurantMenuItemsQuery } from './restaurantApiSlice';
import { useEffect } from 'react';
import { FileToDataString } from '../../hooks/utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type DataType = {
    category: string,
    price: number,
    text: string,
    title: string,
    todoImage: string,
    _id: number
}

type MenuItemType = {
    menuItems: {
        productId: {
            category: string,
            price: number,
            text: string,
            todoImage: string,
            _id: number
        }
    }
}



function getStyles(name: DataType, selectedItems: DataType[], theme: Theme) {
    return {
        fontWeight: selectedItems.some((item) => item.title === name.title)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const RestaurantNew = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState("");
    const [restaurantInfo, setRestaurantInfo] = useState("");
    const [workingHrs, setWorkingHrs] = useState<number>(0);
    const [customerRaiting, setCustomerRaiting] = useState(0);
    const [representationPic, setRepresentationPic] = useState<string>('');
    const [avatarPic, setAvatarPic] = useState<string>('');
    const [productIdsSelected, setProductIdsSelected] = useState<number[]>([]);

    const { data = [] } = useGetSeachDataQuery('') // get all product data

    const {
        data: menuItemsArray,
    } = useGetRestaurantMenuItemsQuery("restaurantsList", {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let productDetails = [];

    if (data && menuItemsArray) {
        // Extract unique productIds from menuItemsArray
        let productIds = [...new Set(menuItemsArray.map((item: MenuItemType) => item.menuItems.productId._id))];

        // Filter data based on productIds
        productDetails = data.filter((dataItem: DataType) => !productIds.includes(dataItem._id));

    }

    // Chip component
    const theme = useTheme();
    const [selectedChipItems, setSelectedChipItems] = React.useState([]);

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
        const selectedIds = selectedChipItems.map((item: DataType) => item._id);

        // Update the state with the array of selected _id values
        setProductIdsSelected(selectedIds);

    }, [selectedChipItems])

    // console.log('Selected IDs: ', productIdsSelected);
    /*  */
    const newPost = {
        title,
        representationPic,
        avatarPic,
        location,
        workingHrs,
        restaurantInfo,
        menuItems: productIdsSelected.map(itemId => ({ productId: itemId })),
        customerRaiting: { rating: customerRaiting }

    }
    
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

    const fetchTodos = async (e: any) => {
        e.preventDefault();

        try {
            // Upload representationPic to Cloudinary
            if (representationPic) {
                const representationData = new FormData();
                representationData.append("file", representationPic);
                representationData.append('upload_preset', "foodordering");

                const representationRes = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", representationData);
                newPost.representationPic = representationRes.data.secure_url;
            }

            // Upload avatarPic to Cloudinary
            if (avatarPic) {
                const avatarData = new FormData();
                avatarData.append("file", avatarPic);
                avatarData.append('upload_preset', "foodordering");

                const avatarRes = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", avatarData);
                newPost.avatarPic = avatarRes.data.secure_url;
            }

            // Make a POST request to your API endpoint
            const response = await axios.post("http://localhost:1337/restaurants/new", { ...newPost });

            // console.log("Response : ", response)
            // console.log("Response : ", response.data)
            if (response.status === 200) {
                // Redirect after successful creation
                redirect("/admin");
            }

        } catch (error) {
            console.error('Error creating restaurant:', error);
        }
    };

    return (
        <main className='w-full h-full '>
            <p className='text-5xl font-bold mt-[1em] ml-[1em] text-orange-400'>Create Restaurant</p>
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
                            onChange={e => setRestaurantInfo(e.target.value)}
                        />

                        {/* Second Text Field */}
                        <TextField
                            id="second-text-field"
                            label="Title"
                            multiline
                            variant="filled"
                            color="warning"
                            sx={{ width: "100%", my: "2em" }}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <TextField
                            id="second-text-field"
                            label="Location"
                            multiline
                            variant="filled"
                            color="warning"
                            sx={{ width: "100%", my: "2em" }}
                            onChange={e => setLocation(e.target.value)}
                        />

                        <TextField
                            id="second-text-field"
                            label="Working Hour"
                            multiline
                            variant="filled"
                            color="warning"
                            type='number'
                            sx={{ width: "100%", my: "2em" }}
                            onChange={(e) => setWorkingHrs(parseFloat(e.target.value))}
                        />

                    </Grid>

                    {/* Right Column - Image Inputs */}
                    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ ml: "1em" }}>
                         {/* First Image Input */}
                         <div className='flex flex-col  justify-center items-center border border-1 border-orange-400'>
                            <p className='text-lg font-semibold mt-[1em] ml-[1em] text-black'>Background Picture</p>
                            <Divider style={{ height: "0.5em", width: '100%' }} variant="middle" />
                            <img className='w-[25em] h-[15em] object-cover my-5 rounded-sm' src={representationPic?.length > 0 ? representationPic : DefautrPic} alt="" />
                            <div className='flex flex-row justify-center items-center mb-2'>
                                <label htmlFor="first-image-file" className='text-[1em] font-bold bg-orange-400 p-2 mt-2 rounded-lg cursor-pointer '>SELECT IMAGE</label>
                                <input type="file" id='first-image-file' style={{ display: "none" }} onChange={handleUploadRepresentationPic} />
                            </div>
                        </div>

                        {/* Second Image Input */}
                        <div className='flex flex-col  justify-center items-center border border-1 border-orange-400 my-[2em]'>
                            <p className='text-lg font-semibold mt-[1em] ml-[1em] text-black'>Avatar Picture</p>
                            <Divider style={{ height: "0.5em", width: '100%' }} variant="middle" />

                            <img className='w-[10em] h-[10em] object-cover my-5 rounded-sm' src={avatarPic?.length > 0 ? avatarPic : DefautrPic} alt="" />
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
                                input={
                                    <OutlinedInput
                                        id="select-multiple-chip"
                                        label="Chip"
                                        color="warning"
                                    />}

                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value: DataType) => (
                                            <Chip key={value._id} label={value.title} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >

                                {productDetails?.map((name: DataType, index: number) => (
                                    <MenuItem
                                        key={index}
                                        value={name as any}
                                        style={getStyles(name, selectedChipItems, theme)}>
                                        {name?.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <button type="submit" className='text-2xl text-orange-500 font-bold bg-black p-3 rounded-lg m-5'>Submit</button>
            </form>
        </main>
    )
}

export default RestaurantNew
