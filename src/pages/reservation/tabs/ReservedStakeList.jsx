import React, { useEffect, useState } from 'react';
import NoData from '../../../components/NoData';
import SellStakeCard from '../../../components/card/collection/SellStakeCard';
import { useNavigate } from 'react-router';
import { CURRENCY_UNIT, USER_ID } from '../../../constants/config';
import SellNFTModal from '../../../components/modal/sellNft/SellNFTModal';
import apiClient from '../../../api/apiClient';
import { API_ROUTES } from '../../../api/apiRoutes';

const defaultItems = [{
  id: 1,
  image: 'http://localhost:8080/api/v1/files/download/stake_2.png',
  title: 'GiffgaffApeClub_0021549',
  price: '177.26',
}];

function ReservedStakeList({ reservedStakes, loading, error }) {
  const [isSelling, setIsSelling] = useState(false);
  const [sellData, setSellData] = useState(null); // For passing NFT info to SellNFT Modal

  /*const [reservedItems, setReservedItems] = useState(defaultItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservedStakes();
  }, []);

  const fetchReservedStakes = async () => {
    try {
      const response = await apiClient.get(API_ROUTES.RESERVED_STAKES(USER_ID));
      setReservedItems(response.content || []);
    } catch (err) {
      console.error('Failed to fetch reserved stake items:', err);
      setError('Failed to load reserved stake items.');
    } finally {
      setLoading(false);
    }
  };*/

  const handleSellClick = (item) => {
    setSellData(item);
    setIsSelling(true);
  };

  const handleSellStake = async (item) => {
    const reservationId = item?.reservationId;

    if (!reservationId) {
      alert('Reservation ID not found.');
      return;
    }

    try {
      const payload = {
        reservationId,
        userId: USER_ID
      };

      const response = await apiClient.post(
        API_ROUTES.RESERVATION_API.SELL_RESERVED_STAKE(reservationId),
        payload
      );

      alert('Stake sold successfully!');
      setIsSelling(false);
      // Optionally: refresh the list or remove sold item from state
    } catch (error) {
      console.error('Error selling stake:', error);
      alert(error?.message || 'Failed to sell the stake. Please try again.');
    }

  };

  return (
    <div className='sell-stake-container' style={{minHeight: '250px'}}>
      {loading && <p>Loading stake items...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && reservedStakes.length === 0 && (
        <NoData message="No stake items found." />
      )}

      {!loading && !error && reservedStakes.map((item, index) => (
        <SellStakeCard
          key={item.investmentId || index}
          {...item}
          itemName = {item.schemaTitle}
          imageUrl = {item.imageUrl}
          price = {item.reservedAmount}
          currey = {CURRENCY_UNIT}
          valuationDelta = {item.valuationDelta}
          onSellClick={() => handleSellClick(item)}
        />
      ))}     

      {isSelling && sellData && (
        <SellNFTModal
          item={sellData}
          itemName = {sellData.schemaTitle}
          imageUrl = {sellData.imageUrl}
          price = {sellData.reservedAmount + sellData.valuationDelta}
          currency = {CURRENCY_UNIT}
          handlingFee = {sellData.handlingFee}
          royalty = {sellData.returnRate}
          onClose={() => setIsSelling(false)}
        />
      )}
    </div>
  );
}

export default ReservedStakeList;
