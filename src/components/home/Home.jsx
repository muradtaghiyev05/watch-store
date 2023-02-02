import { useEffect } from 'react'
import HomeImg from '../../assets/other-images/home-image.webp'
import NewArrival from "../new-arrival/NewArrival";
import NewProducts from '../new-products/NewProducts'
import { Link, useLocation } from "react-router-dom";

const Home = () => {

  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <div className='home'>
        <div className='hero-container'>
            <img src={HomeImg} alt='hero' />
            <div className="hero-info">
                <h2>Hər Zövqə Uyğun</h2>
                <Link to={`/products`}><button className="hero-btn">Bütün Saatlar</button></Link>
            </div>
        </div>
        <div className="new-arrival-container con">
          <NewArrival />
        </div>
        <div className="new-products-container">
          <h1>Yeni Gələn Saatlar</h1>
          <NewProducts />
          <Link to='/products' className="all-link Link">Bütün Məhsullar</Link>
        </div>
    </div>
  )
}

export default Home