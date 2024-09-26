import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Awards from "./components/Awards";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>綠亦有限公司</h1>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/">首頁</Link>
              </li>
              <li>
                <Link to="/news">最新動態</Link>
              </li>
              <li>
                <Link to="/projects">設計及項目</Link>
              </li>
              <li>
                <Link to="/careers">招聘訊息</Link>
              </li>
              <li>
                <Link to="/awards">競標與獲獎</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/awards" element={<Awards />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <section className="home-section">
      <h2>歡迎來到綠亦有限公司</h2>
      <p>請選擇上方的頁面來了解更多。</p>
    </section>
  );
}

export default App;
