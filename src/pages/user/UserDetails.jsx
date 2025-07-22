import React, { useEffect, useState } from 'react';
import Branding from '../../components/branding/Branding';
import './UserDetails.css';
import ProfileCard from '../../components/card/ProfileCard';
import ProfitBalanceCard from '../../components/card/ProfitBalanceCard';
import IncomeTable from './IncomeTable';
import Transaction from '../../components/transaction/Transaction';

function UserDetails() {
  const [userHierarchy, setUserHierarchy] = useState([]);
  const [incomeData, setIncomeData] = useState([
    { incomeType: "Comprehensive", daily: 3.37, total: 15007.89 },
    { incomeType: "Reserve", daily: 3.12, total: 7.98 },
    { incomeType: "Team", daily: 0.25, total: 0 },
    { incomeType: "Activity", daily: 0, total: 15000 },
    { incomeType: "Bid", daily: 0, total: 0 },
    { incomeType: "Stake", daily: 0, total: 0 }
  ]);

  const handleUserClick = () => {

  }


  return (
    <div className='' style={{ padding: '16px', marginBottom: '100px' }}>

      <ProfileCard
        username="John Doe"
        uuid="123e4567-e89b-12d3-a456-426614174000"
        level={3}
        points={305}
        profileImage="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
      />

     <ProfitBalanceCard amount={1580.75} currency="USD" label="Today" />
     <ProfitBalanceCard amount={-325.50} currency="USD" label="Last 7 Days" />

     <IncomeTable
        incomeData={[
          { incomeType: 'Staking', daily: '$12.50', total: '$325.00' },
          { incomeType: 'Referral', daily: '$5.00', total: '$145.00' },
          { incomeType: 'Airdrop', daily: '$0.00', total: '$75.00' },
        ]}
        handleUserClick={(type) => console.log('Clicked:', type)}
    />

      {/* Column 2: Income Table */}
      <div className="income_card" style={{ marginBottom: '20px' }}>
        <div className="card_header">
          <p className="recent-title">Income</p>
        </div>

        <div className="income_table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Daily Income</th>
                <th>Total Income</th>
              </tr>
            </thead>
            <tbody>
              {incomeData.map((income) => (
                <tr
                  key={income.incomeType}
                  className="clickable"
                  onClick={() => handleUserClick(income.incomeType)}
                >
                  <td>{income.incomeType}</td>
                  <td>{income.daily}</td>
                  <td>{income.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />




        </div>
      </div>

      <Branding />

      <Transaction/>
    </div>
  );
}

export default UserDetails;
