import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './item.css'
import creator from '../../assets/seller2.png'
import { CURRENCY_UNIT } from '../../constants/config';
import apiClient from '../../api/apiClient';
import itemImage  from '../../assets/item1.png'
import ConfirmModal from '../../components/modal/confirm/ConfirmModal';
import WarningModal from '../../components/modal/warning/WarningModal';
import { API_ROUTES } from '../../api/apiRoutes';
import SuccessIcon from '../../assets/icons/success.png';
import WarningIcon from '../../assets/icons/warming.png';
import AlertModal from '../../components/modal/success/AlertModal';


const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`;

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [modalOpen, setModalOpen] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showWarningModal, setShowWarningModal] = useState(false);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'success' or 'error'
    title: '',
    content: '',
    footerButtons: []
  });

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const data = await apiClient.get(API_ROUTES.STAKE_DETAILS(id));
        setSchema(data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchema();
    }
  }, []);

  const handleBuyClick = async () => {
    try {
      const payload = {
        schemaId: schema.id,
        userId: 1, // Replace with dynamic user ID if available
        amount: schema.minimumInvestmentAmount
      };

      const response = await apiClient.post(API_ROUTES.STAKE_SUBSCRIBE, payload);

      console.log("API response:", response);
      //setShowSuccessModal(true); // Open Success modal
      // On success
      setModalData({
        isOpen: true,
        type: 'success',
        title: 'Subscription Success!',
        content: (
          <>
            <p><strong>Subscription Amount:</strong> {schema.minimumInvestmentAmount} {schema.currency || CURRENCY_UNIT}</p>
            <p><strong>ROI:</strong> {schema.returnPercentage || '2.5'}%</p>
            <p><strong>Mature At:</strong> 21 AUG 2025</p>
          </>
        ),
        footerButtons: [
          {
            label: 'Go to Subscription',
            onClick: handleNavigateToDeposit,
            className: 'btn btn-success',
          },
        ],
      });
    } catch (error) {
      console.error("Subscription failed:", error);
      //setShowWarningModal(true); // Open Warning modal
      setModalData({
        isOpen: true,
        type: 'error',
        title: 'Subscription Failed',
        content: (
          <p>{error?.message || 'Something went wrong. Please try again.'}</p>
        ),
        footerButtons: [
          {
            label: 'Try Again',
            onClick: () => setModalData(prev => ({ ...prev, isOpen: false })),
            className: 'btn btn-warning',
          },
        ],
      });
    }
  };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };
  
  const handleNavigateToDeposit = () => {
    //setModalOpen(false); // optional: close modal before navigation
    navigate(`/deposit`);
  };

  if (loading) return <div className="item">Loading...</div>;
  if (error) return <div className="item">Error: {error}</div>;
  if (!schema) return null;


  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={schema.imageUrl || itemImage} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{schema.title}</h1>
              <p>
              From <span>{schema.minimumInvestmentAmount} {schema.currency}</span>
              ‧ {schema.totalReturnPeriods} periods
            </p>
            <p><strong>Contact Address:</strong> <a href='#'>trustai</a></p>
            <p><strong>Owner:</strong>{schema.createdBy}<span></span></p>
            <p><strong>Price:</strong> <span>{schema.minimumInvestmentAmount} {schema.currency || CURRENCY_UNIT}</span></p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{schema.createdBy}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{schema.description || description} </p>
            </div>
            <div className="item-content-buy">
              <button 
                className="primary-btn"
                onClick={handleBuyClick}
                >
                Buy For {schema.minimumInvestmentAmount} {schema.currency || CURRENCY_UNIT}                
                </button>
              {/* <button className="secondary-btn">Make Offer</button> */}

              {/* <ConfirmModal 
                isOpen={modalOpen} 
                onClose={handleCloseModal}
                onPrimaryAction={handleNavigateToDeposit}
                primaryButtonLabel="Deposit"
                title="Conditions not met"
              /> */}

              {/* { showWarningModal && (
                <WarningModal
                  onClose={() => setShowWarningModal(false)}
                  onUpgrade={handleNavigateToDeposit}
                />
              )} */}


              {/* {showSuccessModal  && (
                <SuccessModal
                  onClose={() => setShowSuccessModal(false)}
                  onSuccess={handleNavigateToDeposit}
                  title={'Subscriptiion Success!!'}
                  footerButtons={[
                    {
                      label: 'Go to Subscription',
                      onClick: handleNavigateToDeposit,
                      className: 'success-button',
                    },
                  ]}
                >
                  <p><strong>Subscription Amount:</strong> 100USDT</p>
                  <p><strong>ROI:</strong> 2.5%</p>
                  <p><strong>Mature At:</strong> 21 AUG 2025</p>
                </SuccessModal>
              )} */}

              {modalData.isOpen && (
                <AlertModal
                    icon={modalData.type === 'success' ? SuccessIcon : WarningIcon}
                    onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
                    title={modalData.title}
                    footerButtons={modalData.footerButtons}
                  >
                    {modalData.content}
                  </AlertModal>
              )}


            </div>
          </div>
      </div>
  )
};

export default Item;
