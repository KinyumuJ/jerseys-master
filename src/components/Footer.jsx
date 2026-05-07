import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Browse</h4>
            <ul className="footer-links">
              <li><a href="#mens">Men's Jerseys</a></li>
              <li><a href="#womens">Women's Jerseys</a></li>
              <li><a href="#featured">Featured Collections</a></li>
              <li><a href="#sales">Sale & Deals</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>About</h4>
            <ul className="footer-links">
              <li><a href="#about">Who We Are</a></li>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#team">Meet the Team</a></li>
              <li><a href="#partners">Our Partners</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p>© 2026 SokoGarden Jerseys. All your favorite kits, right here.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#twitter" title="Twitter">Twitter</a>
            <a href="#facebook" title="Facebook">Facebook</a>
            <a href="#instagram" title="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
