import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import ResultPage from './Pages/ResultPage';
import ProductPage from './Pages/ProductPage';
import{ Navbar }from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewImagePage from './Pages/ViewImagePage';
import DummyRunBottomSheets from './Pages/DummyRunBottomSheets';
import { CartProvider } from './Contexts/cartContext';
import CartPageProductTile from './Components/CartPageProductTile';
import CartPage from './Pages/CartPage';
import LabelWisePage from './Pages/LabelWisePage';
import DummyImageUpload from './Pages/DummyImageUpload';
import CheckoutPage from './Pages/CheckoutPage';
import ProductViewImagePage from './Pages/ProductViewImagePage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      {/* <Navbar></Navbar> */}
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/results" element={<ResultPage/>} />
          <Route path="/product-page/:sku" element={<ProductPage/>}></Route>
          <Route path='/image-search' element={<ViewImagePage/>}></Route>
          <Route path='/dummy' element={<DummyRunBottomSheets/>}></Route>
          <Route path='/my-cart' element={<CartPage></CartPage>}></Route>
          <Route path='/labels' element={<LabelWisePage></LabelWisePage>}></Route>
          {/**Testing*/}
          <Route path="product-tile" element={<CartPageProductTile></CartPageProductTile>}></Route>
          <Route path='/dummy-image-upload' element={<DummyImageUpload></DummyImageUpload>}></Route>
          <Route path='/checkout' element={<CheckoutPage></CheckoutPage>}></Route>
          <Route path='/image-searchy-wearchy' element={<ProductViewImagePage></ProductViewImagePage>}></Route>
        </Routes>
      </BrowserRouter>  
    </CartProvider>
  );
}

export default App;
