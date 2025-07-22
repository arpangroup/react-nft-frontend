import React from 'react';
import './IncomeTable.css';

const IncomeTable = ({ incomeData, handleUserClick }) => {
  return (
    <div className="income-card">
      <div className="card-header">
        <p className="recent-title">Income</p>
      </div>

      <div className="income-table-wrapper">
        <table className="income-table">
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
                className="clickable-row"
                onClick={() => handleUserClick(income.incomeType)}
              >
                <td>{income.incomeType}</td>
                <td>{income.daily}</td>
                <td>{income.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeTable;
