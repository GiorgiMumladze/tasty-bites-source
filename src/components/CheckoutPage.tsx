import './CheckoutPage.css';
import { FaClock } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

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



type CheckoutPageProps = {
  cartItems: CartItem[],
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
  }>>,
  formData: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
  },
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

function CheckoutPage({ cartItems, formData, setFormData, setCartItems }: CheckoutPageProps) {

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryCost = totalPrice >= 30 ? 0 : 4.99;

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const orderData = {
      formData,
      cartItems
    };

    navigate('/orderPage', { state: orderData });

    setCartItems([]);

    setFormData({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: ""
    });
  }


  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-page-container">
        <div className="checkout-page-header">
          <div className='checkout-header-text-first'>Checkout</div>
          <div className='checkout-header-text-second'>Complete Your Order</div>
        </div>

        <div className="checkout-page-content">
          <div className="shipping-information-wrapper">
            <div className="shipping-information-header"><FaClock />Shipping Information</div>

            <form className="shipping-information-content" id='shipping-form' onSubmit={handleSubmit}>
              <div className="shipping-information-content-row">
                <div className="shipping-information-content-row-item">
                  <div className="input-name">First Name</div>
                  <input className='shipping-information-input'
                    placeholder='First Name'
                    type='text'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    name='name' />
                </div>

                <div className="shipping-information-content-row-item">
                  <div className="input-name">Last Name</div>
                  <input className='shipping-information-input'
                    placeholder='Last Name'
                    type='text'
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    name='lastName' />
                </div>
              </div>

              <div className="shipping-information-content-row">
                <div className="shipping-information-content-row-item">
                  <div className="input-name">Email</div>
                  <input className='shipping-information-input'
                    placeholder='Email'
                    type='text'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    name='email' />
                </div>

                <div className="shipping-information-content-row-item">
                  <div className="input-name">Phone Number</div>
                  <input className='shipping-information-input'
                    placeholder='Phone Number'
                    type='text'
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name='phoneNumber' />
                </div>
              </div>

              <div className="shipping-information-content-row">
                <div className="shipping-information-content-row-item">
                  <div className="input-name">Street Address</div>
                  <input className='shipping-information-input'
                    placeholder='Street Address'
                    type='text'
                    required
                    value={formData.streetAddress}
                    onChange={handleChange}
                    name='streetAddress' />
                </div>
                <div className="shipping-information-content-row-item">
                  <div className="input-name">City</div>
                  <input className='shipping-information-input'
                    placeholder='City'
                    type='text'
                    required
                    value={formData.city}
                    onChange={handleChange}
                    name='city' />
                </div>
              </div>

              <div className="cash-on-delivery"><BsCashCoin />Cash On Delivery (COD)</div>
            </form>
          </div>
          <div className="checkout-page-content-right-side">
            <div className="order-summary-wrapper">
              <div className="order-summary-header">Order Summary</div>

              <div className="order-summary-items-wrapper">
                {
                  cartItems.map((item) => {
                    return (
                      <div className="order-summary-item-container">
                        <div className="order-summary-item-container-left-side">
                          <img className='order-summary-item-img' src={item.image} />
                          <div className="order-summary-item-info">
                            <div style={{
                              fontFamily: 'Handlee',
                              fontSize: '18px',
                              fontWeight: 'bold',
                              color: 'rgb(107, 37, 4)'
                            }}><span style={{ color: 'rgb(219, 85, 18)', fontSize: '20px', marginRight: '6px' }}>{item.quantity}x</span> {item.name}</div>
                            <div style={{
                              fontFamily: 'Handlee',
                              fontSize: '16px',
                              color: 'rgb(163, 163, 163)'
                            }}>${item.price}</div>
                          </div>
                        </div>
                        <div style={{
                          fontFamily: 'Handlee',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)'
                        }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="order-summary-total-container">
              <div className="order-summary-total-container-header">
                Order Summary
              </div>

              <div className="order-summary-total-container-row">
                <div className="order-summary-total-container-text">Order Subtotal</div>
                <div className="order-summary-total-container-price">${(totalPrice).toFixed(2)}</div>
              </div>
              <div className="order-summary-total-container-row">
                <div className="order-summary-total-container-text">Delivery</div>
                <div className="order-summary-total-container-price">${deliveryCost}</div>
              </div>
              <div className="order-summary-total-container-row">
                <div className="order-summary-total-container-text-total">Total Cost</div>
                <div className="order-summary-total-container-price-total">${(totalPrice + deliveryCost).toFixed(2)}</div>
              </div>

              <button className="place-order-button" type='submit' form='shipping-form' disabled={cartItems.length < 1} style={{
                backgroundColor: cartItems.length < 1 ? 'lightGrey' : '',
                cursor: cartItems.length < 1 ? 'help' : 'pointer',
              }}>Place Order</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;