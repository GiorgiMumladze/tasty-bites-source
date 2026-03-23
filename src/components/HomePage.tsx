import './HomePage.css';
import HomePageListItems from '../data/home-page-list-items.json';
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

type HomePageProps = {
  products: {
    id: number
    category: string
    name: string
    image: string
    reviews: number
    stars: number
    price: number
    soldOut: boolean
    description: string
  }[],
  addToCart: (product: Product) => void
}

function HomePage({ products, addToCart }: HomePageProps) {

  const topReview5 = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const topReview10 = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 10);

  const topRated = [...products].sort((a, b) => b.stars - a.stars).slice(0, 3);

  const [viewAllPopularItems, setViewAllPopularItems] = useState(false);


  return (
    <div className='home-page'>

      <div className="welcome-div">
        <div className='welcome-text'>Welcome to TastyBite</div>
        <div className='under-welcome-text'>Delicious Treats & Culinary Delights</div>
        <Link to='/explorePage' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='shop-now-button'>Shop now</div>
        </Link>
      </div>

      <div className="home-page-list-container">
        {
          HomePageListItems.map((item) => {
            return (
              <Link key={item.id} to={`/categoryPage/${item.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div key={item.id} className='home-page-list-item'>
                  <img src={item.image} className='home-page-list-item-image' />
                  <div className="home-page-list-item-name">{item.name}</div>
                </div>
              </Link>
            )
          })
        }
      </div>

      <div className="home-page-popular-items-container">
        <div className="home-page-popular-items-header-container">
          <div className="popular-items-header">Popular Items</div>
          <div className="line"></div>
          <div className="view-all-button" onClick={
            () => setViewAllPopularItems(!viewAllPopularItems)
          }>View All
            {viewAllPopularItems ? <MdArrowDropDown style={{ color: 'rgb(107, 37, 4)', width: '24px', height: '24px' }} /> : <MdArrowDropUp style={{ color: 'rgb(107, 37, 4)', width: '24px', height: '24px' }} />}
          </div>
        </div>

        <div className="home-page-popular-items">
          {!viewAllPopularItems
            ? topReview5.map((item) => (
              <div key={item.id} className="home-page-popular-item">
                <img src={item.image} className="top-rated-item-image" />
                <div className="top-rated-item-info">
                  <div className="top-rated-item-name">{item.name}</div>
                  <div className="top-rated-item-price">
                    ${(item.price).toFixed(2)}
                  </div>
                </div>
                <div className="top-rated-item-add-to-cart-button" onClick={
                  () => addToCart(item)
                }>Add to Cart</div>
              </div>
            ))
            : topReview10.map((item) => (
              <div key={item.id} className="home-page-popular-item">
                <img src={item.image} className="top-rated-item-image" />
                <div className="top-rated-item-info">
                  <div className="top-rated-item-name">{item.name}</div>
                  <div className="top-rated-item-price">
                    ${(item.price).toFixed(2)}
                  </div>
                </div>
                <div className="top-rated-item-add-to-cart-button" onClick={
                  () => addToCart(item)
                }>Add to Cart</div>
              </div>
            ))}
        </div>
      </div>

      <div className="sweet-deals-container">
        <div className='sweet-deals-container-content'>
          <div className="sweet-deals-header">Sweet Deals!</div>
          <div className="sweet-deals-deal">Up to 30% Off</div>
          <Link to='/offersPage' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sweet-deals-shop-deals-button">Shop Deals</div>
          </Link>
        </div>
      </div>

      <div className="customer-favorites-container">
        <div className="home-customer-favorites-items-header-container">
          <div className="customer-favorites-header">Customer Favorites</div>
          <div className="line"></div>
        </div>

        <div className="customer-favorites-items">
          {topRated.map((item) => (
            <div key={item.id} className="home-customer-favorite-item">
              <img src={item.image} className="home-customer-favorite-item-image" />
              <div className="home-customer-favorite-item-info">
                <div className="home-customer-favorite-item-name">{item.name}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default HomePage;