// Hairline icon set — 1.5 stroke, bone on ink
const I = ({d, size=20}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={d}/>
  </svg>
);
const Speed    = p => <I {...p} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>;
const Accuracy = p => <I {...p} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>;
const Cost     = p => <I {...p} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>;
const Security = p => <I {...p} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z"/>;

function Header({lang, setLang, theme, setTheme}) {
  const t = lang === 'en'
    ? {benefits:'Benefits', how:'The Sequence', work:'The Work', pact:'The Pact', journal:'Journal', studio:'My Studio', themeLight:'Light mode', themeDark:'Dark mode'}
    : {benefits:'Avantages', how:'La Séquence', work:'L’Atelier', pact:'Le Pacte', journal:'Journal', studio:'Mon Studio', themeLight:'Mode clair', themeDark:'Mode sombre'};
  return (
    <header className="glass">
      <div className="wrap bar">
        <a href="#" className="mk" aria-label="Digital·Humans — Autonomous Studio">
          <span className="wm">Digital<span className="dot">·</span><em>Humans</em></span>
          <span className="tag">Autonomous<br/>Studio · EST MMXXV</span>
        </a>
        <nav className="links">
          <a href="#benefits" className="link">{t.benefits}</a>
          <a href="#how"      className="link">{t.how}</a>
          <a href="#work"     className="link">{t.work}</a>
          <a href="#pricing"  className="link">{t.pact}</a>
          <a href="https://digital-humans.fr/journal" className="link">{t.journal}</a>
          <a href="https://app.digital-humans.fr" className="btn-studio">{t.studio} <span className="ar">→</span></a>
          <button className="lang" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} aria-label={lang === 'en' ? 'FR · EN — switch to French' : 'EN · FR — passer en anglais'} title={lang === 'en' ? 'Switch language' : 'Changer de langue'}>
            {lang === 'en' ? 'FR' : 'EN'} · {lang === 'en' ? 'EN' : 'FR'}
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? t.themeDark : t.themeLight}
            title={theme === 'light' ? t.themeDark : t.themeLight}>
            {theme === 'light'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({lang}) {
  const t = lang === 'en' ? {
    eyebrow: 'Dispatch · On the future of the studio',
    title: <>Not a tool. <em>A studio.</em><br/><span style={{fontSize: "0.78em", display: "inline-block"}}>That happens to be autonomous.</span></>,
    sub: 'Eleven specialised agents, one orchestrator, a composed sequence from first brief to production deploy. Digital·Humans is a Salesforce engineering studio that behaves like one — it just never sleeps.',
    primary: 'Talk to Sophie',
    ghost: 'Read the journal',
  } : {
    eyebrow: 'Dépêche · L\u2019avenir du studio',
    title: <>Pas un outil. <em>Un studio.</em><br/><span style={{fontSize: "0.78em", display: "inline-block"}}>Qui se trouve être autonome.</span></>,
    sub: 'Onze agents spécialisés, un chef d\u2019orchestre, une séquence composée du premier brief au déploiement en production. Digital·Humans est un studio d\u2019ingénierie Salesforce qui se comporte comme tel — il ne dort simplement jamais.',
    primary: 'Parler à Sophie',
    ghost: 'Lire le journal',
  };
  return (
    <section className="hero">
      <div className="wrap">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p className="sub">{t.sub}</p>
        <div className="actions">
          <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.sophie-launcher')?.click(); }} className="btn-primary lg">{t.primary} <span className="ar">→</span></a>
          <a href="https://digital-humans.fr/journal" className="btn-ghost">{t.ghost} <span className="ar">→</span></a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {Header, Hero, Speed, Accuracy, Cost, Security});
