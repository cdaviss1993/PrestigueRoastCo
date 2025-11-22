import { Link } from 'react-router-dom';
import './Home.css';
import bg from '../assets/imgs/PrestigeHomeBackground.png';

export default function Home() {
  return (
    <main
      className="home-bg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
      aria-label="Prestige Roast Co. hero"
    >
      <div className="home-content">
        <h1 className="home-title">Welcome to Prestige Roast Co.</h1>
        <p className="home-desc">
          Discover our exclusive coffee blends and enjoy a premium roasting experience.
        </p>
        <div className="home-cta">
          <Link to="/shop" className="cta-btn" aria-label="Shop now">Shop Now</Link>
        </div>
      </div>
    </main>
  );
}