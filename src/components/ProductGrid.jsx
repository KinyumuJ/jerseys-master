import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const ProductGrid = ({ products, imagePath, loading = false, onAddToCart, onPayNow }) => {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState(new Set())

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1) // 3.0 to 5.0
  const getRandomReviews = () => Math.floor(Math.random() * 500 + 10) // 10 to 510
  const getDiscount = () => Math.random() > 0.7 ? Math.floor(Math.random() * 30 + 10) : null // 30% chance of discount

  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="product-card skeleton">
            <div className="product-image-container skeleton-shimmer"></div>
            <div className="product-content">
              <div className="skeleton-shimmer skeleton-title"></div>
              <div className="skeleton-shimmer skeleton-rating"></div>
              <div className="skeleton-shimmer skeleton-price"></div>
              <div className="skeleton-shimmer skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="no-products-card">
        <p className="no-products-title">No products available yet.</p>
        <p className="no-products-subtitle">Please check back later or add a new product.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => {
        const productId = `${product.product_name}-${index}`
        const isWishlisted = wishlist.has(productId)
        const rating = getRandomRating()
        const reviewCount = getRandomReviews()
        const discount = getDiscount()

        return (
          <div key={productId} className="product-card">
            <div className="product-image-container">
              {discount && (
                <div className="discount-badge">
                  -{discount}%
                </div>
              )}
              <button
                className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(productId)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <img
                src={`${imagePath}${product.product_photo}`}
                alt={product.product_name}
                className="product-image"
              />
            </div>
            <div className="product-content">
              <h3 className="product-title" title={product.product_name}>
                {product.product_name}
              </h3>
              <div className="product-rating">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => {
                    const starValue = starIndex + 1
                    const isFull = rating >= starValue
                    const isHalf = rating >= starValue - 0.5 && rating < starValue
                    return (
                      <svg
                        key={starIndex}
                        className={`star ${isFull ? 'full' : isHalf ? 'half' : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    )
                  })}
                </div>
                <span className="rating-text">
                  {rating} ({reviewCount})
                </span>
              </div>
              <div className="product-price">
                <span className="price-amount">Ksh {product.product_cost}</span>
              </div>
              <Button
                className="add-to-cart-btn"
                onClick={() => onAddToCart?.(product)}
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                className="mt-3 w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                onClick={() => onPayNow ? onPayNow(product) : navigate('/makepayment', { state: { singleproduct: product } })}
              >
                Pay now
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductGrid
