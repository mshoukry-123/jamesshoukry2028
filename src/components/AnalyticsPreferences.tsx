import { useEffect, useState } from 'react';
import { analyticsChoice, observeEngagement, setAnalyticsChoice } from '../lib/engagement';

export function AnalyticsPreferences() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const choice = analyticsChoice();
    if (choice) setAnalyticsChoice(choice);
    else setOpen(true);
    const show = () => setOpen(true);
    window.addEventListener('analytics-preferences', show);
    const stop = observeEngagement();
    return () => { stop(); window.removeEventListener('analytics-preferences', show); };
  }, []);
  if (!open) return null;
  const choose = (choice: 'allow' | 'decline') => { setAnalyticsChoice(choice); setOpen(false); };
  return <aside aria-label="Optional analytics" className="fixed z-50 bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-slate-900 border border-slate-600 rounded-xl p-4 shadow-xl text-sm">
    <p className="text-slate-200 leading-relaxed">Allow optional analytics cookies to help us understand which film visitors watch? <a href="/privacy" className="underline text-amber-300">Privacy details</a></p>
    <div className="flex gap-3 mt-3"><button onClick={() => choose('decline')} className="flex-1 border border-slate-500 rounded-md px-3 py-2 hover:border-amber-300">Decline</button><button onClick={() => choose('allow')} className="flex-1 border border-slate-500 rounded-md px-3 py-2 hover:border-amber-300">Allow analytics</button></div>
  </aside>;
}
