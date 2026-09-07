import { useEffect, useState } from 'react';
import banner1 from '../assets/banner/banner1.webp';
import banner2 from '../assets/banner/banner2.webp';

const images = [banner1, banner2];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5 w-full overflow-hidden px-3 sm:px-5 lg:px-8">
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        className="mx-auto block h-32 w-full rounded-lg object-cover sm:h-52 sm:rounded-xl lg:h-72"
      />
    </div>
  );
};

export default Banner;