import React from "react";
import { Link } from "react-router-dom";
import BentoGrid from "./BentoGrid"; // 導入 BentoGrid 組件
import "./News.css"; // 可根據需要自定義 News.css 以改變排版樣式

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
    <div>
      {/* 導航列 */}
      <nav className="bg-white py-4 px-6 shadow-md sticky top-0 z-50">
        <ul className="flex justify-around">
          <li>
            <Link
              to="/"
              className="text-black text-lg hover:text-gray-300 transition"
            >
              首頁
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-black text-lg hover:text-gray-300 transition"
            >
              設計及項目
            </Link>
          </li>
          <li>
            <Link
              to="/careers"
              className="text-black text-lg hover:text-gray-300 transition"
            >
              招聘訊息
            </Link>
          </li>
          <li>
            <Link
              to="/awards"
              className="text-black text-lg hover:text-gray-300 transition"
            >
              競標與獲獎
            </Link>
          </li>
        </ul>
      </nav>

      {/* News 主要內容 */}
      <section id="news" className="py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-8">最新動態</h2>

        {/* BentoGrid 使用 */}
        <BentoGrid images={images} />

        {/* 在 News 之後添加更多內容或介紹 */}
        <div className="mt-12">
          <p className="text-center text-lg">
            此頁面展示了我們最近的設計項目和獎項資訊。
          </p>
        </div>
      </section>
    </div>
  );
}

export default News;
