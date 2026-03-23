import './CartPage.css';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
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

interface CartItem extends Product {
  quantity: number;
}


type CartPageProps = {
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
  cartItems: CartItem[],
  increaseQuantity: (id: number) => void,
  decreaseQuantity: (id: number) => void,
  addToCart: (product: Product) => void,
  removeFromCart: (product: Product) => void
}

function CartPage({ products, cartItems, increaseQuantity, decreaseQuantity, addToCart, removeFromCart }: CartPageProps) {

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const deliveryCost = totalPrice >= 30 ? 0 : 4.99;

  const topReview6 = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  return (
    <div className='cart-page-wrapper'>

      <div className="cart-page-container">
        <div className="cart-page-header">
          <div className='cart-header-text-first'>Your Cart</div>
          <div className='cart-header-text-second'>Review Your Delicious Selections</div>
        </div>

        <div className="cart-page-content-top-side">
          <div className="cart-page-content-top-side-left">
            <div className="cart-page-content-top-side-left-header">
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'rgb(107, 37, 4)'
              }}>Product</div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '60px'
              }}>
                <div className='qntt' style={{
                  fontFamily: 'Handlee',
                  fontSize: '20px',
                  color: 'rgb(107, 37, 4)'
                }}>Quantity</div>
                <div className='ttl' style={{
                  fontFamily: 'Handlee',
                  fontSize: '20px',
                  color: 'rgb(107, 37, 4)'
                }}>Total</div>
              </div>
            </div>

            <div className="cart-page-content-top-side-left-items">
              {
                cartItems.map((cartItem) => {
                  return (
                    <div className="cart-item-container">
                      <div className="cart-item-left-side">
                        <div className="remove-button" onClick={
                          () => removeFromCart(cartItem)
                        }>X</div>
                        <img src={cartItem.image} className='cart-item-img' />
                        <div className="cart-item-left-side-descriptions">
                          <div style={{
                            fontFamily: 'Handlee',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: 'rgb(107, 37, 4)'
                          }}>{cartItem.name}</div>
                          <div style={{
                            fontFamily: 'Handlee',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: 'rgb(192, 73, 18)'
                          }}>${cartItem.price}</div>
                        </div>
                      </div>
                      <div className="cart-item-right-side">
                        <div className="cart-item-right-side-quantity">
                          <FiMinus style={{
                            cursor: 'pointer',
                            color: 'rgb(119, 51, 19)',
                          }} onClick={
                            () => decreaseQuantity(cartItem.id)
                          } />
                          <div style={{ padding: '0px 10px', fontFamily: 'Handlee' }}>{cartItem.quantity}</div>
                          < FiPlus style={{
                            cursor: 'pointer',
                            color: 'rgb(211, 88, 31)',
                          }} onClick={
                            () => increaseQuantity(cartItem.id)
                          } />
                        </div>
                        <div className="cart-item-total">${(cartItem.price * cartItem.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="cart-page-content-top-side-right">
            <div className="cart-summart-header">Cart Summary</div>
            <div className='cart-summary-row'>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(136, 77, 49)',
              }}  >Order Subtotal</div>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(87, 35, 11)',
                fontWeight: 'bold'
              }}>${totalPrice.toFixed(2)}</div>
            </div>
            <div className='cart-summary-row'>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(136, 77, 49)',
              }}  >Delivery</div>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(87, 35, 11)',
                fontWeight: 'bold'
              }}>${deliveryCost}</div>
            </div>
            <div className='cart-summary-row'>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(87, 35, 11)',
                fontWeight: 'bold'
              }}  >Total Cost</div>
              <div style={{
                fontFamily: 'Handlee',
                fontSize: '20px',
                color: 'rgb(87, 35, 11)',
                fontWeight: 'bold'
              }}>${(deliveryCost + totalPrice).toFixed(2)}</div>
            </div>

            <div className="checkout-button-wrapper">
              <Link to='/checkoutPage' style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className="proceed-to-checkout-button" disabled={cartItems.length < 1} style={{
                  backgroundColor: cartItems.length < 1 ? 'lightGrey' : '',
                  cursor: cartItems.length < 1 ? 'help' : 'pointer',
                }}>Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="cart-page-content-bottom-side">
          <div className="cart-page-content-bottom-side-header">You Might Also Like</div>

          <div className="recomended-items-container">
            {
              topReview6.map((item) => {
                return (
                  <div className="recomended-item">
                    <img className='recomended-item-img' src={item.image} />
                    <div className="recomended-item-content">
                      <div style={{
                        fontFamily: 'Handlee',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: ' rgb(107, 37, 4)'
                      }}>{item.name}</div>
                      <div style={{
                        fontFamily: 'Handlee',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: ' rgb(196, 72, 14)'
                      }}>${item.price}</div>
                    </div>
                    <div className="recomended-item-add-to-cart-button" onClick={
                      () => addToCart(item)
                    }>Add to Cart</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage;