import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Chat from './components/Chat'
import Contact from './components/Contact'
import Loader from './components/Loader'
import EnterScreen from './components/EnterScreen'
import Footer from './components/Footer'

// Back to top button
const BackToTop = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!show) return null
  return (
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
      ↑
    </button>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  return (
    <div style={{ background: '#03040a', minHeight: '100vh' }}>
      <Navbar />
      <ScrollToTop />
      <main style={{ paddingTop: '4rem' }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [initialCheckDone, setInitialCheckDone] = useState(false)

  useEffect(() => {
    const isBot = /bot|crawl|spider|slurp|bing/i.test(navigator.userAgent)
    const isHome = window.location.pathname === '/'
    const alreadyVisited = sessionStorage.getItem('djVisited')
    if (isBot) {
      setStarted(true)
    } else if (isHome && !alreadyVisited) {
      setStarted(false)
    } else {
      setStarted(true)
    }
    setInitialCheckDone(true)
  }, [])

  const handleStart = () => {
    sessionStorage.setItem('djVisited', 'true')
    setStarted(true)
    setShowLoader(true)
  }

  if (!initialCheckDone) return null

  return (
    <>
      {!started ? (
        <EnterScreen onEnter={handleStart} />
      ) : showLoader ? (
        <Loader onComplete={() => setShowLoader(false)} />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </>
  )
}

export default App
