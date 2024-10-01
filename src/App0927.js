import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Slider from "react-slick";
import {AnimatePresence, motion} from "framer-motion";
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Awards from "./components/Awards";
import LocomotiveScroll from "locomotive-scroll";
import "./styles.css"; // Tailwind CSS & Bootstrap should be configured
import {useScroll, useTransform} from "framer-motion";

// Sample images for the slider
const images = [
  {url: "/images/slide1.jpg", alt: "Slide 1"},
  {url: "/images/slide2.jpg", alt: "Slide 2"},
  {url: "/images/slide3.jpg", alt: "Slide 3"},
];

// Custom Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800, // 增加速度過渡到 800ms
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000, // 將圖片自動切換的時間拉長到 4 秒
  arrows: true,
};

// Custom Cursor Component
function CustomCursor() {
  return <div className="custom-cursor" />;
}

// 使用 Locomotive Scroll 的滾動效果
function useLocoScroll() {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });
    return () => {
      scroll.destroy();
    };
  }, []);
}

// 滑動面板
function SlidingPane() {
  return (
    <motion.div
      initial={{x: "-100vw"}}
      animate={{x: 0}}
      exit={{x: "-100vw"}}
      transition={{type: "spring", stiffness: 120, damping: 20}}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white w-full md:w-80 h-full shadow-lg p-8">
        <h3>滑動面板標題</h3>
        <p>這是一個滑動面板的內容，可以包含各種訊息和按鈕。</p>
      </div>
    </motion.div>
  );
}

// 背景顏色隨滾動變化
function ScrollBackground() {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setBgColor("#06d6a0"); // 綠色背景
      } else {
        setBgColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div style={{backgroundColor: bgColor}}>
      {/* Your content here */}
    </motion.div>
  );
}

// 滾動圖片縮放
function ScrollImage() {
  const {scrollYProgress} = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <motion.div style={{scale}}>
      <img src={`${process.env.PUBLIC_URL}/images/hero1.jpg`} alt="example" />
    </motion.div>
  );
}

// Home Page Component
function Home() {
  useLocoScroll(); // 啟用 Locomotive Scroll

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.8}}
      className="home-section"
      data-scroll-container
    >
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{backgroundImage: `url(${images[0].url})`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.3, duration: 1}}
            className="text-center text-white"
          >
            <h1 className="text-7xl font-futura">綠亦有限公司</h1>
            <p className="text-lg mt-4">創新設計，綠色科技</p>
            <motion.button
              className="px-8 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura rounded-full"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#06d6a0",
                transition: {duration: 0.3},
              }}
              whileTap={{scale: 0.95}}
            >
              點擊我
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 設計案例 */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl lg:text-5xl font-morisawa mb-12">設計案例</h2>
        <Container>
          <Row className="flex justify-center">
            <Col>
              <Slider {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="slider-image w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-100">
        <div className="grid-layout">
          <div className="grid-item">
            <img src="/images/project1.jpg" alt="Project 1" />
            <h3>Project 1</h3>
          </div>
          <div className="grid-item">
            <img src="/images/project2.jpg" alt="Project 2" />
            <h3>Project 2</h3>
          </div>
          {/* More grid items */}
        </div>
      </section>

      {/* Sliding Pane Section */}
      <SlidingPane />

      {/* Information Section */}
      <section className="gradient-bg-dark py-16 text-center">
        <h2 className="text-3xl lg:text-4xl text-white" data-aos="fade-up">
          我們的願景
        </h2>
        <p
          className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          綠亦有限公司將自然與科技結合，設計創新產品，致力於提升城市空氣品質，推動可持續發展。
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center bg-gray-100">
        <h2
          className="text-3xl lg:text-4xl font-futura-bt text-light-gray mb-6"
          data-aos="fade-up"
        >
          聯絡我們
        </h2>
        <p className="text-gray-600 mb-4 font-morisawa">
          歡迎通過 Email 聯絡我們: contact@andgreen.org
        </p>
        <motion.button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura-bt rounded-full"
          data-aos="fade-up"
          data-aos-delay="100"
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
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
            <h1 className="text-3xl font-futura-bt">綠亦有限公司</h1>
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
