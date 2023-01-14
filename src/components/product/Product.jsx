import { useEffect, useState } from 'react'
import { watches } from '../../watches/data';
import { useParams } from 'react-router-dom';
import ProductSwiper from '../swiper/ProductSwiper';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { Toaster } from 'react-hot-toast';

const Product = () => {

  const [itemQuantity, setItemQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addProduct({
      id: item.id,
      product: item,
      quantity: itemQuantity,
      price: item.price,
      message: `${itemQuantity} ədəd ${item.title} səbətə əlavə olundu!`
    }));
  };

  useEffect(() => {
    const changePage = () => {
      window.scrollTo({ top: 0 });
    };
    changePage()
  }, []);

  return (
    watches.map((product) => (
      parseInt(params.id) === product.id && 
      <div key={product.id} className='product-page'>
        <Toaster
          position='bottom-left'
          toastOptions={{
            duration: 5000
          }}
        />
        <div className='product-page-container con'>
          <div className='swiper-container'>
            <ProductSwiper images={product.images} />
          </div>
          <div className='product-detail-container'>
            <h3>{product.title}</h3>
            <span className='product-price'>
              {product.discount ? (
                <><span className='discount-price'>{product.price + product.discount} AZN</span> {product.price} AZN</>
              ) : (
                <>{product.price} AZN</>
              )}
            </span>
            <div className='amount-container'>
              <select className='amount' value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value))}>
                {Array.from({ length: 30 }, (item, index) => item = index + 1).map(num => (
                  <option key={num}>{num}</option>
                ))}
              </select>
              <button className='add-to-cart-btn' onClick={() => handleClick(product)}>Səbətə At</button>
            </div>
            <span className='about-product-title'>Məhsul Haqqında</span>
            <p className='about-product-desc'>{product.desc}</p>
          </div>
        </div>
      </div>
    ))
  )
}

export default Product