import React, { useEffect, useState } from 'react';
import ReservationCard from '../../../components/card/reservation/ReservationCard ';
import NoData from '../../../components/NoData';
import { useNavigate } from 'react-router';
import { API_ROUTES } from '../../../api/apiRoutes';
import apiClient from '../../../api/apiClient';
import { CURRENCY_UNIT, USER_ID } from '../../../constants/config';
import { formatDateTime } from '../../../constants/dateFormatter';

const defaultReservedItems = [{
  investmentId: 1,
  drawDate: '2025/08/01 03:03:40',
  status: 'Won',
  orderNo: 'R3AE9995033223',
  reservationDate: '(GMT+05:30) 2025/08/01 03:03:28',
  estimatedAmount: '50 ~ 1000',
  itemName: 'GiffgaffApeClub_0021549',
  itemPrice: '177.26',
  imageUrl: 'https://prodimage-dan.treasurefun.xyz/GiffgaffApeClub/GiffgaffApeClub_1470_compre.png'
}];

const formatOrderNo = (reservedAt, reservationId) => {
  const date = new Date(reservedAt);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const paddedId = String(reservationId).padStart(4, '0');
  return `TRST${yyyy}${mm}${dd}${paddedId}`;
};


function TodaysReservationTab({ reservedStakes, loading, error }) {
  const todayDate = new Date().toISOString().split('T')[0];
  
  const todaysItems = reservedStakes.filter(item => {
    const reservedAtDate = new Date(item.reservedAt).toISOString().split('T')[0];
    return reservedAtDate === todayDate;
  });

  return (
    <div>
      {loading && <p>Loading stake items...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && todaysItems.length === 0 && (
        <NoData message="No stake items found." />
      )}

      {!loading && !error && todaysItems.map((item, index) => {
        const {
          reservationId,
          schemaTitle,
          imageUrl,
          reservedAmount,
          reservedAt,
          expiryAt,
          incomeEarned
        } = item;
        const orderNo = formatOrderNo(reservedAt, reservationId);

        return(
          <ReservationCard        
              key={reservationId || index}
              orderNo = {orderNo}
              itemName = {schemaTitle}
              itemPrice = {reservedAmount}
              reservationDate = {formatDateTime(reservedAt)}
              drawDate = {expiryAt}
              itemImg={imageUrl}
              estimatedAmount = "50-1000"
              currency={item.currencyCode || CURRENCY_UNIT}
              {...item}
          />
        );
      })}
    </div>
  );
}

export default TodaysReservationTab;
