import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import './timer.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsLightning, BsShieldShaded, BsHeadset } from 'react-icons/bs'; // Import icons
import AddToCart from './components/AddToCart';
import axios from 'axios';
import '../src/styles/singleproduct.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(72 * 60 * 60);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const formatTimeComponent = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const convertSecondsToTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: formatTimeComponent(days),
      hours: formatTimeComponent(hours),
      minutes: formatTimeComponent(minutes),
      seconds: formatTimeComponent(remainingSeconds),
    };
  };

  useEffect(() => {
    const apiUrl = `http://localhost:3017/products/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setSingleProduct(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : 'An error occurred');
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (timerSeconds > 0 && singleProduct) {
      const timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      const originalPrice = singleProduct.price;
      const discountPercentage = 10;
      const discountAmount = (originalPrice * discountPercentage) / 100;
      const newPrice = originalPrice - discountAmount;

      setDiscountedPrice(newPrice);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timerSeconds, singleProduct]);

  useEffect(() => {
    if (timerSeconds === 0) {
      setDiscountedPrice(null);
    }
  }, [timerSeconds]);

  if (isLoading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  if (!singleProduct) {
    return <div className="error-text">Product not found</div>;
  }

  const {
    name,
    company,
    description,
    category,
    stockAvailability,
    starRating,
    featured,
    colors,
    images,
  } = singleProduct;

  const renderStarRating = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} className="star-icon" style={{ color: 'yellow' }} />);
      } else if (i === roundedRating + 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon" style={{ color: 'yellow' }} />);
      } else {
        stars.push(<FaStar key={i} className="star-icon empty" style={{ color: 'yellow' }} />);
      }
    }

    return stars;
  };

  const timeComponents = convertSecondsToTime(timerSeconds);

  return (
    <>
      <br />
      <div className="single-product-container text-center">
        <div className="container product-container">
          <div className="row">
            <div className="col-md-6">
              <div className="slider-container" style={{ border: '10px groove lightgrey', maxWidth: '100%', padding: '15px' }}>
                <Slider {...sliderSettings}>
                  {images.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={singleProduct.name} style={{ maxWidth: '100%', height: 'auto', color: 'white' }} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h4 className="product-title" style={{ color: 'black', fontWeight: 'bold' }}>{singleProduct.name}</h4>
                <div className="container" style={{ fontWeight: 'bold' }}>
                  {singleProduct.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < singleProduct.description.split('\n').length - 1 && <br />
                      }
                    </React.Fragment>
                  ))}
                </div>
                <br />
                {timerSeconds > 0 && (
                  <div className="round-timer-container">
                    <p className="discount-timer" style={{ color: 'white' }}>
                      Offer Ends in {timeComponents.days}d {timeComponents.hours}h {timeComponents.minutes}m {timeComponents.seconds}s
                    </p>
                  </div>
                )}

                <br />
                <br />
                <div className="product-info">
                  <div className="info-item d-flex flex-column flex-md-row justify-content-around">
                    <p className="product-info-item">Brand: <b>{singleProduct.company}</b></p>
                    <p className="product-info-item">Category: <b>{singleProduct.category}</b></p>
                    <p className="product-info-item">Availability: <b className={`product-stock ${stockAvailability > 0 ? 'in-stock' : 'out-of-stock'}`}>{stockAvailability > 0 ? 'In Stock' : 'Not Available'}</b>
                    </p>
                  </div>
                  <br />
                  <div className="info-item">
                    <p className="product-info-item" style={{ fontSize: '25px' }}>
                      Price: <b className="price-highlight">${discountedPrice !== null ? discountedPrice.toFixed(2) : singleProduct.price.toFixed(2)}</b>
                    </p>
                    <p className="product-info-item">Stars: {renderStarRating(singleProduct.starRating)}</p>
                  </div>
                  <div className="info-item d-flex flex-column flex-md-row justify-content-around" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    <p className="product-info-item"><BsLightning /> Fast Delivery</p>
                    <p className="product-info-item"><BsShieldShaded /> Money-Back Guarantee</p>
                    <p className="product-info-item"><BsHeadset /> Customer Support</p>
                  </div>
                  {stockAvailability > 0 && <AddToCart product={singleProduct} discountedPrice={discountedPrice} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <br/>
    </>
  );
};

export default SingleProduct;
