export function PrivacyPage() {
  return <main className="flex-1 max-w-3xl mx-auto px-5 py-10 text-base text-slate-300 leading-relaxed">
    <h1 className="text-3xl text-white font-bold mb-6">Privacy and analytics</h1>
    <p className="mb-5">This website presents James Shoukry's baseball recruiting profile and film. Vercel hosts the site and provides basic traffic analytics without analytics cookies. Hosting services also process technical request information needed to deliver the site.</p>
    <p className="mb-5">If you choose Allow analytics, Google Analytics uses cookies to measure visits, video starts, watched portions, film downloads, profile-link clicks and contact-link clicks. Reports help us understand how people discover and use the recruiting film. Advertising personalization and Google signals are disabled. We do not send email addresses, message text or visitor names as analytics events.</p>
    <p className="mb-5">The site remembers your analytics choice in your browser. You can decline or change it at any time. Declining stops optional Google Analytics collection; the film and contact links continue to work. Email links open your own email application. External profiles are governed by their respective services' privacy policies.</p>
    <p className="mb-5">Read <a className="text-amber-300 underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">how Google uses information from partner sites</a> and <a className="text-amber-300 underline" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener">Vercel's analytics privacy information</a>.</p>
    <button className="px-4 py-3 rounded-lg border border-slate-600 hover:border-amber-300 mb-5" onClick={() => window.dispatchEvent(new Event('analytics-preferences'))}>Change analytics choice</button>
    <p>Questions: <a className="text-amber-300 underline" href="mailto:james.shoukry2028@gmail.com">james.shoukry2028@gmail.com</a></p>
    <p className="mt-5"><a className="text-amber-300 underline" href="/">Return to James's profile</a></p>
  </main>;
}
