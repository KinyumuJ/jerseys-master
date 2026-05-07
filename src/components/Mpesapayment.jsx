import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Mpesapayment = () => {
  const { singleproduct, cart = [] } = useLocation().state || {}

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const imagePath = 'http://janembuni.alwaysdata.net/static/images/'
  const isCartCheckout = cart.length > 0
  const paymentItems = isCartCheckout ? cart : singleproduct ? [singleproduct] : []

  const totalAmount = paymentItems.reduce(
    (sum, item) => sum + (item.product_cost || 0) * (item.quantity || 1),
    0
  )

  const validatePhone = (phone) => /^254[0-9]{9}$/.test(phone)

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setPhone(value)

    if (value && !validatePhone(value)) {
      setPhoneError('Phone must be 254xxxxxxxxx')
    } else {
      setPhoneError('')
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formdata = new FormData()
    formdata.append('phone', phone)
    formdata.append('amount', totalAmount)

    if (isCartCheckout) {
      formdata.append('cart_items', JSON.stringify(cart))
    }

    try {
      const res = await axios.post(
        'http://janembuni.alwaysdata.net/api/mpesa_payment',
        formdata
      )
      setSuccess(res.data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#f8f9fa" }}
    >
      <div className="card shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}>
        
        <div className="card-body">

          {/* Title */}
          <h4 className="text-center mb-3">M-Pesa Payment</h4>

          {/* Product Preview (COMPACT) */}
          <div style={{ maxHeight: "120px", overflowY: "auto" }}>
            {paymentItems.map((item) => (
              <div key={item.product_id} className="d-flex align-items-center mb-2">
                
                <img
                  src={`${imagePath}${item.product_photo}`}
                  alt=""
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 6
                  }}
                />

                <div className="ms-2">
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {item.product_name}
                  </div>
                  <small className="text-muted">
                    Qty: {item.quantity || 1}
                  </small>
                </div>

              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-center my-3">
            <strong>Ksh {totalAmount}</strong>
          </div>

          {/* Form */}
          <form onSubmit={handlesubmit}>
            <input
              type="tel"
              className="form-control mb-2"
              placeholder="254xxxxxxxxx"
              value={phone}
              onChange={handlePhoneChange}
            />

            {phoneError && (
              <small className="text-danger d-block mb-2">
                {phoneError}
              </small>
            )}

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={!phone || phoneError || loading}
            >
              {loading ? "Processing..." : `Pay Ksh ${totalAmount}`}
            </button>
          </form>

          {/* Messages */}
          {loading && <p className="text-info mt-3 text-center">Processing...</p>}
          {success && <p className="text-success mt-3 text-center">{success}</p>}
          {error && <p className="text-danger mt-3 text-center">{error}</p>}

        </div>
      </div>
    </div>
  )
}

export default Mpesapayment