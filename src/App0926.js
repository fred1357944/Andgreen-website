import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Awards from "./components/Awards";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image assets
const images = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];

// Custom Cursor Component
const CustomCursor = React.memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        backgroundColor: "#06d6a0",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
    />
  );
});

// 添加 Locomotive Scroll 效果
function useLocoScroll() {
  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
    });

    return () => {
      locoScroll.destroy();
    };
  }, []);
}

// Home Page Component
function Home() {
  useLocoScroll();
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

  // Initialize AOS and animations
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="home-section"
    >
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            data-aos="fade-up"
            className="text-center text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-7xl font-futura">綠亦有限公司</h1>
            <p className="text-lg mt-4">創新設計，綠色科技</p>
            <motion.button
              className="px-8 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              了解更多
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20 bg-gray-100">
        <h2
          className="text-4xl lg:text-5xl font-morisawa text-center text-light-gray mb-12"
          data-aos="fade-up"
        >
          設計案例
        </h2>
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

      {/* Information Section */}
      <section className="py-16 bg-white text-center">
        <h2
          className="text-3xl lg:text-4xl font-morisawa text-light-gray mb-6"
          data-aos="fade-up"
        >
          我們的願景
        </h2>
        <p
          className="text-gray-600 font-morisawa text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          綠亦有限公司將自然與科技結合，設計創新產品，致力於提升城市空氣品質，推動可持續發展。
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center bg-gray-100">
        <h2
          className="text-3xl lg:text-4xl font-futura text-light-gray mb-6"
          data-aos="fade-up"
        >
          聯絡我們
        </h2>
        <p className="text-gray-600 mb-4 font-morisawa">
          歡迎通過 Email 聯絡我們: contact@andgreen.org
        </p>
        <motion.button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura rounded-full"
          data-aos="fade-up"
          data-aos-delay="100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          發送訊息
        </motion.button>
      </section>
    </motion.div>
  );
}

// Main App Component
function App() {
  return (
    <>
      <CustomCursor />
      <Router>
        <header className="bg-white p-6 shadow-md fixed top-0 left-0 w-full z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-light-gray font-futura text-3xl">
              綠亦有限公司
            </h1>
            <nav className="flex space-x-6">
              <Link
                className="text-light-gray font-futura hover:text-green-500 transition"
                to="/"
              >
                首頁
              </Link>
              <Link
                className="text-light-gray font-futura hover:text-green-500 transition"
                to="/news"
              >
                最新動態
              </Link>
              <Link
                className="text-light-gray font-futura hover:text-green-500 transition"
                to="/projects"
              >
                設計及項目
              </Link>
              <Link
                className="text-light-gray font-futura hover:text-green-500 transition"
                to="/careers"
              >
                招聘訊息
              </Link>
              <Link
                className="text-light-gray font-futura hover:text-green-500 transition"
                to="/awards"
              >
                競標與獲獎
              </Link>
            </nav>
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
        </main>
      </Router>
    </>
  );
}

export default App;
