import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductGrid from './ProductGrid'
import Cart from './Cart'

const Getproduct = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)

  // FILTER PRODUCTS
  const filtered_products = products.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())
  )

  // SORT PRODUCTS
  const sorted_products = [...filtered_products].sort((a, b) => {
    if (sortOption === 'price_low_high') {
      return a.product_cost - b.product_cost
    }

    if (sortOption === 'price_high_low') {
      return b.product_cost - a.product_cost
    }

    if (sortOption === 'name_asc') {
      return a.product_name.localeCompare(b.product_name)
    }

    if (sortOption === 'name_desc') {
      return b.product_name.localeCompare(a.product_name)
    }

    return 0
  })

  // LIMIT PRODUCTS
  const displayedProducts = sorted_products.slice(0, visibleCount)

  const getproducts = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'https://janembuni.alwaysdata.net/api/getproducts'
      )

      if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`)
      }

      const data = await response.json()
      setProducts(data)
    } catch (error) {
      setError(error?.message || 'Something went wrong while loading products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  const imagepath = 'https://janembuni.alwaysdata.net/static/images/'

  const handleCheckout = () => {
    if (!cartItems.length) return

    navigate('/makepayment', {
      state: { cart: cartItems }
    })
  }

  return (
    <section className="space-y-6">

      {/* SEARCH + SORT */}
      <div className="row justify-content-center mt-3 mb-4">

        {/* Search */}
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            type="search"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort Products</option>
            <option value="price_low_high">Price: Low - High</option>
            <option value="price_high_low">Price: High - Low</option>
            <option value="name_asc">Product Name: A - Z</option>
            <option value="name_desc">Product Name: Z - A</option>
          </select>
        </div>

      </div>

      {/* HEADER */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium page-card">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">
              Available products
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-slate-950">
              Browse curated listings
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Explore the latest sports and lifestyle products with clear pricing and quick checkout.
            </p>
          </div>

          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {sorted_products.length} items found
          </div>

        </div>

        <div className="mt-4 flex flex-wrap gap-3">

          {loading && (
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700">
              Loading products...
            </span>
          )}

          {error && (
            <span className="rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-700">
              {error}
            </span>
          )}

        </div>

      </div>

      {/* PRODUCT GRID + CART */}
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

        <ProductGrid
          products={displayedProducts}
          imagePath={imagepath}
          loading={loading}
          onAddToCart={onAddToCart}
          onPayNow={(product) =>
            navigate('/makepayment', {
              state: { singleproduct: product }
            })
          }
        />

        <Cart
          items={cartItems}
          onRemove={onRemoveFromCart}
          onCheckout={handleCheckout}
        />

      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < sorted_products.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setVisibleCount((prev) => prev + 8)}
          >
            Load More
          </button>
        </div>
      )}

    </section>
  )
}

export default Getproduct