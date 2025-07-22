import React, { useState } from 'react';
import './ItemList.css';
import FinanceCard from '../../components/card/FinanceCard';

function ItemList() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className='stake-list'>
    <FinanceCard/>
    </div>
  );
}

export default ItemList;
