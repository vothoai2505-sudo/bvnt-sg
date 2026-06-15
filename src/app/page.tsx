'use client';
import HeroGlobe from '../components/HeroGlobe';
import Navbar from '../components/Navbar';
import HeroContent from '../components/HeroContent';
import MarketShare from '../components/MarketShare';
import Milestone from '../components/Milestone';
import Products from '../components/Products';
import Team from '../components/Team';
import CSR from '../components/CSR';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <Navbar />
      
      <section className="relative w-full h-screen overflow-hidden">
        <HeroGlobe />
        <HeroContent />
      </section>

      <MarketShare />
      <Milestone />
      <Products />
      <CSR />
      <Team />
      <NewsSection />
      <Footer />
    </main>
  );
}