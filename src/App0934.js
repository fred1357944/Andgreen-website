import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Awards from "./components/Awards";
import "./styles.css"; // Tailwind CSS & Bootstrap should be configured
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SocialIcons from "./components/SocialIcons"; // 假設你存放在 components 資料夾下
import BackgroundEffect from "./components/BackgroundEffect"; // 導入背景效果
import BentoGrid from "./components/BentoGrid"; // 導入新的 BentoGrid 組件

// Image assets
const images = [
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpg",
  "/images/hero7.jpg",
  "/images/hero8.jpg",
  "/images/hero9.jpg",
  "/images/hero10.jpg",
  "/images/hero11.jpg",
];

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "fixed",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#06d6a0", // 顯眼的顏色
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

// Hero Section with Background Image and Restored Effects
function Home() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="home-section"
    >
      {/* 添加背景效果 */}
      <BackgroundEffect />
      <section
        style={{
          backgroundColor: "white",
          height: "200px",
          opacity: 0,
        }}
      ></section>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="absolute inset-0 bg-green bg-opacity-50 flex items-center justify-between p-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-left text-black"
          >
            <h1 className="text-7xl mx-4 font-futura-bt">綠亦有限公司</h1>
            <p className="text-lg mx-4">創新設計，綠色科技</p>
          </motion.div>

          {/* Navigation links restored as original text */}
          <nav className="absolute top-6 right-6">
            <Link
              to="/"
              className="text-black mx-4 text-lg hover:text-gray-300 transition"
            >
              首頁
            </Link>
            <Link
              to="/news"
              className="text-black mx-4 text-lg hover:text-gray-300 transition"
            >
              最新動態
            </Link>
            <Link
              to="/projects"
              className="text-black mx-4 text-lg hover:text-gray-300 transition"
            >
              設計及項目
            </Link>
            <Link
              to="/careers"
              className="text-black mx-4 text-lg hover:text-gray-300 transition"
            >
              招聘訊息
            </Link>
            <Link
              to="/awards"
              className="text-black mx-4 text-lg hover:text-gray-300 transition"
            >
              競標與獲獎
            </Link>
          </nav>
        </div>
      </section>
      <section
        style={{
          backgroundColor: "white",
          height: "200px",
          opacity: 0,
        }}
      ></section>
      {/* <container>
        <p
          className="text-7xl font-futura text-black  my-4 bg-green inline-block mx-4"
          data-aos="fade-up"
        >
          設計案例
        </p>
      </container>
*/}
      {/* Slider */}
      <section className="py-20 bg-green flex justify-center items-center">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={10} className="justify-content-center align-items-center">
              <Slider
                {...carouselSettings}
                dots={true} // 確保點點顯示
                infinite={true}
                autoplay={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                centerMode={true} // 圖片居中模式
                centerPadding="0" // 去除 padding，讓圖片完全居中%"}}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="px-4 flex justify-center items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="transition-transform duration-500"
                      style={{ height: "100%" }}
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full mx-auto object-cover rounded-lg" // 加入 rounded-lg 圓角類別
                        style={{
                          height: "100%",
                          maxHeight: "800px",
                          objectFit: "contain",
                          borderRadius: "1rem", // 添加圓角樣式
                        }} // 讓圖片覆蓋容器並帶有圓角
                      />
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        style={{
          backgroundColor: "white",
          height: "200px",
          opacity: 0,
        }}
      ></section>
      <section className="py-16 text-left bg-green flex justify-between items-center px-4">
        <div className="text-left">
          <h2 className="text-3xl lg:text-4xl font-futura-bt text-black mb-6">
            聯絡我們
          </h2>
          <p className="text-balck mb-4 font-futura-bt">
            歡迎通過 Email 聯絡我們: mail@andgreen.org
          </p>
          <a
            href="mailto:mail@andgreen.org"
            className="text-black underline hover:text-gray-300 transition"
          >
            發送訊息
          </a>
        </div>

        {/* Social Icons 放在右邊 */}
        <div className="social-icons-contact">
          <SocialIcons />
        </div>
      </section>
      <section
        style={{
          backgroundColor: "white",
          height: "200px",
          opacity: 0,
        }}
      ></section>
    </motion.div>
  );
}

//
// Main App Component
function App() {
  return (
    <>
      {/* 添加 CustomCursor */}
      <CustomCursor />
      <Router>
        <header>
          <div>
            <h1 className="text-black font-futura-bt text-3xl">
              Andgreen Co. Ltd.
            </h1>
          </div>
        </header>
        <main className="pt-20 p-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/awards" element={<Awards />} />
            </Routes>
          </AnimatePresence>

          <footer className="bg-gray-100 py-6"></footer>
        </main>
      </Router>
    </>
  );
}
export default App;
