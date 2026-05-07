import axios from 'axios'
import React, { useState } from 'react'

const Addproduct = () => {
  const [product_name, setProductName] = useState('')
  const [product_description, setProductDescription] = useState('')
  const [product_cost, setProductCost] = useState('')
  const [product_photo, setProductPhoto] = useState('')
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [previewImage, setPreviewImage] = useState('')

  const validateForm = () => {
    const errors = {}
    if (!product_name.trim()) errors.product_name = 'Product name is required'
    if (!product_description.trim()) errors.product_description = 'Description is required'
    if (!product_cost || product_cost <= 0) errors.product_cost = 'Valid price is required'
    if (!product_photo) errors.product_photo = 'Product photo is required'
    return errors
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProductPhoto(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target.result)
      reader.readAsDataURL(file)
    } else {
      setPreviewImage('')
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading('Adding product...')
    setError('')
    setSuccess('')

    const formdata = new FormData()
    formdata.append('product_name', product_name)
    formdata.append('product_description', product_description)
    formdata.append('product_cost', product_cost)
    formdata.append('product_photo', product_photo)

    try {
      const response = await axios.post('http://janembuni.alwaysdata.net/api/addproduct', formdata)
      setSuccess(response.data.message)
      setLoading('')
      // Reset form on success
      setProductName('')
      setProductDescription('')
      setProductCost('')
      setProductPhoto('')
      setPreviewImage('')
      setFormErrors({})
    } catch (error) {
      setError(error.message)
      setLoading('')
    }
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-[2rem] border border-slate-800/20 bg-slate-950/95 p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.85)] ring-1 ring-white/10 backdrop-blur-xl sm:p-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">New listing</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">Add a product</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">Create a premium listing for your customers with quick M-Pesa checkout.</p>
          </div>

          <div className="mt-6 space-y-3">
            {loading && <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{loading}</div>}
            {success && <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}
            {error && <div className="rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          </div>

          <form className="mt-8 space-y-5" onSubmit={handlesubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Product name</label>
              <input 
                type="text" 
                value={product_name} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="Enter product name" 
                className={`w-full rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.product_name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-400'
                }`} 
              />
              {formErrors.product_name && <p className="mt-1 text-sm text-rose-400">{formErrors.product_name}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>
              <textarea 
                value={product_description} 
                onChange={(e) => setProductDescription(e.target.value)} 
                placeholder="Describe your product" 
                rows="3"
                className={`w-full rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.product_description ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-400'
                }`} 
              />
              {formErrors.product_description && <p className="mt-1 text-sm text-rose-400">{formErrors.product_description}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Price (Ksh)</label>
              <input 
                type="number" 
                value={product_cost} 
                onChange={(e) => setProductCost(e.target.value)} 
                placeholder="Enter price" 
                min="1"
                className={`w-full rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.product_cost ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-400'
                }`} 
              />
              {formErrors.product_cost && <p className="mt-1 text-sm text-rose-400">{formErrors.product_cost}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Product photo</label>
              <div className={`rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 transition ${
                formErrors.product_photo ? 'border-rose-500' : 'border-slate-700'
              }`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 file:transition file:hover:bg-emerald-400" 
                />
              </div>
              {formErrors.product_photo && <p className="mt-1 text-sm text-rose-400">{formErrors.product_photo}</p>}
              {previewImage && (
                <div className="mt-3">
                  <img src={previewImage} alt="Preview" className="h-32 w-32 rounded-[1rem] object-cover border border-slate-700" />
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addproduct