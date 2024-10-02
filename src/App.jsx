import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import News from "./components/News.jsx";
import Projects from "./components/Projects.jsx";
import Careers from "./components/Careers.jsx";
import Awards from "./components/Awards.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SocialIcons from "./components/SocialIcons";
import Loading from "./components/Loading";
import BackgroundEffect from "./components/BackgroundEffect";
import "./App.css"; // 調整後的 css 放這裡
import ScrollEffect from "./components/ScrollEffect"; // 引入 ScrollEffect

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
        backgroundColor: "#06d6a0",
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
    <div className="snap-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="snap-section home-section"
      >
        <BackgroundEffect />
        <section className="relative bg-cover bg-center flex items-center justify-center">
          <div className="absolute inset-0 bg-green bg-opacity-50 flex items-center justify-between p-1">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ marginBottom: "10px" }} // 增加margin-bottom
              className="text-left text-black"
            >
              <h1 className="text-7xl mx-2 font-futura-bt my-5"> 綠亦</h1>
              <p className="text-lg mx-2"> 創新設計・綠色科技</p>
            </motion.div>
          </div>
          {/* Navigation links */}
          <nav>
            <Link
              to="/news"
              className="text-black mx-2 text-lg hover:text-gray-300 transition"
            >
              &nbsp;&nbsp;最新動態 &nbsp;&nbsp;
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

      {/* Slider Section 包裹在一個獨立的 snap-section 中 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="snap-section"
      >
        <section
          className="py-20 flex justify-center items-center"
          style={{ minHeight: "80vh" }}
        >
          <Container fluid>
            <Row className="justify-content-center ">
              <Col md={10}>
                <Slider
                  {...carouselSettings}
                  dots={true}
                  infinite={true}
                  autoplay={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  centerMode={true}
                  centerPadding="0"
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
                          className="w-full mx-auto object-cover rounded-lg"
                          style={{
                            height: "100%",
                            maxHeight: "800px",
                            objectFit: "contain",
                            borderRadius: "1rem",
                          }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
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

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CustomCursor />
          <Router>
            <div className="scroll-container">
              <header>
                <div>
                  <h1 className="text-black font-futura-bt text-2xl bg-transparent ">
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
            </div>
            {/* 這裡應確保 div 標籤正確閉合 */}
          </Router>
        </>
      )}
    </>
  );
}

export default App;
