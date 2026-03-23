import './OffersPage.css';
import offers from '../data/offers.json';
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

type OffersPageProps = {
  addToCart: (product: Product) => void
}

function OffersPage({ addToCart }: OffersPageProps) {


  return (
    <div className="offers-page-wrapper">
      <div className="offers-page-item-container">
        <div className="offers-page-header">
          <div className='header-text-first'>SPECIAL OFFERS & DEALS</div>
          <div className='header-text-second'>Irresistible Cravings, Unbeatable Prices!</div>
        </div>

        <div className="offers-page-content">

          {
            offers.map((offersItem) => {
              return (
                <div className="offers-page-content-item" key={offersItem.id}>
                  <div className="offers-page-content-item-header">{offersItem.name}</div>
                  <div className="offers-page-content-item-content">
                    <div className="offers-page-content-item-content-left-side">

                      <img className="offers-page-content-item-content-left-side-img" src={offersItem.image} />

                    </div>
                    <div className="offers-page-content-item-content-right-side">
                      <div className="offers-page-content-item-content-right-side-header">
                        {offersItem.description}
                      </div>
                      <div className="shop-bundle-button" onClick={
                        () => addToCart(offersItem)
                      }>SHOP BUNDLE</div>
                    </div>
                  </div>
                </div>
              )
            })
          }

          <div className="offers-page-content-limited-time-deals">
            <div className="offers-page-content-limited-time-deals-header">Limited Time Deals!</div>
            <div className='offers-page-content-limited-time-deals-bottom-container'>
              <div className="offers-page-content-limited-time-deals-left-side">
                <div className="sweet-deals-text">Sweet Deals!</div>
                <div className="up-to-text">Up to 30% Off</div>
              </div>
              <div className="offers-page-content-limited-time-deals-right-side">
                <Link to='/explorePage' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="order-now-button">ORDER NOW</div>
                </Link>
                <div className="order-now-button-text">* On select pastries and drinks for the next 48 hours.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersPage;