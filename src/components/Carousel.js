import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropType from 'prop-types';

const maxCards = 6;

export default function Carousel({ data, type }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {type === 'foods' ? data.slice(0, maxCards).map((reco, i) => (
        <div key={Math.random()} className="recomendations-carousel">
          {i <= maxCards
            && (
              <div
                data-testid={`${i}-recomendation-card`}
                className="recomendation-card"
              >
                <img src={reco.strDrinkThumb} alt="" />
                <p data-testid={`${i}-recomendation-title`}>{reco.strDrink}</p>
              </div>)}
        </div>
      ))
        : data.slice(0, maxCards).map((reco, i) => (
          <div key={Math.random()} className="recomendations-carousel">
            {i <= maxCards
              && (
                <div
                  data-testid={`${i}-recomendation-card`}
                  className="recomendation-card"
                >
                  <img src={reco.strMealThumb} alt="" />
                  <p data-testid={`${i}-recomendation-title`}>{reco.strMeal}</p>
                </div>)}
          </div>))}
    </Slider>
  );
}

Carousel.propTypes = {
  type: PropType.str,
  data: PropType.array,
}.isRequired;
