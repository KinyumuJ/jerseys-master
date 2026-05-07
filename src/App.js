import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Card from './components/Card';

function App() {
  const [theme, setTheme] = useState('dark');
  const [cartItems, setCartItems] = useState([]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.product_id)
      if (existing) {
        return prev.map((item) => item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product_id !== productId))
  }

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'}`}
        style={theme === 'dark' ? {
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(34,197,94,0.14), transparent 18%), radial-gradient(circle at 85% 10%, rgba(59,130,246,0.12), transparent 20%), radial-gradient(circle at 50% 80%, rgba(14,165,233,0.1), transparent 25%)'
        } : {}}
      >
        <Navbar theme={theme} onToggleTheme={toggleTheme} cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Carousel theme={theme} />
          <div className="space-y-8 mt-8">
            <div className="rounded-[2rem] border border-slate-800/20 bg-slate-950/95 p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.85)] ring-1 ring-white/10 backdrop-blur-xl">
              <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <Card className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-cyan-700 to-emerald-500 p-8 text-white shadow-xl border border-slate-800 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Premium marketplace</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Discover premium products with banking-grade UX
                  </h1>
                  <p className="mx-auto mt-4 max-w-2xl text-slate-200/90">
                    Clean, fast and polished browsing that combines KCB-style trust with Jiji/Jumia marketplace energy.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] bg-white/10 p-5 shadow-inner ring-1 ring-white/10">
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-100">Fast gateway</p>
                      <p className="mt-3 text-sm leading-6 text-slate-100">Pay securely with M-Pesa and enjoy verified checkout for every order.</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-white/10 p-5 shadow-inner ring-1 ring-white/10">
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-100">Smart browsing</p>
                      <p className="mt-3 text-sm leading-6 text-slate-100">Find premium jerseys fast with strong visuals, clean cards, and polished UX.</p>
                    </div>
                  </div>
                </Card>

                <div className="grid gap-4">
                  <Card className="rounded-[2rem] border border-slate-700 bg-slate-900/80 p-6 shadow-xl text-white">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Why choose us</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Built for trusted buyers and sellers</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">A premium marketplace experience with strong category focus, secure payment flow, and modern visual polish.</p>
                    <div className="mt-5 space-y-3 text-sm text-slate-300">
                      <p>• Smooth navigation for product discovery</p>
                      <p>• Reusable UI components and responsive layout</p>
                      <p>• Professional green + accent color palette</p>
                    </div>
                  </Card>
                  <Card className="rounded-[2rem] bg-gradient-to-br from-cyan-600 via-violet-700 to-fuchsia-600 p-5 text-white shadow-xl border border-cyan-500/20">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-100">Quick actions</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <Link to="/" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Home</Link>
                      <Link to="/addproduct" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Add product</Link>
                      <Link to="/signup" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Signup</Link>
                      <Link to="/signin" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Signin</Link>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Getproduct cartItems={cartItems} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/addproduct" element={<Addproduct />} />
              <Route path="/makepayment" element={<Mpesapayment />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
