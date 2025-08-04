import React, { useState } from 'react';
import NoData from './NoData';
import ReserveDropdowns from '../ReserveDropdowns';
import ReservationCard from './ReservationCard ';
import OrderCard from '../../components/card/order/OrderCard ';
import StakeCard from '../../../components/card/StakeCard'
import CollectionCard from './components/CollectionCard';
import SellNFT from '../sellNft/SellNFT ';


const tabs = ['Today\'s', 'Reserve', 'Collection'];

const TabContent = ({ activeTab }) => {
  const [isSelling, setIsSelling] = useState(false);
  const [sellData, setSellData] = useState(null); // For passing NFT info to SellNFT
  const currentTime = 'GMT+05:30 2025-07-23 03:37:51';

   const handleSellClick = (item) => {
    setSellData(item);
    setIsSelling(true);
  };

  const handleClose = () => {
    setIsSelling(false);
    setSellData(null);
  };

  const renderCollectionTab = () => (
    <div className="bids-container-card">
      <CollectionCard
        key={1}
        image={`http://localhost:8080/api/v1/files/download/stake_2.png`}
        title={`GiffgaffApeClub_0021549`}
        price={177.26}
        onSellClick={() =>
          handleSellClick({
            title: 'GiffgaffApeClub_0021549',
            price: 177.26,
            image: `http://localhost:8080/api/v1/files/download/stake_2.png`,
            coinType: 'USDT',
          })
        }
      />
    </div>
  );

  return (
    <>
      {activeTab === 0 && (
        <>
          <ReservationCard />
          <ReservationCard />
        </>
      )}
      {activeTab === 1 && <ReserveDropdowns />}
      {activeTab === 2 && renderCollectionTab()}

      {isSelling && sellData && (
        <SellNFT item={sellData} onClose={handleClose} />
      )}
    </>
  );
};

export default TabContent;
