import React, { useState } from "react";

const BentoGrid = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(null); // 用於顯示右側預覽的當前圖片

  const selectImage = (image) => {
    setCurrentImage(image); // 點擊圖片後更新右側預覽區域
  };

  return (
    <div className="flex">
      {/* 左側BentoGrid Layout */}
      <section className="py-20 w-1/2">
        <div className="container mx-auto px-4">
          <div className="bento-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="bento-item"
                onClick={() => selectImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-lg" // 確保圖片有倒圓角
                  style={{ height: "600px", borderRadius: "1rem" }} // 圖片的圓角設置
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 右側圖片預覽區域 */}
      <section className="py-20 w-1/2 flex flex-col items-center justify-center">
        {currentImage ? (
          <div className="text-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg" // 圖片圓角
              style={{ maxHeight: "500px", borderRadius: "1rem" }} // 圖片預覽圓角設置
            />
            {/* 下面保留的文字 */}
            <p className="text-center mt-4 text-sm text-gray-800">
              {currentImage.caption}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">請點擊圖片以預覽</p>
        )}
      </section>

      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-auto-rows: 300px; /* 固定每個格子的高度 */
          gap: 1rem;
        }

        .bento-item {
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem; /* 確保每個圖片區塊有圓角 */
          cursor: pointer;
        }

        .bento-item img {
          object-fit: cover; /* 確保圖片根據比例縮放，填滿框框，無扭曲 */
          width: 100%;
          height: 100%;
          border-radius: 0.5rem; /* 確保圖片內部也有圓角 */
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-auto-rows: 200px; /* 在較小螢幕上調整 */
          }
        }
      `}</style>
    </div>
  );
};

export default BentoGrid;
