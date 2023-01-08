import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import Loading from './components/loading/Loading';

const Home = lazy(() => import('./components/home/Home'));
const About = lazy(() => import('./components/about/About'));
const Cart = lazy(() => import('./components/cart/Cart'));
const HowWorks = lazy(() => import('./components/how-works/HowWorks'));
const Product = lazy(() => import('./components/product/Product'));

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/how-works' element={<HowWorks />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
