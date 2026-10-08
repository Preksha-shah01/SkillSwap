import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App(){
  return <div className="page">
    <div className="container">
      <header className="nav">
        <div className="brand"><div className="logo">↔</div><span>SkillSwap</span></div>
        <nav className="nav-links"><a href="#">Home</a><a href="#">How it works</a><a href="#">About us</a></nav>
        <div className="nav-actions"><a className="btn-outline" href="#">Log in</a><a className="btn-outline" href="#">Sign up</a></div>
      </header>

      <main className="hero">
        <section>
          <div className="badge">Made for campus</div>
          <h1>Learn by<br/>Teaching. <span className="gradient">Grow<br/>by Sharing.</span></h1>
          <p className="sub">Exchange skills, share knowledge, earn rewards<br className="desktop"/> and build your future together.</p>
          <a className="cta" href="#">Get started</a>
          <div className="features">
            <span className="feature">Verified students only</span>
            <span className="feature">Free to join</span>
            <span className="feature">Earn rewards</span>
          </div>
        </section>

        <section className="visual">
          <img className="hero-img" src="/hero-students.jpg" alt="Students learning together"/>
        </section>
      </main>

      <section className="stats">
        <div className="stat"><strong>10K+</strong><span>Students</span></div>
        <div className="stat"><strong>500+</strong><span>Universities</span></div>
        <div className="stat"><strong>50K+</strong><span>Skill exchanges</span></div>
        <div className="stat"><strong>100K+</strong><span>Hours shared</span></div>
      </section>
    </div>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);