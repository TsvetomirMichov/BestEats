import { Link } from 'react-router-dom'
import AboutUsImage1 from "../../assets/AboutUs/top-image.jpeg"
import AboutUsImage2 from "../../assets/AboutUs/about-image1.png"
import AboutUsImage3 from "../../assets/AboutUs/about-image-3.png"
import AboutUsImage4 from "../../assets/AboutUs/about-image-4.png"

import AboutUsStaffImage1 from "../../assets/AboutUs/about-staff-image1.png"
import AboutUsStaffImage2 from "../../assets/AboutUs/about-staff-image2.png"
import AboutUsStaffImage3 from "../../assets/AboutUs/about-staff-image3.png"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const AboutUs = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="flex flex-col mt-5 justify-center items-center h-[25em]" style={{ backgroundImage: `url(${AboutUsImage1})`, backgroundSize: 'cover', width: '100%' }}>
                <div className=" text-white text-center justify-center flex flex-col items-center w-[100%]  h-[100%]" style={{backgroundColor: "rgba(0,0,0,0.35)"}}>
                    <h1 className='text-6xl font-extrabold capitalize'>
                        About Us
                    </h1>
                    <div className='mt-10 text-xl hover:text-orange-400 font-semibold'>
                        <Link to="/">Home</Link> / About
                    </div>
                </div>
            </div>

            <div className='max-w-[80%] h-full flex flex-col sm:flex-row justify-center mx-auto gap-10 my-[10em]'>
                <img src={AboutUsImage2} className='w-full h-full object-cover' alt="" />

                <div className='flex flex-col items-start gap-6'>
                    <p className='text-orange-400 text-xl'>About Us</p>
                    <h1 className='text-3xl'>Why We Are The Best</h1>
                    <p className='text-md font-medium'>But who can rightfully criticize him who wants to be in a state of development in which no
                        trouble results, or he who avoids pain with no pleasure, and I will explain the very pairings
                        that were said by that discoverer of truth and, as it
                        were, the architect of a happy life.
                    </p>
                    <div className='flex flex-row gap-10 items-center justify-center '>
                        <img src={AboutUsImage3} className='w-[3em] h-[3em] object-cover' alt="" />
                        <div className='max-w-[20em] py-5'>
                            <h1 className='text-md'>Buffet Service</h1>
                            <p className='text-orange-400 text-sm'>And the cariatura itself which is from that discoverer of
                                truth and as it were an architect</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-10 items-center justify-center'>
                        <img src={AboutUsImage4} className='w-[3em] h-[3em] object-cover' alt="" />
                        <div className='max-w-[20em]'>
                            <h1 className='text-md'>Online Ordering</h1>
                            <p className='text-orange-400 text-sm'>And the cariatura itself which is from that discoverer of
                                truth and as it were an architect</p>
                        </div>
                    </div>
                    <button className=' bg-orange-400 text-white font-semibold p-3 mt-5 text-md'>About Us</button>

                </div>



            </div>

            <div className='flex flex-col w-full h-full text-center gap-5 my-[5em] '>
                <h1 className='text-xl text-orange-400'>Our Team</h1>
                <p className='text-black text-2xl font-semibold'>Meet Our Team</p>

                <div className='flex flex-col md:flex-row gap-[9em] w-full h-full my-[3em] justify-center '>
                    <Card sx={{ maxWidth: 345  }}>
                        <CardMedia
                            sx={{ height: 340 }}
                            image={AboutUsStaffImage2}
                            title="green iguana"
                        />
                        <CardContent sx={{ px: "4em" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Mike Dooley
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Executive
                            </Typography>
                        </CardContent>

                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 340 }}
                            image={AboutUsStaffImage1}
                            title="green iguana"
                        />
                        <CardContent sx={{ px: "4em" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Cathy Anderson

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Chief Executive
                            </Typography>
                        </CardContent>

                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 340 }}
                            image={AboutUsStaffImage3}
                            title="green iguana"
                        />
                        <CardContent sx={{ px: "4em" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Alextina Jimiey

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Food Inspector
                            </Typography>
                        </CardContent>

                    </Card>
                </div>

            </div>

        </div>
    )
}

export default AboutUs