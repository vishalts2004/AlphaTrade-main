import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <video className="hero-video" autoPlay muted loop>
          <source src="/videos/Untitled video - Made with Clipchamp.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to AlphaTrade</h1>
          <p className="hero-subtitle">Your gateway to seamless stock trading.</p>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-time Data</h3>
            <p>Get up-to-the-minute stock prices and trends.</p>
          </div>
          <div className="feature-card">
            <h3>Advanced Analytics</h3>
            <p>Make informed decisions with powerful analytics tools.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>Trade with confidence using our secure platform.</p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2 className="section-title">Why Choose Us?</h2>
        <ul className="benefits-list">
          <li>Intuitive user interface</li>
          <li>24/7 customer support</li>
          <li>Low trading fees</li>
        </ul>
      </section>

      <section className="success-stories">
        <h2 className="section-title">Success Stories</h2>
        <div className="story-cards">
          <div className="story-card">
            <h3>Gopal's Journey</h3>
            <p>Gopal turned his small savings into a substantial portfolio using AlphaTrade's intuitive platform and advanced analytics.</p>
          </div>
          <div className="story-card">
            <h3>Aswanth's Strategy</h3>
            <p>Aswanth leveraged our real-time data to make timely trades, boosting his investment returns significantly.</p>
          </div>
          <div className="story-card">
            <h3>Gokul's Milestone</h3>
            <p>Midhun achieved his financial goals faster with AlphaTrade's low fees and reliable customer support.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial">
            <p>"AlphaTrade's real-time data and analytics tools are unmatched. Highly recommend!"</p>
            <span>- Selvaraj</span>
          </div>
          <div className="testimonial">
            <p>"The platform's security features and customer support make trading stress-free."</p>
            <span>- Gautam</span>
          </div>
          <div className="testimonial">
            <p>"AlphaTrade has transformed my trading experience. The user interface is incredibly intuitive."</p>
            <span>- Harish</span>
          </div>
          <div className="testimonial">
            <p>"Their trading algorithms have significantly improved my trading strategies."</p>
            <span>- Kenny</span>
          </div>
          <div className="testimonial">
            <p>"The intuitive platform and advanced tools have boosted my investment returns."</p>
            <span>- Gokul</span>
          </div>
          <div className="testimonial">
            <p>"Trading with AlphaTrade is seamless and rewarding."</p>
            <span>-Yashwanth</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
