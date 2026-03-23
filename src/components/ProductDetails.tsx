import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { BsDot } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';

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

type ProductDetailsProps = {
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

function ProductDetails({ products, addToCart }: ProductDetailsProps) {

  const { id } = useParams<{ id: string }>();
  const productDetail = products.find(p => p.id === Number(id));
  const categoryName = products.find((p) => (p.name === productDetail?.name))

  return (
    <div className="product-details-page">
      <div className="product-details-page-wrapper">
        <div className="product-details-top-side">
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='product-details-top-side-button'>Home</div>
          </Link>
          <div><BsDot /></div>
          <Link to={`/categoryPage/${categoryName?.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='product-details-top-side-button'>
              {categoryName?.category}
            </div>
          </Link>
          <div><BsDot /></div>
          <div className='product-details-top-side-button'>{productDetail?.name}</div>
        </div>

        <div className="product-details-container">
          <div className="product-details-left-side">
            < img src={productDetail?.image} className='product-details-img' />
          </div>

          <div className="product-details-right-side">
            <div>
              <div className="product-details-name">{productDetail?.name}</div>
              <div className="product-details-price">${productDetail?.price}</div>
            </div>

            <div className="product-details-profile">
              <div className="product-profile">Product Profile</div>
              <div className="product-details-description">{productDetail?.description}</div>
            </div>

            {
              productDetail?.soldOut ? (
                <div className="product-details-sold-out-button">SOLD OUT</div>
              ) : (
                <div className="product-details-add-to-cart-button" onClick={() => {
                  if (productDetail) {
                    addToCart(productDetail);
                  }
                }}><IoMdCart /> Add To Cart</div>
              )
            }
          </div>

        </div>

        <div className="product-details-bottom-side">
          <div className="product-details-bottom-side-reviews-header">Reviews & Community</div>

          <div className="product-details-bottom-side-reviews-container">
            <div className='product-details-bottom-side-points'>{productDetail?.stars}</div>
            <div className='product-details-bottom-side-right'>
              <img className='product-details-bottom-side-stars-img' src={`images/stars/stars-${Math.round(Number(productDetail?.stars) * 2) * 5}.png`} />
              <div className='product-details-bottom-side-based-on'>based on {productDetail?.reviews} reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;