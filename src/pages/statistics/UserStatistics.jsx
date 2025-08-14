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
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get(API_ROUTES.RESERVATION_API.RESERVATION_SUMMARY);
      console.log("RESRVATION: ", res.data);
      setStats(res.data || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      const message = err?.message || 'Failed to load stake items.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="user-statistics">
       {/* {loading ? (
         <Loader size={60} color="#007bff" />
       ): error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        Array.isArray(stats) && stats.length > 0 ? (
          stats.map((stat, index) => (
          <UserStatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            />
        ))
      ) : (
        <p>No statistics available.</p>
      )
    )} */}
      <UserStatCard key="0" title="Today Earnings" value={loading ? 'NaN' : stats.todayEarning.toLocaleString() ?? 0} color="blue" />
      <UserStatCard key="1" title="Cumulative Income" value={loading ? 'NaN' : stats.cumulativeIncome.toLocaleString() ?? 0} color="green" />
      <UserStatCard key="2" title="Team Benefits" value={loading ? 'NaN' : stats.totalTeamIncome.toLocaleString() ?? 0} color="gray" />
      <UserStatCard
        key="3"
        title="Reservation Range"
        value={
          loading
            ? 'NaN'
            : `${stats?.reservationRange?.startPrice.toLocaleString() ?? 1} ~ ${stats?.reservationRange?.endPrice.toLocaleString() ?? 5000}`
        }
        color="orange"
      />
      <UserStatCard key="4" title="Wallet Balance" value={loading ? 'NaN' : stats.walletBalance.toLocaleString() ?? 0} color="cyan" />
      <UserStatCard key="5" title="Balance for Reservation" value={loading ? 'NaN' : stats.walletBalance.toLocaleString() ?? 0} color="darkblue" />
    </div>
  );
};

export default UserStatistics;