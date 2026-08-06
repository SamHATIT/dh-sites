const {useState, useEffect} = React;

function Site() {
  const [lang, setLang] = useState(() => localStorage.getItem('dh-lang') || 'en');
  useEffect(() => { localStorage.setItem('dh-lang', lang); }, [lang]);

  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('dh-theme', theme); } catch (e) {}
  }, [theme]);

  // Mini-router : on regarde le pathname courant
  const pathname = (window.location.pathname || '/').replace(/\/$/, '') || '/';
  const legalRoutes = {'/cgv': 'cgv', '/legal': 'legal', '/privacy': 'privacy'};
  const legalSlug = legalRoutes[pathname];

  if (legalSlug) {
    const LegalLayout = window.LegalLayout;
    const LegalPage = window.LegalPage;
    if (LegalLayout && LegalPage) {
      return (
        <LegalLayout lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} slug={legalSlug}>
          <LegalPage slug={legalSlug} lang={lang}/>
        </LegalLayout>
      );
    }
    // Fallback si module legal pas chargé : afficher message clair
    return <div style={{padding: '4rem', textAlign: 'center'}}>Loading legal module…</div>;
  }

  // Home par défaut
  return (
    <div data-screen-label="Marketing Home">
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
      <main>
        <Hero lang={lang}/>
        <Benefits lang={lang}/>
        <HowItWorks lang={lang}/>
        <OurWork lang={lang}/>
        <Pricing lang={lang}/>
        <CTA lang={lang}/>
      </main>
      <Footer lang={lang}/>
      {window.SophieChat && <window.SophieChat lang={lang}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Site/>);
