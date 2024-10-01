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

// Image assets
const images = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];

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
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundColor: "black" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between p-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-left text-white"
          >
            <h1 className="text-7xl mx-4 font-futura">綠亦有限公司</h1>
            <p className="text-lg mx-4">創新設計，綠色科技</p>
          </motion.div>

          {/* Navigation links restored as original text */}
          <nav className="absolute top-6 right-6">
            <Link
              to="/"
              className="text-white mx-4 text-lg hover:text-gray-300 transition"
            >
              首頁
            </Link>
            <Link
              to="/news"
              className="text-white mx-4 text-lg hover:text-gray-300 transition"
            >
              最新動態
            </Link>
            <Link
              to="/projects"
              className="text-white mx-4 text-lg hover:text-gray-300 transition"
            >
              設計及項目
            </Link>
            <Link
              to="/careers"
              className="text-white mx-4 text-lg hover:text-gray-300 transition"
            >
              招聘訊息
            </Link>
            <Link
              to="/awards"
              className="text-white mx-4 text-lg hover:text-gray-300 transition"
            >
              競標與獲獎
            </Link>
          </nav>
        </div>
      </section>
      {/* Image Carousel Section */}
      <section className="py-20 bg-gray-100">
        <p
          className="text-lg font-morisawa text-center text-light-gray mb-12"
          style={{ lineHeight: "5" }} // 自定義行高，1 表示行高等於字體大小
          data-aos="fade-up"
        >
          設計案例
        </p>
        <Container>
          <Row>
            <Col>
              <Slider {...carouselSettings}>
                {images.map((image, index) => (
                  <div key={index} className="px-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="transition-transform duration-500"
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                      />
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Grid Layout Section for Project Display */}
      <section className="py-20 bg-gray-100">
        <Container>
          <Row>
            <Col md={4}>
              <div className="relative">
                <img
                  src="/images/project1.jpg"
                  alt="Project 1"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-2 rounded-lg">
                  <p className="text-sm text-gray-800 font-morisawa">
                    6 - Information about the image
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="relative">
                <img
                  src="/images/project2.jpg"
                  alt="Project 2"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-2 rounded-lg">
                  <p className="text-sm text-gray-800 font-morisawa">
                    7 - More info
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="relative">
                <img
                  src="/images/project3.jpg"
                  alt="Project 3"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-2 rounded-lg">
                  <p className="text-sm text-gray-800 font-morisawa">
                    8 - Architecture information
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Information Section */}
      <section className="bg-black py-16">
        {/* 我們的願景 左對齊 */}
        <h2
          className="text-7xl font-futura text-white mb-6 mx-4"
          data-aos="fade-up"
        >
          我們的願景
        </h2>
        <p
          className="text-lg text-white leading-relaxed mx-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          綠亦有限公司將自然與科技結合，設計創新產品，致力於提升城市空氣品質，推動可持續發展。
        </p>
      </section>
      <section className="py-16 text-left bg-black flex justify-between items-center px-4">
        <div className="text-left">
          <h2 className="text-3xl lg:text-4xl font-futura text-white mb-6">
            聯絡我們
          </h2>
          <p className="text-white mb-4 font-morisawa">
            歡迎通過 Email 聯絡我們: mail@andgreen.org
          </p>
          <a
            href="mailto:mail@andgreen.org"
            className="text-white underline hover:text-gray-300 transition"
          >
            發送訊息
          </a>
        </div>

        {/* Social Icons 放在右邊 */}
        <div className="social-icons-contact">
          <SocialIcons />
        </div>
      </section>
    </motion.div>
  );
}

// Main App Component
function App() {
  return (
    <>
      <BackgroundEffect />
      {/* 添加 CustomCursor */}

      <CustomCursor />
      <Router>
        <header className="bg-white p-6 shadow-md fixed top-0 left-0 w-full z-10">
          <div className="container mx-3 flex justify-between items-center">
            <h1 className="text-light-gray font-futura text-3xl">
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
