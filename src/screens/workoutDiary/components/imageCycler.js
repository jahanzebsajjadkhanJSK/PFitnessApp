import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

const ImageCycler = ({ firstImageUrl, secondImageUrl, style }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [firstImageUrl, secondImageUrl];

  const randomNumber = Math.floor(Math.random() * (1400 - 700 + 1)) + 700;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, randomNumber);

    return () => clearInterval(interval);
  }, []);

  return <Image source={{ uri: images[currentImageIndex] }} style={style} />;
};

export default ImageCycler;