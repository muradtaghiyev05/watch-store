import EmptyBag from '../../assets/other-images/empty-bag.svg'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { addProduct, removeProduct, removeQuantity } from '../../redux/cartRedux'
import { Toaster } from 'react-hot-toast'

const discount = 25;
const delivery = 3;

const Cart = () => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // for removing quantity
  const removeItem = (item) => {
    dispatch(removeQuantity({
      id: item.id,
      price: item.price,
      message: `1 ədəd ${item.title} səbətdən silindi!`
    }));
  };

  // for adding quantity
  const addItem = (item) => {
    dispatch(addProduct({
      id: item.id,
      quantity: 1,
      price: item.price,
      message: `1 ədəd ${item.title} səbətə əlavə olundu!`
    }));
  };

  // for removing product
  const handleRemove = (item) => {
    dispatch(removeProduct({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      message: `${item.title} səbətdən silindi!`
    }));
  };

  // for whatsapp payment
  const handlePayment = () => {

    const products = cart.products;
    const total = cart.total;
    let productsText = 'Salam, mən ';
    products.map((product, index) => {
      productsText += `${product.quantity} ədəd ${product.title}`;
      if (index !== products.length - 1) {
        productsText += ', '
      };
    });
    productsText += ` sifariş etmək istəyirəm.%0AToplam Məbləğ: ${total - discount} AZN%0AÇatdırılma: ${delivery} AZN`;
    
    window.open(`https://wa.me/994553600600?text=${productsText}`);
  };

  useEffect(() => {
    const changePage = () => {
      window.scrollTo({ top: 0 });
    };
    changePage()
  }, []);

  return (
    <div className='bag'>
      <h1 className='bag-title'>Alış-Veriş Səbətiniz</h1>
      <Toaster
        position='bottom-left'
        toastOptions={{
          duration: 5000
        }}
      />
      {cart.quantity === 0 ? (
        <div className='empty-bag-container'>
          <div className='empty-bag'>
            <span className='empty-title'>Təəssüf ki, səbətiniz boşdur.</span>
            <img src={EmptyBag} alt='empty-bag' className='empty-img' />
          </div>
          <Link to='/products' className='Link'><button className='continue-btn'>Almağa davam et</button></Link>
        </div>
      ) : (
      <div className='bag-container'>
        <div className='top-container'>
          <Link to='/products' className='Link'><button className='left-btn'>Almağa davam et</button></Link>
          <span className='top-title'>Alışveriş Səbəti ({cart.quantity})</span>
          <button className='right-btn' onClick={handlePayment}>Ödəniş Et</button>
        </div>
        <div className='bottom-container'>
          <div className='info-container'>
            {cart.products.map((product) => (
              product.quantity !== 0 && 
                <div key={product.id} className='product-container'>
                  <div className='detail-container'>
                    <Link to={`/product/${product.id}`}>
                      <div className='img-container'>
                        <img src={product.images.img1} />
                      </div>
                    </Link>
                    <div className='details'>
                      <span className='detail-span'><b>Məhsul:</b> {product.title}</span>
                      <span className='detail-span'><b>Qiyməti:</b> {product.price} AZN</span>
                      <button className='remove-product-btn' onClick={() => handleRemove(product)}>Səbətdən Sil</button>
                    </div>
                  </div>
                  <div className='price-container'>
                    <div className='amount-container'>
                      <button className='sm-btn' onClick={() => removeItem(product)}>-</button>
                      <span className='amount'>{product.quantity}</span>
                      <button className='sm-btn' onClick={() => addItem(product)}>+</button>
                    </div>
                    <div className='total-price'>
                      <span className='detail-span' id='subtotal'><b>Ümumi:</b> {product.price * product.quantity} AZN</span>
                    </div>
                  </div>
                </div>
              ))}
          <hr />
          </div>
          <div className='summary-container'>
            <h2 className='summary-title'>Hesabat</h2>
            <div className='summary-item'>
              <span className='summary-item-title'>Ümumi Məbləğ</span>
              <span className='summary-item-price'>{cart.total} AZN</span>
            </div>
            <div className='summary-item'>
              <span className='summary-item-title'>Endirim</span>
              <span className='summary-item-price'>-{discount} AZN</span>
            </div>
            <div className='summary-item'>
              <span className='summary-item-title'>Çatdırılma</span>
              <span className='summary-item-price'>{delivery} AZN</span>
            </div>
            <div className='summary-item'>
              <span className='summary-item-title total'>Toplam Məbləğ</span>
              <span className='summary-item-price total'>{cart.total - discount + delivery} AZN</span>
            </div>
            <button className='summary-btn' onClick={handlePayment}>Ödəniş Et</button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Cart