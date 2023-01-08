import { watches } from '../../watches/data';
import AddIcon from '../../assets/other-images/add-to-cart.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/cartRedux';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";
import ReactPaginate from 'react-paginate';

const Products = () => {

   // search variables
  const [searchText, setSearchText] = useState('');
  const searchResults = [...watches].filter((product) => product.title.toLowerCase().includes(searchText.trim().toLowerCase()));

  // pagination variables
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(searchResults.length / productsPerPage);

  // sorting variables
  const [currentSort, setCurrentSort] = useState('default');
  const sortTypes = {
    up: {
      fn: (a, b) => a.price - b.price
    },
    down: {
      fn: (a, b) => b.price - a.price
    },
    default: {
      fn: (a, b) => a
    }
  };

  // redux variables
  const products = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  // changing page
  const changePage = ({ selected }) => {
    document.getElementById("products").scrollIntoView();
    setPageNumber(selected);
  };

  // for adding product to redux
  const handleClick = (item) => {
    if (products.some(product => product.id === item.id)) return;
    dispatch(addProduct({ product: item, price: item.price, message: `${item.title} səbətə əlavə olundu!` }));
  };

  // sort products
  const handleSort = (e) => {
    setCurrentSort(e.target.value);
  };

  // search filter
  const searchFilter = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className='search-container'>
        <input
          type='text' 
          placeholder='İstədiyiniz modeli axtarın...'
          value={searchText}
          onChange={searchFilter}
          className='search-input' 
        />
      </div>
      <div className='sort-container'>
        <span>Filter:</span>
        <select defaultValue='default' onChange={handleSort}>
          <option value='default'>Ən Yeni</option>
          <option value='up'>Ucuzdan-Bahaya</option>
          <option value='down'>Bahadan-Ucuza</option>
        </select>
      </div>
      {searchResults.length ? (
        <div className='products-container con'>
          <Toaster
            position='bottom-left'
            toastOptions={{
              duration: 5000
            }}
          />
          {searchResults
            .sort(sortTypes[currentSort].fn)
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((item) => (
              <div key={item.id} className='card'>
                <Link to={`/product/${item.id}`} className="Link">
                  <div className='img-container'>
                    <img src={item.images.img1} alt='card' />
                  </div>
                  <h3 className='card-title'>{item.title}</h3>
                </Link>
                <div className='card-bottom'>
                  <span className='card-price'>
                    {item.discount ? (
                      <><span className='discount-price'>{item.price + item.discount} AZN</span> {item.price} AZN</>
                    ) : (
                      <>{item.price} AZN</>
                    )}
                  </span>
                  <button className='add-btn' onClick={() => handleClick(item)}>
                    <img src={AddIcon} alt='add' />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className='no-results'>
          Axtarışınıza uyğun nəticə tapılmadı
        </div>
      )}
      {searchResults.length !== 0
       && (
        <ReactPaginate
          previousLabel="Əvvəlki"
          nextLabel="Növbəti"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="pagination-buttons"
          previousLinkClassName='previous-button'
          nextLinkClassName='next-button'
          disabledClassName='pagination-disabled'
          activeClassName='pagination-active'
        />
      )}
    </>
  )
}

export default Products