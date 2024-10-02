import { useEffect } from "react";

const ScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector(".scroll-container");
      if (scrollContainer && window.scrollY > 100) {
        scrollContainer.classList.add("scrolled");
      } else if (scrollContainer) {
        scrollContainer.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default ScrollEffect;
