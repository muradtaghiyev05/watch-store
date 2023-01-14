import { useEffect } from 'react'
import HomeImg from '../../assets/other-images/home-image.jpg'
import NewArrival from "../new-arrival/NewArrival";
import NewProducts from '../new-products/NewProducts'
import { Link } from "react-router-dom";

const Home = () => {

  useEffect(() => {
    const changePage = () => {
      window.scrollTo({ top: 0 });
    };
    changePage()
  }, []);

  return (
    <div className='home'>
        <div className='hero-container'>
            <img src={HomeImg} alt='hero' />
            <div className='hero-title'>ZÖVQÜNÜZƏ <br/> UYĞUN SAATLAR</div>
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