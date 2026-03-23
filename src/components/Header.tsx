import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '/images/header-logo.png';
import cartIcon from '/images/cart-icon.png';
import { IoMenu } from "react-icons/io5";
import { useState, useEffect, useRef } from 'react';

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


type HeaderProps = {
  cartItems: CartItem[]
}

function Header({ cartItems }: HeaderProps) {

  const ref = useRef<HTMLDivElement | null>(null);

  const [smallScreenToggle, setSmallScreenToggle] = useState(false);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSmallScreenToggle(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div className='header'>
      <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='header-logo'>
          <img src={headerLogo} className='header-logo-img' />
        </div>
      </Link>

      <div className='header-list'>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="header-list-item">Home</div>
        </Link>

        <Link to='/explorePage' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="header-list-item">Menu</div>
        </Link>

        <Link to='/offersPage' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="header-list-item">Offers</div>
        </Link>

        <Link to='/aboutUsPage' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="header-list-item">About</div>
        </Link>
      </div>

      <div className="header-list-smaller-screen">
        <IoMenu className="header-list-smaller-screen-toggle" onClick={
          () => setSmallScreenToggle(!smallScreenToggle)
        } />
        {smallScreenToggle &&
          <div className="header-list-smaller-screen-container" ref={ref}>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-list-item-small">Home</div>
            </Link>

            <Link to='/explorePage' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-list-item-small">Menu</div>
            </Link>

            <Link to='/offersPage' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-list-item-small">Offers</div>
            </Link>

            <Link to='/aboutUsPage' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="header-list-item-small">About</div>
            </Link>
          </div>
        }
      </div>



      <div className="header-right-side">

        <Link to='/cartPage' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cart-icon-container">
            <img src={cartIcon} className='cart-icon' />
            <div className="cart-item-quantity" style={{
              display: cartItems.length === 0 ? 'none' : 'block'
            }}>{totalQuantity}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header;