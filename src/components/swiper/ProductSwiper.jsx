import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";

const ProductSwiper = ({ images }) => {

  return (
      <>
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            grabCursor={true}
            loop={true}
            navigation={true}
            breakpoints={{
                350: {
                    width: 350,
                    height: 350,
                    slidesPerView: 1
                },
                576: {
                    width: 450,
                    height: 450,
                    slidesPerView: 1
                }
            }}
            modules={[Navigation]}
            className='product-images-slider'
        >
            {Object.values(images).map((item, index) => (
                <SwiperSlide key={index}>
                    <img src={item} alt='product' />
                </SwiperSlide>
            ))}
        </Swiper>
      </>
  )
}

export default ProductSwiper