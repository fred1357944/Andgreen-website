import React from "react";
import BentoGrid from "./BentoGrid"; // 導入 BentoGrid 組件

function News() {
  const images = [
    {
      src: "/images/project1.jpg",
      alt: "Project 1",
      caption: "6 - Information about the image",
    },
    {
      src: "/images/project2.jpg",
      alt: "Project 2",
      caption: "7 - More info",
    },
    {
      src: "/images/project3.jpg",
      alt: "Project 3",
      caption: "8 - Architecture information",
    },
  ];

  return (
    <section id="news">
      <h2>最新動態</h2>
      {/* 使用 BentoGrid 組件，並將 images 傳入 */}
      <BentoGrid images={images} />
    </section>
  );
}

export default News;
