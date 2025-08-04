import React, { useEffect, useState } from 'react';
import NoData from '../../../components/NoData';
import CollectionCard from '../../../components/card/collection/CollectionCard';
import { useNavigate } from 'react-router';
import { CURRENCY_UNIT } from '../../../constants/config';
import SellNFTModal  from '../sellNft/SellNFTModal';

const defaultItems = [{
  id: 1,
  image: 'http://localhost:8080/api/v1/files/download/stake_2.png',
  title: 'GiffgaffApeClub_0021549',
  price: '177.26',
}];

function CollectionTab() {
  const [reservedItems, setReservedItems] = useState(defaultItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSelling, setIsSelling] = useState(false);
  const [sellData, setSellData] = useState(null); // For passing NFT info to SellNFT Modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservedStakes();
  }, []);

  const fetchReservedStakes = async () => {
    try {
      //const response = await apiClient.get(API_ROUTES.RESERVED_STAKES_BY_USER_ID);
      //setReservedItems(response.content || []);
    } catch (err) {
      console.error('Failed to fetch reserved stake items:', err);
      setError('Failed to load reserved stake items.');
    } finally {
      setLoading(false);
    }
  };

  const handleSellClick = (item) => {
    setSellData(item);
    setIsSelling(true);
  };

  return (
    <div style={{marginBottom: '80px'}}>
      {loading && <p>Loading stake items...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && reservedItems.length === 0 && (
        <NoData message="No stake items found." />
      )}

      {!loading && !error && reservedItems.map((item, index) => (
        <CollectionCard        
            key={item.investmentId || index}
            {...item}
            onSellClick={() =>handleSellClick(item)}
        />
      ))}

      {isSelling && sellData && (
        <SellNFTModal item={sellData} onClose={() => setIsSelling(false)} />
      )}
    </div>
  );
}

export default CollectionTab;
