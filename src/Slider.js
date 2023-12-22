import React, { useState } from "react";

const SlideImage = [
  { id: 0, value: "/images/ring11.jpeg" },
  { id: 1, value: "/images/ring12.jpeg" },
  { id: 2, value: "/images/ring13.jpeg" },
  { id: 3, value: "/images/ring14.jpeg" },
  { id: 4, value: "/images/ring15.jpeg" },
  { id: 5, value: "/images/ring16.jpeg" },
  { id: 6, value: "/images/ring17.jpeg" },
];


const Slider = () => {
    const [sliderImage, setSliderImage] = useState(SlideImage[0].value);
    const [currImage, setCurrImage] = useState(0);
  
    function handleSlide(img) {
      setCurrImage(img.id);
      setSliderImage(img.value);
    }
  
    function handlePrev() {
      const prevImage = (currImage - 1 + SlideImage.length) % SlideImage.length;
      setCurrImage(prevImage);
      setSliderImage(SlideImage[prevImage].value);
    }
  
    function handleNext() {
      const nextImage = (currImage + 1) % SlideImage.length;
      setCurrImage(nextImage);
      setSliderImage(SlideImage[nextImage].value);
    }
  
    const displayedImages = SlideImage.slice(0, 5); // Get the first 5 elements
  
    return (
      <div className="w-screen h-screen p-20 flex flex-col justify-center items-center">
        <h1>Image Slider</h1>
        <div className="flex space-x-2">
          {/* Slider Images */}
          <div className="flex flex-col space-y-4">
            <button onClick={handlePrev}>Prev</button>
            {displayedImages.map((img) => (
              <button
                key={img.id}
                className={`h-20 w-20 border overflow-hidden ${
                  img.id === currImage ? 'border-orange-500' : ''
                }`}
                onClick={() => handleSlide(img)}
              >
                <img src={img.value} alt="slideImage" />
              </button>
            ))}
            <button onClick={handleNext}>Next</button>
          </div>
          {/* Image Show */}
          <div className="h-[65vh] w-[35vw] border">
            <img
              className="h-full w-full object-contain"
              src={sliderImage}
              alt="ImageSlide"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Slider;