import './OrderPage.css';
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function OrderPage() {

  const location = useLocation();

  const { formData, cartItems } = location.state || {};

  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  if (!formData || !cartItems) {
    return <div>No order found</div>;
  }

  return (
    <div className="order-page-wrapper">
      <div className="order-card">

        <h1 className="order-title"><FaCheckCircle /> Order Confirmed</h1>

        <div className="order-section">
          <h2>Customer Info</h2>
          <p><span>Name:</span> {formData.name} {formData.lastName}</p>
          <p><span>Email:</span> {formData.email}</p>
          <p><span>Phone:</span> {formData.phoneNumber}</p>
          <p><span>Address:</span> {formData.streetAddress}, {formData.city}</p>
        </div>

        <div className="order-section">
          <h2>Order Items</h2>

          <div className="order-items">
            {cartItems.map((item: any) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>

                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-total">
          Total: <span>${totalPrice.toFixed(2)}</span>
        </div>

        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="back-to-home-button">Back To Home</div>
        </Link>

      </div>
    </div>
  );
}

export default OrderPage;