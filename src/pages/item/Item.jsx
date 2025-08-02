import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './item.css'
import creator from '../../assets/seller2.png'
import { CURRENCY_UNIT } from '../../constants/config';
import apiClient from '../../api/apiClient';
import itemImage  from '../../assets/item1.png'
import Modal from './Modal';

const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`;

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const data = await apiClient.get(`/api/v1/investment-schemas/${id}`);
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

  const handleBuyClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleNavigateToDeposit = () => {
    setModalOpen(false); // optional: close modal before navigation
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

              <Modal 
                isOpen={modalOpen} 
                onClose={handleCloseModal}
                onPrimaryAction={handleNavigateToDeposit}
                primaryButtonLabel="Deposit"
                title="Conditions not met"
              />
            </div>
          </div>
      </div>
  )
};

export default Item;
