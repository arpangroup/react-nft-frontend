import React, { useEffect, useState } from 'react';
import './UserStatistics.css';
import { API_ROUTES } from '../../api/apiRoutes';
import apiClient from '../../api/apiClient';
import { USER_ID } from '../../constants/config';
import UserStatCard from '../../components/card/stat/UserStatCard';
import Loader from '../../components/loader/Loader';

const defaultStats = [
  { title: 'Today Earnings', value: '0.16', color: 'blue' },
  { title: 'Cumulative Income', value: '105.37', color: 'green' },
  { title: 'Team Benefits', value: '9.03', color: 'gray' },
  { title: 'Reservation Range', value: '1 ~ 5,000', color: 'orange' },
  { title: 'Wallet Balance', value: '0.77', color: 'cyan' },
  { title: 'Balance for Reservation', value: '0.77', color: 'darkblue' },
];

// const statData = {
//   todayEarning: '0.0',
//   cumulativeIncome: '0.0',
//   teamBnefit: '0.0',
//   reservationRange: '0.0 - 0.0',
//   walletBalance: '0.0',
//   balanceForReservation: '0.0',
// }

const UserStatistics = () => {  
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserStats(setStats, setLoading, setError);
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await apiClient.get(API_ROUTES.USER_STATS(USER_ID));
      setStats(response.content || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      setError('Failed to load stake items.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="user-statistics">
       {loading ? (
         <Loader size={60} color="#007bff" />
       ): (
        stats.map((stat, index) => (
        <UserStatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          color={stat.color}
          />
      ))
    )}
      {/* <UserStatCard key="0" title="Today Earnings" value={statData.todayEarning} color={'blue'}/>
      <UserStatCard key="1" title="Cumulative Income" value={statData.cumulativeIncome} color={'green'}/>
      <UserStatCard key="2" title="Team Benefits" value={statData.teamBnefit} color={'gray'}/>
      <UserStatCard key="3" title="Reservation Range" value={statData.reservationRange} color={'orange'}/>
      <UserStatCard key="4" title="Wallet Balance" value={statData.walletBalance} color={'cyan'}/>
      <UserStatCard key="5" title="Balance for Reservation" value={statData.balanceForReservation} color={'darkblue'}/> */}
    </div>
  );
};

export default UserStatistics;