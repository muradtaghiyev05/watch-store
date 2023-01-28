import { watches } from '../../watches/data';
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import 'react-lazy-load-image-component/src/effects/blur.css'
import ProductCard from '../product-card/ProductCard';
import SearchFilter from '../filters/search-filter/SearchFilter';
import SortFilter from '../filters/sort-filter/SortFilter';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

const productsPerPage = 8;
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

const Products = () => {

    const { pathname, hash, key } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // search variables
    const searchText = searchParams.get('title') || '';
    const searchResults = [...watches].filter((product) => product.title.toLowerCase().includes(searchText.trim().toLowerCase()));

    // pagination variables
    const pageNumber = parseInt(searchParams.get('page')) || 0;
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(searchResults.length / productsPerPage);

    // sorting variables
    const currentSort = searchParams.get('sorting') || 'default';

    // changing page
    const changePage = ({ selected }) => {
        document.getElementById("products").scrollIntoView();
        setSearchParams({ ...Object.fromEntries([...searchParams]), page: selected })
    };

    useEffect(() => {
        if (hash === '') {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash, key]);

  return (
    <div className='products-page'>
        <Toaster
            position='bottom-left'
            toastOptions={{
                duration: 5000
            }}
        />
        <h1 className='products-page-title' id='products'>Brend Saatlarımız</h1>
        <SearchFilter searchText={searchText} searchParams={searchParams} setSearchParams={setSearchParams} />
        <SortFilter currentSort={currentSort} searchParams={searchParams} setSearchParams={setSearchParams} />
        {searchResults.length ? (
            <motion.div layout className='products-container'>
                {searchResults
                    .sort(sortTypes[currentSort].fn)
                    .slice(pagesVisited, pagesVisited + productsPerPage)
                    .map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
            </motion.div>
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
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    forcePage={pageNumber}
                    onPageChange={changePage}
                    containerClassName="pagination-buttons"
                    previousLinkClassName='previous-button'
                    nextLinkClassName='next-button'
                    disabledClassName='pagination-disabled'
                    activeClassName='pagination-active'
                />
            )}
      </div>
  )
}

export default Products