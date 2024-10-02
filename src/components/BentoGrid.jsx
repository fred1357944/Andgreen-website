import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BentoGrid = ({ images, isLoading }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const selectImage = (image) => {
    setCurrentImage(image);
  };

  const handleMouseMove = (e, index) => {
    const item = e.currentTarget;
    const { width, height, left, top } = item.getBoundingClientRect();
    const mouseX = e.clientX - (left + width / 2); // 相對於圖片中心的X座標
    const mouseY = e.clientY - (top + height / 2); // 相對於圖片中心的Y座標

    const rotateY = (mouseX / (width / 2)) * 15; // 根據滑鼠位置設置旋轉角度Y
    const rotateX = -(mouseY / (height / 2)) * 15; // 根據滑鼠位置設置旋轉角度X

    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* 左側BentoGrid Layout */}
      <section className="py-20 w-full lg:w-1/2">
        <div className="container mx-auto px-4">
          <div className="bento-grid">
            {isLoading
              ? Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      height={200}
                      width={"100%"}
                      className="rounded-lg"
                    />
                  ))
              : images.map((image, index) => (
                  <div
                    key={index}
                    className="bento-item"
                    onClick={() => selectImage(image)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    style={{
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transition:
                        "transform 0.1s ease-out, box-shadow 0.3s ease",
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.6)", // 調整陰影
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={{
                        height: "100%",
                        borderRadius: "0.5rem",
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 右側圖片預覽區域 */}
      <section className="py-20 w-full lg:w-1/2 flex flex-col items-center justify-center">
        {currentImage ? (
          <div className="text-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ maxHeight: "500px", borderRadius: "1rem" }}
            />
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
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 200px;
          gap: 1rem;
          perspective: 1000px; /* 提供3D效果 */
        }

        .bento-item {
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
          cursor: pointer;
          background: transparent; /* 背景透明 */
        }

        .bento-item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          transition: transform 0.2s ease-out;
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 150px;
          }
        }

        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default BentoGrid;
