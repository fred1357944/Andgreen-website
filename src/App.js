import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import Slider from "react-slick";
import {useInView} from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Awards from "./components/Awards";
import "./styles.css"; // Tailwind CSS & Bootstrap should be configured

// Image assets
const images = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({x: event.clientX, y: event.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

// Home Page Component
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({duration: 1200});
  }, []);


  return (
    <div className="home-section">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen flex items-center justify-center" style={{backgroundImage: `url(${images[0]})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div data-aos="fade-up" className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-futura mb-4">綠亦有限公司</h1>
            <p className="text-xl lg:text-2xl font-morisawa mb-8">創新設計，綠色科技</p>
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura rounded-full">
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-4xl lg:text-5xl font-morisawa text-center text-light-gray mb-12" data-aos="fade-up">設計案例</h2>
        <Container>
          <Row>
            <Col>
              <Slider {...carouselSettings}>
                {images.map((image, index) => (
                  <div key={index} className="px-4">
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg object-cover" />
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl lg:text-4xl font-morisawa text-light-gray mb-6" data-aos="fade-up">我們的願景</h2>
        <p className="text-gray-600 font-morisawa text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          綠亦有限公司將自然與科技結合，設計創新產品，致力於提升城市空氣品質，推動可持續發展。
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-3xl lg:text-4xl font-futura text-light-gray mb-6" data-aos="fade-up">聯絡我們</h2>
        <p className="text-gray-600 mb-4 font-morisawa">歡迎通過 Email 聯絡我們: contact@andgreen.org</p>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-futura rounded-full" data-aos="fade-up" data-aos-delay="100">
          發送訊息
        </button>
      </section>
    </div>
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
            <h1 className="text-light-gray font-futura text-3xl">綠亦有限公司</h1>
            <nav className="flex space-x-6">
              <Link className="text-light-gray font-futura hover:text-green-500 transition" to="/">首頁</Link>
              <Link className="text-light-gray font-futura hover:text-green-500 transition" to="/news">最新動態</Link>
              <Link className="text-light-gray font-futura hover:text-green-500 transition" to="/projects">設計及項目</Link>
              <Link className="text-light-gray font-futura hover:text-green-500 transition" to="/careers">招聘訊息</Link>
              <Link className="text-light-gray font-futura hover:text-green-500 transition" to="/awards">競標與獲獎</Link>
            </nav>
          </div>
        </header>
        <main className="pt-20 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/awards" element={<Awards />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
