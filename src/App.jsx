import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import React, { useState, useEffect } from 'react';

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const circlesRef = React.useRef([]);
  const handleTouchMove = (e) => {
    setCoords({ x: e.nativeEvent.touches[0].clientX, y: e.nativeEvent.touches[0].clientY });
  };
  useEffect(() => {
    const colors = [
      "#ffb56b",
      "#fdaf69",
      "#f89d63",
      "#f59761",
      "#ef865e",
      "#ec805d",
      "#e36e5c",
      "#df685c",
      "#d5585c",
      "#d1525c",
      "#c5415d",
      "#c03b5d",
      "#b22c5e",
      "#ac265e",
      "#9c155f",
      "#950f5f",
      "#830060",
      "#7c0060",
      "#680060",
      "#60005f",
      "#48005f",
      "#3d005e"
      ];
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    

    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener("cancel",e=>{
      console.log("Cancel")
    })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures that the effect runs only once, like componentDidMount
  function animateCircles() {
    const circles = circlesRef.current;
    let x = coords.x;
    let y = coords.y;
  
    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
  
      // Corrected the property name to 'transform' for scale
      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
  
      circle.x = x;
      circle.y = y;
  
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
  
    requestAnimationFrame(animateCircles);
  }
  useEffect(() => {
    animateCircles();
  }, [coords]);
  
  return (
    <Router>
    <div className={styles.App} onTouchMove={handleTouchMove}>
      {Array.from({ length: 18 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          className="circle"
          style={{
            width: '24px',
            height: '24px',
            position: "fixed",
            display: "block",
            borderRadius:"20px",
            pointerEvents:"none"
          }}
        ></div>
      ))}
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
    </Router>
  );
}

export default App;
