import './Category.css';
import HomePageListItems from '../data/home-page-list-items.json';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { BsDot } from "react-icons/bs";

type CategoryProps = {
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
  }[]
}

function Category({ products }: CategoryProps) {

  const { name } = useParams<{ name: string }>();
  const categoryProducts = products.filter(p => p.category === name);

  const categoryInfo = HomePageListItems.find(
    item => item.name === name
  );

  return (
    <div className='category-page'>

      <div className="category-page-navigation">
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='category-page-navigation-button'>Home</div>
        </Link>
        <div><BsDot /></div>
        <div className='category-page-navigation-button'>{name}</div>
      </div>

      <div className='category-page-header'>{name}</div>

      <div className="category-page-header-description">{categoryInfo?.description}</div>

      <div className="category-page-items">
        {
          categoryProducts.map((item) => {
            return (
              <div className="category-page-item" key={item.id}>
                <img src={item.image} className='category-page-item-image' />
                <div className="category-page-item-name">{item.name}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="category-page-item-stars"><FaStar style={{
                    color: 'rgb(255, 165, 0)',
                    width: '16px',
                    height: '16px'
                  }} />{item.stars}</div>
                  <div className="category-page-item-reviews">{item.reviews} reviews</div>
                </div>

                <Link to={`/productDetailsPage/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="view-details-button">View Details</div>
                </Link>
              </div>
            )
          })
        }
      </div>

    </div >
  )
}

export default Category;