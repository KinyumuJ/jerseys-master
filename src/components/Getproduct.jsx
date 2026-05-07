import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductGrid from './ProductGrid'
import Cart from './Cart'

const Getproduct = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const getproducts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://janembuni.alwaysdata.net/api/getproducts')
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
    navigate('/makepayment', { state: { cart: cartItems } })
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium page-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">Available products</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Browse curated listings</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Explore the latest sports and lifestyle products with clear pricing and quick checkout.
            </p>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {products.length} items live
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

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
       <ProductGrid
  products={products}
  imagePath={imagepath}
  loading={loading}
  onAddToCart={onAddToCart}   // ✅ REQUIRED
  onPayNow={(product) =>
    navigate('/makepayment', { state: { singleproduct: product } })
  }
/>

<Cart
  items={cartItems}
  onRemove={onRemoveFromCart}  // ✅ REQUIRED
  onCheckout={handleCheckout}
/> 
      </div>
    </section>
  )
}

export default Getproduct