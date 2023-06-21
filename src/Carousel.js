import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FilterCarousel = ({ filters }) => {
  return (
    <Carousel>
      {filters.map((filter, index) => (
        <div key={index}>
          <img src={filter.imageUrl} alt={filter.name} />
          <p className="legend">{filter.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default FilterCarousel;
