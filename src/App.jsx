import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';
import Projects from './components/Projects';
import NotFound from './components/NotFound';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';
import CursorGlow from './components/CursorGlow';
import { AnimatePresence } from 'framer-motion';
import { useScrollToHash } from './hooks/useScrollToHash';


function ScrollHandler() {
  useScrollToHash();
  return null;
}


const App = () => {
  return (
    <Router>
      <CursorGlow />
      <ScrollHandler />
      <div className="bg-[#030712] min-h-screen font-sans">
        <ScrollProgress />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <PageTransition>
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Projects />
                  <Skills />
                  <Contact />
                  <Footer />
                </>
              </PageTransition>
            } />
            <Route path="/thank-you" element={
              <PageTransition>
                <ThankYou />
              </PageTransition>
            } />
            <Route path="*" element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
