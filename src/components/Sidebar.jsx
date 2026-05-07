import React from 'react'
import Button from './Button'

const categories = ['Electronics', 'Fashion', 'Sports', 'Home', 'Fintech', 'Smart Living']

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium page-card">
        <h2 className="mt-4 text-2xl font-semibold text-slate-950">Browse fast categories</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Filter premium products and services with clear sections and strong visuals.</p>
        <div className="mt-6 grid gap-3">
          {categories.map((category) => (
            <Button key={category} variant="ghost" className="justify-start text-left py-3">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick actions</p>
        <div className="mt-5 space-y-4">
          <div className="rounded-3xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Secure payments</p>
            <p className="mt-2 text-sm text-slate-600">Checkout with trusted M-Pesa flow in one tap.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-800">Seller dashboard</p>
            <p className="mt-2 text-sm text-slate-600">Add products and manage listings from one page.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
