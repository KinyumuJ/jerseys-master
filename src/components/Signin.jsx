import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid'
    if (!password) errors.password = 'Password is required'
    return errors
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading('Signing in...')
    setError('')
    setSuccess('')

    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('password', password)

    try {
      const response = await axios.post('https://janembuni.alwaysdata.net/api/signin', formdata)
      setSuccess(response.data.message)
      setLoading('')
      // Reset form on success
      setEmail('')
      setPassword('')
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
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Welcome back</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">Signin to continue</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">Securely access your product dashboard and start buying with M-Pesa.</p>
          </div>

          <div className="mt-6 space-y-3">
            {loading && <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{loading}</div>}
            {success && <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}
            {error && <div className="rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          </div>

          <form className="mt-8 space-y-5" onSubmit={handlesubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                className={`w-full rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-400'
                }`} 
              />
              {formErrors.email && <p className="mt-1 text-sm text-rose-400">{formErrors.email}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className={`w-full rounded-[1.5rem] border bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.password ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-400'
                }`} 
              />
              {formErrors.password && <p className="mt-1 text-sm text-rose-400">{formErrors.password}</p>}
            </div>
            <button 
              type="submit" 
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account? <Link to="/signup" className="font-semibold text-emerald-300 hover:text-emerald-200">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin