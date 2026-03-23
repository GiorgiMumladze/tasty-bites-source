import './App.css'
import HomePage from './components/HomePage';
import Category from './components/Category';
import ExplorePage from './components/ExplorePage';
import ProductDetails from './components/ProductDetails';
import AboutPage from './components/AboutPage';
import OffersPage from './components/OffersPage';
import { Routes, Route } from 'react-router-dom';
import products from './data/products.json';
import CartPage from './components/CartPage';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckoutPage from './components/CheckoutPage';
import OrderPage from './components/OrderPage';

// change website tab icon

interface Product {
  id: number;
  category: string;
  name: string;
  image: string;
  reviews: number;
  stars: number;
  price: number;
  soldOut: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}


function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: ''
  });

  function addToCart(product: Product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(product: Product) {
    setCartItems(prev =>
      prev.filter(item => item.id !== product.id)
    )
  }

  function increaseQuantity(id: number) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id: number) {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // removes if 0
    );
  }

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Routes>
        <Route index element={
          <HomePage products={products} addToCart={addToCart} />
        } />
        <Route path='categoryPage/:name' element={
          <Category products={products} />
        } />

        <Route path='explorePage' element={
          <ExplorePage products={products} addToCart={addToCart} />
        } />

        <Route path='productDetailsPage/:id' element={
          <ProductDetails products={products} addToCart={addToCart} />
        } />

        <Route path='aboutUsPage' element={
          <AboutPage />
        } />

        <Route path='offersPage' element={
          <OffersPage addToCart={addToCart} />
        } />

        <Route path='cartPage' element={
          <CartPage
            products={products}
            cartItems={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            addToCart={addToCart}
            removeFromCart={removeFromCart} />
        } />
        <Route path='checkoutPage' element={
          <CheckoutPage cartItems={cartItems} formData={formData} setFormData={setFormData} setCartItems={setCartItems} />
        } />
        <Route path='orderPage' element={
          <OrderPage />
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
