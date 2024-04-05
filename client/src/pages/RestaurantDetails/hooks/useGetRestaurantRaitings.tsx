import { useEffect, useMemo } from 'react';
import { CustomerRaiting } from '../RestaurantDetails';

export const useGetRestaurantRaitings = (customerRaiting: CustomerRaiting[]) => {
  return useMemo(() => {
    if (!customerRaiting || customerRaiting.length === 0) return null;

    const totalRating = customerRaiting.reduce(
      (total, ratingItem) => total + ratingItem.customerRaiting,
      0
    );

    return totalRating / customerRaiting.length;
  }, [customerRaiting]);
};