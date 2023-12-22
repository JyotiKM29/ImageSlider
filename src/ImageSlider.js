import React, { useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const SlideImages = [
  { id: 0, value: "/images/ring11.jpeg" },
  { id: 1, value: "/images/ring12.jpeg" },
  { id: 2, value: "/images/ring13.jpeg" },
  { id: 3, value: "/images/ring14.jpeg" },
  { id: 4, value: "/images/ring15.jpeg" },
  { id: 5, value: "/images/ring16.jpeg" },

];

const ImageSlider = () => {
  const [selectedImage, setSelectedImage] = useState(SlideImages[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const transformRef = useRef(null);

  const handlePrev = () => {
    const newStartIndex = Math.max(0, startIndex - 1);
    setStartIndex(newStartIndex);
  };

  const handleNext = () => {
    const newStartIndex = Math.min(SlideImages.length - 5, startIndex + 1);
    setStartIndex(newStartIndex);
  };

  const handleSelect = (index) => {
    setSelectedImage(SlideImages[startIndex + index]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3));
    if (transformRef.current) {
      transformRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
    if (transformRef.current) {
      transformRef.current.zoomOut();
    }
  };

  return (
    <div className="w-screen h-screen p-6 md:p-20 flex flex-col justify-center items-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-serif ">Image Slider</h1>
      <div className="flex flex-col md:flex-row space-x-2">
        {/* Slider Images */}
        <div className="flex md:flex-col space-x-2 md:space-y-4">
          <button
            onClick={handlePrev}
            className="flex justify-center items-center
            -rotate-90 md:rotate-0"
          >
            <IoIosArrowUp className="text-4xl " />
          </button>
          {SlideImages.slice(startIndex, startIndex + 5).map((image, index) => (
            <button
              key={image.id}
              className={` h-15 w-15 md:h-20 md:w-20 border overflow-hidden ${
                selectedImage && selectedImage.id === image.id
                  ? "border-orange-500"
                  : ""
              }`}
              onClick={() => handleSelect(index)}
            >
              <img src={image.value} alt={`Img${index}`} />
            </button>
          ))}
          <button onClick={handleNext}
          className="flex justify-center items-center -rotate-90 md:rotate-0"
          >
            <IoIosArrowDown className="text-4xl"  />
          </button>
        </div>

        <TransformWrapper
          initialScale={1}
          ref={transformRef}
          options={{ limitToBounds: false }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <div className="flex  flex-col  h-[70vh]">
              <div className="h-[55vh] w-[90vw] md:h-[65vh] md:w-[35vw] mt-8  md:mt-0 overflow-hidden">
                {selectedImage && (
                  <TransformComponent>
                    <img
                      className="h-full w-full object-contain"
                      src={selectedImage.value}
                      alt={`SelectedImage`}
                    />
                  </TransformComponent>
                )}
              </div>
              <div className="px-4 tools flex space-x-2 items-center">
                <button
                  onClick={handleZoomIn}
                  className="font-semiBold text-2xl"
                >
                  +
                </button>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={handleZoomOut}
                  className="font-semiBold text-2xl"
                >
                  -
                </button>
                <button onClick={() => resetTransform()}>Reset</button>
              </div>
            </div>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default ImageSlider;
