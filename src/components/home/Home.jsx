import React, { useEffect } from 'react'
import HomeImg from '../../assets/other-images/home-image.jpg'
import Products from '../products/Products'

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
        <div className='products-part'>
          <h1 id='products'>Brend Saatlar</h1>
          <Products />
        </div>
    </div>
  )
}

export default Home