import React from 'react'
import './card1.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import seller1 from '../../assets/seller1.jpg'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png'
import coin from '../../assets/coin.png'
import { Link  } from 'react-router-dom';
const Card1 = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  return (
    <div className='header section__padding'>
      {/* <div className="header-content">
        <div>
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div> */}

      <div className="infoArea">
        <img  src="https://image.treasurenft.xyz/NewVer2212/img/bg_lv3_03.png" alt="" />
        <div className='infoAreaInfo'>
          <div className='info-area-info-left'>
            <h2>Level 3</h2>
            <div className='prg-block'>
              <p>
                <span>Points</span>
                <span>20 /  </span>
                <span>(10%)</span>
              </p>
              <div className='ivu-progress ivu-progress-normal'>
              </div>
            </div>

          </div>
          <div className='info-area-info-right'>
            <img  src="https://image.treasurenft.xyz/NewVer2212/img/badges_lv3.png" alt="" loading='lazy'/>
            <div className='info-area-info-R-btn'>
              <span data-v-28f5dc40="" class="title-white-PR-12">Upgrade</span>
            </div>
          </div>


        </div>
      </div>


    </div>
  )
}

export default Card1
