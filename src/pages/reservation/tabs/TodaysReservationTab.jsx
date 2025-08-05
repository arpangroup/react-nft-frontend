import React, { useEffect, useState } from 'react';
import ReservationCard from '../../../components/card/reservation/ReservationCard ';
import NoData from '../../../components/NoData';
import { useNavigate } from 'react-router';
import { API_ROUTES } from '../../../api/apiRoutes';
import apiClient from '../../../api/apiClient';
import { CURRENCY_UNIT, USER_ID } from '../../../constants/config';

const defaultReservedItems = [{
  investmentId: 1,
  drawDate: '2025/08/01 03:03:40',
  status: 'Won',
  orderNo: 'R3AE9995033223',
  reservationDate: '(GMT+05:30) 2025/08/01 03:03:28',
  estimatedAmount: '50 ~ 1000',
  itemName: 'GiffgaffApeClub_0021549',
  itemPrice: '177.26',
  itemImg: 'https://prodimage-dan.treasurefun.xyz/GiffgaffApeClub/GiffgaffApeClub_1470_compre.png'
}];

function TodaysReservationTab() {
  const [reservedItems, setReservedItems] = useState(defaultReservedItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetchReservedStakes();
  }, []);

  const fetchReservedStakes = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const url = API_ROUTES.RESERVED_STAKES(USER_ID, { date: today });

      //const response = await apiClient.get(url);
      //setReservedItems(response.content || []);
    } catch (err) {
      console.error('Failed to fetch reserved stake items:', err);
      setError('Failed to load reserved stake items.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading stake items...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && reservedItems.length === 0 && (
        <NoData message="No stake items found." />
      )}

      {!loading && !error && reservedItems.map((item, index) => (
        <ReservationCard        
            key={item.investmentId || index}
            {...item}
            currency={item.currencyCode || CURRENCY_UNIT}
        />
      ))}
    </div>
  );
}

export default TodaysReservationTab;
