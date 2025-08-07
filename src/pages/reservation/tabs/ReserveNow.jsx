import React, { useEffect, useState } from 'react';
import './ReserveNow.css';
import Countdown from '../../../components/countdown/Countdown';
import CustomDropdown from '../../../components/form/dropdown/CustomDropdown';
import apiClient from '../../../api/apiClient';
import { API_ROUTES } from '../../../api/apiRoutes';
import { RANK_LABEL_MAP, USER_ID } from '../../../constants/config';
import SuccessIcon from '../../../assets/icons/success.png';
import WarningIcon from '../../../assets/icons/warming.png';
import AlertModal from '../../../components/modal/success/AlertModal';
import { Navigate, useNavigate } from 'react-router';

function formatAmount(value) {
  const num = Number(value);
  return num >= 1000 ? `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K` : `${num}`;
}

function ReserveNow({reservedStakes, onReservedSuccess}) {
  const navigate = useNavigate();
  const [investmentOptions, setInvestmentOptions] = useState([]); // original full data
  const [dropdownOptions, setDropdownOptions] = useState([]);     // for CustomDropdown
  const [selectedInvestmentRange, setSelectedInvestmentRange] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expiryAt, setExpiryAt] = useState(null);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'success' or 'error'
    title: '',
    content: '',
    footerButtons: []
  });

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
            label: RANK_LABEL_MAP[rank.rankCode] || rank.rankCode, // fallback to rankCode if not mappe
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

  useEffect(() => {
    if (
      Array.isArray(reservedStakes) &&
      reservedStakes.length > 0 &&
      reservedStakes[0].expiryAt != null
    ) {
      setExpiryAt(reservedStakes[0].expiryAt);
    }
  }, [reservedStakes]);


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

  const handleNavigateToTodaysStake = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
    navigate('/reservation', {
      replace: true,
      state: { activeTab: 'Todays' }
    });
  }

  const handleReserveClick = async () => {
    if (!selectedRank || !selectedInvestmentRange) {
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Please select a valid rank and investment range.',
        content: null
      });
      return;
    }

    try {
      const payload = {
        userId: USER_ID,
        rankCode: selectedRank.rankCode,
        investmentRange: selectedInvestmentRange,
      };

      const response = await apiClient.post(API_ROUTES.RESERVATION_API.RESERVE_NOW, payload);
      //console.log("RESPONSE: ", response)
      setExpiryAt(response.expiryAt);
      onReservedSuccess(response);
      handleNavigateToTodaysStake();
    } catch (error) {
      console.error('Error while reserving:', error);
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Reservation Failed',
        content: (
          <p>{error?.message || 'Something went wrong. Please try again.'}</p>
        ),
      });
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


  if (expiryAt) {
    const expiryTime = new Date(expiryAt).getTime();
    const now = Date.now();
    const timeRemainingInSeconds = Math.max(Math.floor((expiryTime - now) / 1000), 0); // prevent negative time

    return <Countdown initialTimeInSeconds={timeRemainingInSeconds} />;
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

      {modalData.isOpen && (
        <AlertModal
            type={modalData.type}
            icon={modalData.type === 'success' ? SuccessIcon : WarningIcon}
            onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
            title={modalData.title}
            footerButtons={modalData.footerButtons}
          >
            {modalData.content}
          </AlertModal>
      )}

    </div>
  );
}

export default ReserveNow;
