import React, { useEffect, useState } from 'react';
import './ReservationTab.css';
import Countdown from '../../../components/countdown/Countdown';
import CustomDropdown from '../../../components/form/dropdown/CustomDropdown';
import apiClient from '../../../api/apiClient';
import { API_ROUTES } from '../../../api/apiRoutes';
import { USER_ID } from '../../../constants/config';

function formatAmount(value) {
  const num = Number(value);
  return num >= 1000 ? `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K` : `${num}`;
}

const rankLabelMap = {
  RANK_0: "LV1",
  RANK_1: "LV2",
  RANK_2: "LV3",
  RANK_3: "LV4",
  RANK_4: "LV5",
  RANK_5: "LV6",
  RANK_6: "LV7",
  RANK_7: "LV8", // optional, handle extra rank
};

function ReservationTab() {
  const [investmentOptions, setInvestmentOptions] = useState([]); // original full data
  const [dropdownOptions, setDropdownOptions] = useState([]);     // for CustomDropdown
  const [selectedInvestmentRange, setSelectedInvestmentRange] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [isReservedFound, setIsReservedFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const allRanks = await apiClient.get(API_ROUTES.INVESTMENTS_API.ELIGIBLE_SUMMARY(USER_ID));
        setInvestmentOptions(allRanks);

        // Format for Rank dropdown with default header option
        const dropdownFormatted = [
          { value: null, label: "Lv", subLabel: "Income%", disabled: true },
          ...allRanks.map(rank => ({
            value: rank.rankCode,
            label: rankLabelMap[rank.rankCode] || rank.rankCode, // fallback to rankCode if not mappe
            subLabel: rank.incomePercentageRange
          }))
        ];
        setDropdownOptions(dropdownFormatted);

        // Select first enabled rank as default
        const firstEnabled = allRanks.find(rank => rank.enabled);
        if (firstEnabled) {
          setSelectedRank(firstEnabled);
        }

      } catch (error) {
        console.error('Error fetching investment options:', error);
      }
    }

    fetchData();
  }, []);


  // When selectedRank changes, reset selectedInvestmentRange
  useEffect(() => {
    if (selectedRank) {
      setSelectedInvestmentRange(
        `${selectedRank.minInvestmentAmount}-${selectedRank.maxInvestmentAmount}`
      );
    } else {
      setSelectedInvestmentRange(null);
    }
  }, [selectedRank]);

  const handleRankChange = (code) => {
    const rank = investmentOptions.find(r => r.rankCode === code);
    setSelectedRank(rank);
  };

  const handleInvestmentRangeChange = (value) => {
    setSelectedInvestmentRange(value);
  };

  const handleReserveClick = async () => {
    if (!selectedRank || !selectedInvestmentRange) {
      alert('Please select a valid rank and investment range.');
      return;
    }

    try {
      const payload = {
        userId: USER_ID,
        rankCode: selectedRank.rankCode,
        investmentRange: selectedInvestmentRange,
      };

      const response = await apiClient.post(API_ROUTES.INVESTMENTS_API.RESERVE_NOW, payload);

      if (response.status === 200 || response.status === 201) {
        alert('Reservation successful!');
        // You can also trigger any countdown or UI change here
      } else {
        console.error('Unexpected response:', response);
        alert('Failed to reserve. Please try again.');
      }
    } catch (error) {
      console.error('Error while reserving:', error);
      alert('An error occurred during reservation.');
    }
  };

  // Prepare options for Investment Range dropdown (currently just one range per rank)
  const investmentRangeOptions = selectedRank ? [
    {
      value: `${selectedRank.minInvestmentAmount}-${selectedRank.maxInvestmentAmount}`,
      label: `${formatAmount(selectedRank.minInvestmentAmount)} - ${formatAmount(selectedRank.maxInvestmentAmount)}`
    }
  ]
    : [];


  if (isReservedFound) {
    return <Countdown initialTimeInSeconds={4907} />;
  }

  return (
    <div className="reserve-now">
      <div className="reserve-content">
        {/* Rank Dropdown */}
        <div className="select-wrapper">
          <CustomDropdown
            options={dropdownOptions}
            selectedValue={selectedRank?.rankCode || ''}
            onChange={handleRankChange}
          />
        </div>

        {/* Investment Range Dropdown */}
        <div className="select-wrapper">
          {/* <select className="reserve-dropdown" disabled={!selectedRank}>
            {selectedRank && (
              <option>
                {formatAmount(selectedRank.minInvestmentAmount)} - {formatAmount(selectedRank.maxInvestmentAmount)}
              </option>
            )}
          </select> */}
          <CustomDropdown
            options={investmentRangeOptions}
            selectedValue={selectedInvestmentRange || ''}
            onChange={handleInvestmentRangeChange}
            disabled={!selectedRank}
          />
        </div>

      </div>

      {/* Reserve Now Button - only enabled if selectedRank is enabled */}
      <button 
        className="reserve-btn" 
        disabled={!selectedRank?.enabled}        
        onClick={handleReserveClick}
      >
        Reserve Now
      </button>
    </div>
  );
}

export default ReservationTab;
