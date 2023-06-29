import React from 'react';
import { Link } from 'react-router-dom';

const SearchedItems = ({ items }) => {
  const PF = "https://foodordering-api-1q9i.onrender.com/images/";

  return (
    <div className="absolute left-5 sm:left-1/4 md:left-1/3 top-16 z-10">
      <div className="overflow-x-auto h-[30em]">
        <table className="w-full  table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                All Products
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 sm:grid-cols-2`}
              >
                <td className="px-6 py-4">
                  <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
                    <Link to={`prductDetails/${item._id}`}>
                      <img
                        src={PF + item.todoImage}
                        alt={item.title}
                        className="w-full h-[25em] object-cover rounded-t-lg"
                      />
                    </Link>
                    <div className="flex justify-between px-2 py-4">
                      <p className="font-bold text-1xl">{item.title}</p>
                      <div className="flex items-center">
                        <span className="bg-orange-500 text-white p-1 rounded-full ml-2">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchedItems;
