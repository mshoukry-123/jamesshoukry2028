import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsHud } from './components/MetricsHud';
import { Accolades } from './components/Accolades';
import { FeaturedVideo } from './components/FeaturedVideo';
import { FilmRoom } from './components/FilmRoom';
import { AcademicsAndCoaches } from './components/AcademicsAndCoaches';
import { Footer } from './components/Footer';
// Counts visits and where they came from. No cookies, so no consent banner,
// and referrers are the point: we need to see when a coach arrives from an
// email, a PBR post or a search rather than guessing.
import { Analytics } from '@vercel/analytics/react';

export const App: React.FC = () => (
  <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <MetricsHud />
      <Accolades />
      <FeaturedVideo />
      <FilmRoom />
      <AcademicsAndCoaches />
    </main>
    <Footer />
    <Analytics />
  </div>
);

export default App;
