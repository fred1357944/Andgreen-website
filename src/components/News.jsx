import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import AOS from "aos";
import {motion} from "framer-motion"; // 引入 motion
import "aos/dist/aos.css";
import BackgroundEffect from "./BackgroundEffect"; // 引入背景效果
import BentoGrid from "./BentoGrid";
import SocialIcons from "./SocialIcons";
import "../styles.css"; // 自定義樣式
import "../App.css"; // 調整後的 css 放這裡

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

  useEffect(() => {
    AOS.init({duration: 1200});
  }, []);

  return (
    <div className="snap-container">
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.6}}
        className="snap-section home-section"
      >
        <BackgroundEffect />
        <section className="relative bg-cover bg-center flex items-center justify-center">
          <div className="absolute inset-0 bg-green bg-opacity-50 flex items-center justify-between p-1">
            <motion.div
              initial={{y: -20, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.3, duration: 1}}
              style={{marginBottom: "10px"}} // 增加margin-bottom
              className="text-left text-black"
            >
              <h1 className="text-7xl mx-2 font-futura-bt my-5">綠亦</h1>
              <p className="text-lg mx-2"> 創新設計・綠色科技</p>
            </motion.div>
          </div>
          {/* Navigation links */}
          <nav>
            <Link
              to="/"
              className="text-black mx-2 text-lg hover:text-gray-300 transition"
            >
              &nbsp;&nbsp;首頁 &nbsp;&nbsp;
            </Link>

            <Link
              to="/projects"
              className="text-black mx-2 text-lg hover:text-gray-300 transition"
            >
              &nbsp;&nbsp; 設計及項目 &nbsp;&nbsp;
            </Link>
            <Link
              to="/careers"
              className="text-black mx-2 text-lg hover:text-gray-300 transition"
            >
              &nbsp;&nbsp; 招聘訊息 &nbsp;&nbsp;
            </Link>
            <Link
              to="/awards"
              className="text-black mx-2 text-lg hover:text-gray-300 transition"
            >
              &nbsp;&nbsp;競標與獲獎 &nbsp;&nbsp;
            </Link>
          </nav>
        </section>
      </motion.div>

      {/* 主要內容 */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.6}}
        className="snap-section"
      >
        <section id="news" className="py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-8">最新動態</h2>
          {/* BentoGrid 使用 */}
          <BentoGrid images={images} />
        </section>
      </motion.div>

      {/* 聯繫我們部分 */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.6}}
        className="snap-section"
      >
        <section className="py-16 text-left bg-green flex flex-col lg:flex-row justify-start items-center px-4">
          <div className="text-left mx-4">
            <h2 className="text-3xl lg:text-4xl font-futura-bt text-black mb-6">
              聯絡我們
            </h2>
            <p className="text-black mb-4 font-futura-bt">
              歡迎通過 Email 聯絡我們 : mail@andgreen.org
            </p>
            <a
              href="mailto:mail@andgreen.org"
              className="text-black underline hover:text-gray-300 transition"
            >
              發送訊息
            </a>
          </div>
          <div className="social-icons-contact">
            <SocialIcons />
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default News;
