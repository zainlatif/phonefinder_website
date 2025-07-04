import { useEffect, useState } from 'react';
import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.png';
import banner3 from '../assets/banner/banner3.png';
import './Banner.css';

const images = [banner1, banner2, banner3];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        className="banner-image"
      />
    </div>
  );
};

export default Banner;