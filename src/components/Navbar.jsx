import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = ({ theme, onToggleTheme, cartItems = [], onRemoveFromCart }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(34,197,94,0.95), rgba(59,130,246,0.95))'
          : 'linear-gradient(90deg, rgba(56,189,248,0.96), rgba(16,185,129,0.95), rgba(236,72,153,0.95))',
      }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo bg-gradient-to-br from-cyan-400 via-emerald-400 to-fuchsia-500 text-transparent bg-clip-text">G</div>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: 0, color: '#ecfeff' }}>GAMEBANK</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>Games Innit</p>
          </div>
        </Link>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-link text-slate-100/90 hover:text-white">Home</Link></li>
          <li><Link to="/addproduct" className="navbar-link text-slate-100/90 hover:text-white">Add Product</Link></li>
          <li><Link to="/signup" className="navbar-link text-slate-100/90 hover:text-white">Signup</Link></li>
          <li><Link to="/signin" className="navbar-link text-slate-100/90 hover:text-white">Signin</Link></li>
        </ul>

        <div className="navbar-actions">
          <button className="navbar-icon" title="Cart">
            <span>🛒</span>
            {cartItems.length > 0 && (
              <span className="navbar-badge">{cartItems.length}</span>
            )}
          </button>

          <button className="navbar-icon" title="Theme toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button className="navbar-icon" title="Notifications">
            <span>🔔</span>
            <span className="navbar-badge">3</span>
          </button>

          <button className="navbar-icon" title="User Profile">
            <span>👤</span>
          </button>
        </div>

        <button 
          className="navbar-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          title="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  )
}

export default Navbar

