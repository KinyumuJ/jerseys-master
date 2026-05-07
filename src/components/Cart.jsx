import React from 'react'
import Button from './Button'

const Cart = ({ items = [], onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.product_cost * item.quantity, 0)

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">Your cart</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Items ready for checkout</h2>
        </div>
        <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          {items.length} item{items.length === 1 ? '' : 's'}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
          Your cart is currently empty. Add products to begin checkout.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product_id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.product_name}</p>
                  <p className="mt-1 text-sm text-slate-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-950">Ksh {item.product_cost * item.quantity}</p>
                  <Button
                    variant="ghost"
                    className="mt-2 rounded-full px-3 py-2 text-slate-600 hover:bg-slate-100"
                    onClick={() => onRemove(item.product_id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-[1.5rem] bg-slate-100 p-4 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold text-slate-950">Ksh {total}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Taxes and shipping calculated at checkout.</p>
          </div>

          <Button
            className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            Checkout cart
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
