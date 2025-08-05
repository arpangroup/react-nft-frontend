import React, { useEffect, useState } from 'react';
import './ReservationTab.css';
import Countdown from '../../../components/countdown/Countdown';
import axios from 'axios';
import CustomDropdown from '../components/CustomDropdown';

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
  const [selectedRank, setSelectedRank] = useState(null);
  const isReservedFound = false;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/v1/investments/eligible-summary?userId=1');
        const allRanks = response.data || [];
        setInvestmentOptions(allRanks);

        // Transform to fit CustomDropdown expected format
        // Map and prepend default option
        const dropdownFormatted = [
          { value: null, label: "Lv", subLabel: "Income%", disabled: true },
          ...allRanks.map(rank => ({
            value: rank.rankCode,
            label: rankLabelMap[rank.rankCode] || rank.rankCode, // fallback to rankCode if not mappe
            subLabel: rank.incomePercentageRange
          }))
        ];
        setDropdownOptions(dropdownFormatted);

        const firstEnabled = allRanks.find(rank => rank.enabled);
        if (firstEnabled) {
          setSelectedRank(firstEnabled);
        }

        // const enabledRanks = response.data.filter(r => r.enabled);
        // setInvestmentOptions(enabledRanks);
        // if (enabledRanks.length > 0) {
        //   setSelectedRank(enabledRanks[0]);
        // }

        // Select first rank as default
        // if (allRanks.length > 0) {
        //   setSelectedRank(allRanks[0]);
        // }
      } catch (error) {
        console.error('Error fetching investment options:', error);
      }
    }

    fetchData();
  }, []);

  const handleRankChange = (code) => {
    const rank = investmentOptions.find(r => r.rankCode === code);
    setSelectedRank(rank);
  };

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
          <select className="reserve-dropdown" disabled={!selectedRank}>
            {selectedRank && (
              <option>
                {formatAmount(selectedRank.minInvestmentAmount)} - {formatAmount(selectedRank.maxInvestmentAmount)}
              </option>
            )}
          </select>
        </div>

      </div>

      {/* Reserve Now Button - only enabled if selectedRank is enabled */}
      <button className="reserve-btn" disabled={!selectedRank?.enabled}>
        Reserve Now
      </button>
    </div>
  );
}

export default ReservationTab;
