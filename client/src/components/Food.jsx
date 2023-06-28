import React, { useState } from 'react';
import { data } from '../data/data';
import { useGetNotesQuery } from '../redux/notes/noteApiSlice';
import { FoodsHolder } from './FoodsHolder';

const Food = () => {
  const [foods, setFoods] = useState("Pizza");

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = notes

    const tableContent = 
      ids?.length
        ? ids.map(noteId =>
          <div key={noteId}>
            <FoodsHolder noteId={noteId} catg={foods} />
          </div>
        )
        : null
    return (

      <div className='max-w-[1640px] m-auto px-4 py-12'>
        <h1 className='text-orange-600 font-bold text-4xl text-center mb-10'>
          Top Rated Menu Items
        </h1>

        {/* Display foods */}
        {tableContent}
      </div>
    );
  } else {
    return null
  }
}

export default Food;