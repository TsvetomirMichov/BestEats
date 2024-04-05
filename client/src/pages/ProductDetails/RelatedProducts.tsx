import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetRelatedProductsQuery } from "../../redux/Products/productApiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cart/cartSlice";
import { AiFillShopping } from 'react-icons/ai'

interface ProductDataType {
    _id: number;
    title: string;
    text: string;
    category: string;
    price: number;
    todoImage: string;
}

const responsive = {
    superLargeDesktop: {
        // The naming can be any, depends on you.
        breakpoint: { max: 2536, min: 1024 },
        items: 5,
        gutter: 20

    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        gutter: 20
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2,
        gutter: 20
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        gutter: 20
    },
};

const RelatedProducts = ({ category, filterItem }: { category: string, filterItem: string }) => {

    // console.log(category);

    const { data: relatedData, isLoading, error } = useGetRelatedProductsQuery(category, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()


    // Handle loading and error states gracefully
    if (isLoading) {
        return <div>Loading related products...</div>;
    }

    if (error) {
        return <div>Error fetching related products:</div>;
    }

    return (
        <div className="w-full h-full">
            <Carousel
                responsive={responsive}
                draggable={false}
                showDots={true}
                rewindWithAnimation={true}
                className="w-full "


            >
                <div className="w-full h-full flex flex-row gap-10">

                    {relatedData.filter((item: ProductDataType) => item.title != filterItem).map((product: ProductDataType, index: number) => (
                        <div className=" md:ml-[2em] my-10 w-full  block h-full mt-[1em] gap-5" key={index}>
                            <div
                                key={product._id}
                                className="border shadow-lg rounded-lg hover:scale-105 duration-300 w-[20em]  sm:w-[15em] "
                            >
                                <Link to={`/prductDetails/${product._id}`} replace={true} >
                                    <img
                                        src={product.todoImage}
                                        alt={product.title}
                                        className="w-[100%] h-[11em] object-cover rounded-t-md"
                                    />
                                </Link>
                                <div className="flex justify-between px-2 py-4">
                                    <p className="font-bold text-sm">{product.title}</p>
                                    <div className="flex items-center">
                                        <button
                                            className="flex items-center justify-center"
                                            onClick={() =>
                                                dispatch(
                                                    addProduct({
                                                        id: product._id,
                                                        title: product.title,
                                                        desc: product.text,
                                                        price: product.price,
                                                        img: product.todoImage,
                                                        quantity
                                                    })
                                                )
                                            }
                                        >
                                            <AiFillShopping className="w-6 h-6" />
                                        </button>
                                        <span className="bg-orange-500 text-white p-1 rounded-full ml-2">
                                            {product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </Carousel>
        </div>
    );
}

export default RelatedProducts;