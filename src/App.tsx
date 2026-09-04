import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsHud } from './components/MetricsHud';
import { FeaturedVideo } from './components/FeaturedVideo';
import { FilmRoom } from './components/FilmRoom';
import { AcademicsAndCoaches } from './components/AcademicsAndCoaches';
import { YouTubeDrawer } from './components/YouTubeDrawer';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isYouTubeGuideOpen, setIsYouTubeGuideOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      <Navbar onOpenYouTubeGuide={() => setIsYouTubeGuideOpen(true)} />
      <main className="flex-1">
        <Hero />
        <MetricsHud />
        <FeaturedVideo />
        <FilmRoom />
        <AcademicsAndCoaches />
      </main>
      <Footer />
      <YouTubeDrawer
        isOpen={isYouTubeGuideOpen}
        onClose={() => setIsYouTubeGuideOpen(false)}
      />
    </div>
  );
};

export default App;
