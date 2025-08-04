import './SellNFTModal.css';
import { FiX } from 'react-icons/fi';

const SellNFTModal = ({ onClose }) => {
  return (
    <div className="drawer-content">
      <div className="drawer-body">
        <div className="step1-area">
          <h2 className="title">
           <FiX
              className="cancel-icon"
              onClick={onClose}
              aria-label="Close"
              role="button"
            />
            Sell
          </h2>

          <img
            className="img-item"
            alt="NFT Item"
            src="https://prodimage-dan.treasurefun.xyz/GiffgaffApeClub/GiffgaffApeClub_1470.png"
          />

          <h3 className="item-name">GiffgaffApeClub_0021549</h3>

          <div className="price-area">
            <h4 className="sub-title">Price</h4>
            <div className="price-row">
              <div className="select-coin">
                <img
                  src="https://image.treasurenft.xyz/coin/usdt.png"
                  alt="USDT icon"
                  className="coin-img"
                />
                <span className="coin-label">USDT</span>
              </div>
              <div className="price-value">184.89032924</div>
            </div>
          </div>

          <div className="fee-area">
            <h4 className="sub-title">Fees</h4>
            <div className="fee-row">
              <p>Royalty</p>
              <span>0.2%</span>
            </div>
          </div>

          <div className="footer">
            <button className="btn-complete" onClick={onClose}>
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellNFTModal;