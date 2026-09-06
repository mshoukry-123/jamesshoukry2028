import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsHud } from './components/MetricsHud';
import { Accolades } from './components/Accolades';
import { FeaturedVideo } from './components/FeaturedVideo';
import { FilmRoom } from './components/FilmRoom';
import { AcademicsAndCoaches } from './components/AcademicsAndCoaches';
import { Footer } from './components/Footer';
import { RecruitingFilmPage } from './components/RecruitingFilmPage';
import { PrivacyPage } from './components/PrivacyPage';
import { AnalyticsPreferences } from './components/AnalyticsPreferences';
import { cleanLocation } from './lib/engagement';
import { Analytics } from '@vercel/analytics/react';

export const App: React.FC<{ page?: 'profile' | 'film' | 'privacy' }> = ({ page = 'profile' }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
    <Navbar watchPage={page !== 'profile'} />
    {page === 'film' ? <RecruitingFilmPage /> : page === 'privacy' ? <PrivacyPage /> : <main className="flex-1">
      <Hero />
      <MetricsHud />
      <Accolades />
      <FeaturedVideo />
      <FilmRoom />
      <AcademicsAndCoaches />
    </main>}
    <Footer />
    <Analytics beforeSend={value => ({ ...value, url: cleanLocation(value.url) })} />
    <AnalyticsPreferences />
  </div>
);

export default App;
