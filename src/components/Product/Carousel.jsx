import { useState, useEffect, useRef, useCallback } from "react";

import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Left, Right } from "neetoicons";

const Carousel = ({ title, imageUrls }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handelNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  }, [imageUrls.length]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handelNext, 3000);
  }, [handelNext]);

  const handelPrevious = () => {
    resetTimer();
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(handelNext, 3000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [handelNext]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handelPrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handelNext();
            resetTimer();
          }}
        />
      </div>
      <div className="mt-2 flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
