import './ExplorePage.css';
import { BsDot } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef, useEffect } from 'react';
import { IoMdCart } from "react-icons/io";

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

type ExplorePageProps = {
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
  addToCart: (product: Product) => void,
}

function ExplorePage({ products, addToCart }: ExplorePageProps) {

  //clicking outside sort
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Featured');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSelectionOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  // filtering products with categories and prices :))
  let filteredProducts = [...products];
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }
  if (priceFilter) {
    filteredProducts = filteredProducts.filter(product => product.price <= priceFilter);
  }

  // filtering products with the selected option in the dropdown menu :))
  let sortedProducts = [...filteredProducts];
  if (selectedOption === 'Price: Low to High') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (selectedOption === 'Price: High to Low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (selectedOption === 'Best Selling') {
    sortedProducts.sort((a, b) => b.stars - a.stars);
  }


  // pagination <3 love this idk why...
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);


  const [advancedFiltering, setAdvancedFiltering] = useState(false);

  return (
    <div className='explore-page'>

      <div className="explore-page-background-image"></div>

      <div className="explore-page-wrapper">
        <div className="explore-page-left-side-wrapper">

          <div className="explore-page-left-side">
            <div className="explore-page-coordination">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='explore-page-coordination-button'>Home</div>
              </Link>
              <BsDot size={20} />
              <div className='explore-page-coordination-button'>All Products</div>
            </div>
            <div className="advanced-filter-button" onClick={
              () => setAdvancedFiltering(!advancedFiltering)
            }>Advanced Filtering</div>

            {
              advancedFiltering &&
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px'
              }}>
                <div className="explore-page-left-side-categories">
                  <div className="categories-header">Categories</div>
                  <div className="categories-list">
                    <div className="category" onClick={
                      () => setTempCategory('Desserts')
                    }
                      style={
                        tempCategory === 'Desserts' ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Desserts</div>

                    <div className="category-line"></div>
                    <div className="category" onClick={
                      () => setTempCategory('Coffee')
                    }
                      style={
                        tempCategory === 'Coffee' ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Coffee</div>

                    <div className="category-line"></div>
                    <div className="category" onClick={
                      () => setTempCategory('Drinks')
                    }
                      style={
                        tempCategory === 'Drinks' ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Drinks</div>

                    <div className="category-line"></div>
                    <div className="category" onClick={
                      () => setTempCategory('Pastries')
                    }
                      style={
                        tempCategory === 'Pastries' ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Pastries</div>

                    <div className="category-line"></div>
                    <div className="category" onClick={
                      () => setTempCategory('Hot-beverages')
                    }
                      style={
                        tempCategory === 'Hot-beverages' ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Hot Beverages</div>
                  </div>
                </div>

                <div className="explore-page-price-by-price">
                  <div className="price-by-price-header">Price by Price</div>
                  <div className="price-by-price-list">
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(3)
                    }
                      style={
                        tempPrice === 3 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $3</div>

                    <div className="price-by-price-line"></div>
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(4)
                    }
                      style={
                        tempPrice === 4 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $4</div>

                    <div className="price-by-price-line"></div>
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(5)
                    }
                      style={
                        tempPrice === 5 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $5</div>

                    <div className="price-by-price-line"></div>
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(6)
                    }
                      style={
                        tempPrice === 6 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $6</div>

                    <div className="price-by-price-line"></div>
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(7)
                    }
                      style={
                        tempPrice === 7 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $7</div>

                    <div className="price-by-price-line"></div>
                    <div className="price-by-price-item" onClick={
                      () => setTempPrice(8)
                    }
                      style={
                        tempPrice === 8 ? {
                          fontWeight: 'bold',
                          color: 'rgb(107, 37, 4)',
                          backgroundColor: 'rgba(107, 37, 4, 0.1)'
                        } : {}
                      }>Under $8</div>
                  </div>
                </div>

                <div className="explore-page-left-side-buttons-wrapper">
                  <div className="explore-page-left-side-buttons-container">
                    <div className="explore-page-left-side-filter-button" onClick={
                      () => {
                        setCategoryFilter(tempCategory);
                        setPriceFilter(tempPrice);
                        setCurrentPage(1);
                      }
                    }>Filter</div>
                    <div className="explore-page-left-side-clear-button" onClick={
                      () => {
                        setTempCategory(null);
                        setTempPrice(null);
                        setCategoryFilter(null);
                        setPriceFilter(null);
                        setCurrentPage(1);
                      }
                    }>Clear</div>
                  </div>
                  <div className="explore-page-left-side-reset-container">
                    <div className="dots">
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                      <HiOutlineDotsHorizontal style={{ color: 'rgb(107, 37, 4)' }} />
                    </div>
                    <div className="explore-page-left-side-reset-button" onClick={
                      () => {
                        setTempCategory(null);
                        setTempPrice(null);
                        setCategoryFilter(null);
                        setPriceFilter(null);
                        setSelectedOption('Featured');
                        setCurrentPage(1);
                      }
                    }>Reset</div>
                  </div>
                </div>

                <div className="explore-page-left-side-sweet-deals">
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Handlee',
                  }}>Sweet Deals!</div>
                  <div style={{
                    fontSize: '18px',
                    color: 'white',
                  }}>Up to 30% Off</div>
                  <Link to='/offersPage' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="explore-page-left-side-sweet-deals-shop-deals-button">Shop Deals</div>
                  </Link>
                </div>

              </div>
            }
          </div>

        </div>

        <div className="explore-page-right-side-wrapper">
          <div className="explore-page-right-side-header">All Products</div>

          <div className="explore-page-right-side-header-sort-wrapper">
            <div>Sort by</div>

            <div className="explore-page-right-side-selection-featured" ref={dropdownRef}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '8px',
                padding: '6px 30px',
              }} onClick={
                () => setIsSelectionOpen(!isSelectionOpen)
              }>{selectedOption} <IoIosArrowDown /></div>
              {
                isSelectionOpen &&
                <div className="explore-page-right-side-selection-container">
                  <div className="explore-page-right-side-selection-item" onClick={
                    () => {
                      setSelectedOption('Featured');
                      setIsSelectionOpen(false);
                      setCurrentPage(1);
                    }
                  }>
                    Featured
                  </div>
                  <div className="selection-line"></div>
                  <div className="explore-page-right-side-selection-item" onClick={
                    () => {
                      setSelectedOption('Price: Low to High');
                      setIsSelectionOpen(false);
                      setCurrentPage(1);
                    }
                  }>
                    Price: Low to High
                  </div>
                  <div className="selection-line"></div>
                  <div className="explore-page-right-side-selection-item" onClick={
                    () => {
                      setSelectedOption('Price: High to Low');
                      setIsSelectionOpen(false);
                      setCurrentPage(1);
                    }
                  }>
                    Price: High to Low
                  </div>
                  <div className="selection-line"></div>
                  <div className="explore-page-right-side-selection-item" onClick={
                    () => {
                      setSelectedOption('Best Selling');
                      setIsSelectionOpen(false);
                      setCurrentPage(1);
                    }
                  }>
                    Best Selling
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="explore-page-right-side-items-wrapper">
            {
              currentProducts.map((product) => {
                const starValue = Math.round(product.stars * 2) * 5;
                return (
                  <div key={product.id} className="explore-page-right-side-item">
                    <div className="explore-page-right-side-item-image">
                      <img className='explore-page-right-side-item-image-img' src={product.image} />
                    </div>
                    <div className="explore-page-right-side-item-name">{product.name}</div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      columnGap: '6px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <img className='explore-page-right-side-item-stars-img' src={`images/stars/stars-${starValue}.png`} />
                      </div>
                      <div style={{
                        color: 'rgb(107, 37, 4)',
                        fontFamily: 'Handlee',
                        fontSize: '16px'
                      }}>({product.reviews})</div>
                    </div>
                    <div className="explore-page-right-side-item-price">${(product.price)}</div>


                    {
                      product.soldOut ? (
                        <div className="explore-page-right-side-item-sold-out">SOLD OUT</div>
                      ) : (
                        <div className="explore-page-right-side-item-add-to-cart-button" onClick={
                          () => addToCart(product)
                        }><IoMdCart /> Add To Cart</div>
                      )
                    }

                  </div>
                )
              })
            }
          </div>

          <div className="explore-page-right-side-paginator-wrapper">
            <div className="explore-page-right-side-paginator-pages">
              {
                [...Array(totalPages)].map((_, index) => {
                  return (
                    <div style={{
                      fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                      color: currentPage === index + 1 ? 'rgb(107, 37, 4)' : 'inherit',
                      backgroundColor: currentPage === index + 1 ? 'rgba(107, 37, 4, 0.1)' : 'transparent',
                      cursor: 'pointer',
                    }} key={index} className="explore-page-right-side-paginator-page" onClick={
                      () => {
                        setCurrentPage(index + 1)
                      }
                    }>{index + 1}</div>
                  )
                })
              }
            </div>
            <div className="explore-page-right-side-paginator-button-wrapper">
              <div className="explore-page-right-side-paginator-previous-button" onClick={
                () => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }
              }>Prev</div>
              <div className="explore-page-right-side-paginator-next-button" onClick={
                () => {
                  if (indexOfLastProduct < sortedProducts.length) {
                    setCurrentPage(currentPage + 1);
                  }
                }
              }>Next</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage;