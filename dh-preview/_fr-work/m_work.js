const R = (window.__resources || {});
const AV = s => R['av' + s[0].toUpperCase() + s.slice(1)] || `../assets/avatars/${s}.svg`;
const ENSEMBLE = [
  {act:'I·1',   c:'var(--indigo)', n:'Sophie Chen',      a:AV('sophie'), en:'Orchestrator',       fr:'Chef d’orchestre'},

  {act:'II·1',  c:'var(--plum)',   n:'Olivia Parker',    a:AV('olivia'), en:'Business Analyst',    fr:'Business Analyst'},
  {act:'II·2',  c:'var(--plum)',   n:'Emma Rodriguez',   a:AV('emma'),   en:'Research',            fr:'Recherche'},
  {act:'II·3',  c:'var(--plum)',   n:'Marcus Johnson',   a:AV('marcus'), en:'Architect',           fr:'Architecte'},

  {act:'III·1', c:'var(--terra)',  n:'Diego Martinez',   a:AV('diego'),  en:'Apex',                fr:'Apex'},
  {act:'III·2', c:'var(--terra)',  n:'Zara Thompson',    a:AV('zara'),   en:'LWC',                 fr:'LWC'},
  {act:'III·3', c:'var(--terra)',  n:'Raj Patel',        a:AV('raj'),    en:'Administrator',       fr:'Administrateur'},

  {act:'IV·1',  c:'var(--sage)',   n:'Aisha Okonkwo',    a:AV('aisha'),  en:'Data Migration',      fr:'Migration'},
  {act:'IV·2',  c:'var(--sage)',   n:'Elena Vasquez',    a:AV('elena'),  en:'QA',                  fr:'QA'},

  {act:'V·1',   c:'var(--slate)',  n:'Jordan Blake',     a:AV('jordan'), en:'DevOps',              fr:'DevOps'},
  {act:'V·2',   c:'var(--ochre)',  n:'Lucas Fernandez',  a:AV('lucas'),  en:'Trainer',             fr:'Formateur'},
];

function OurAgents({lang}) {
  const t = lang === 'en'
    ? {num: '№ 03 · The ensemble', title: <>Eleven <em>portraits</em>, one rim rule.</>, lede: 'Five acts. One group accent per act. Identity never fills — it rims. State always wins over identity.'}
    : {num: '№ 03 · L’ensemble', title: <>Onze <em>portraits</em>, une règle.</>, lede: 'Cinq actes. Un accent par groupe. L’identité ne remplit jamais — elle borde. L’état l’emporte toujours.'};
  return (
    <section id="agents" className="block">
      <div className="wrap">
        <div className="section-head">
          <div className="num">{t.num}</div>
          <div>
            <h2>{t.title}</h2>
            <p className="lede">{t.lede}</p>
          </div>
        </div>
        <div className="roster">
          {ENSEMBLE.map(a => (
            <div key={a.n} className="agent" data-act={a.act} style={{'--c': a.c}}>
              <div className="av"><img src={a.a} alt={a.n}/></div>
              <div className="nm">{a.n}</div>
              <div className="rl">{a[lang]}</div>
            </div>
          ))}
        </div>
        <div className="legend">
          <span className="k" style={{'--k':'var(--indigo)'}}>Act I · Direction</span>
          <span className="k" style={{'--k':'var(--plum)'}}>Act II · Visionaries</span>
          <span className="k" style={{'--k':'var(--terra)'}}>Act III · Builders</span>
          <span className="k" style={{'--k':'var(--sage)'}}>Act IV · Guardians</span>
          <span className="k" style={{'--k':'var(--slate)'}}>Act V · Stage · DevOps</span>
          <span className="k" style={{'--k':'var(--ochre)'}}>Act V · Stage · Trainer</span>
        </div>
      </div>
    </section>
  );
}




const PROJECTS = [
  {
    id: 'logifleet', roman: 'I',
    industry:  { en: 'LOGISTICS · B2B', fr: 'LOGISTIQUE · B2B' },
    title:     { en: 'LogiFleet — Fleet Service Cloud', fr: 'LogiFleet — Fleet Service Cloud' },
    punchline: { en: 'A 320-vehicle fleet brought into Service Cloud in eight days. Drivers, dispatch, maintenance — one canonical record per asset.',
                 fr: 'Une flotte de 320 véhicules basculée dans Service Cloud en huit jours. Chauffeurs, dispatch, maintenance — un seul enregistrement canonique par actif.' },
    scope: ['Service Cloud · Field Service · 320 assets',
            '12 custom objects · 47 flows · 9 LWC',
            'Live in production, week 11 · 0 critical bugs'],
    sds_url: 'https://digital-humans.fr/sds-preview/146.html',
  },
  {
    id: 'pharma', roman: 'II',
    industry:  { en: 'PHARMA · CLINICAL TRIALS', fr: 'PHARMA · ESSAIS CLINIQUES' },
    title:     { en: 'Clinical Trial Watch', fr: 'Clinical Trial Watch' },
    punchline: { en: 'A regulated trial pipeline turned into a single Salesforce dashboard. Sites, enrolments, deviations — every event audit-trailed.',
                 fr: 'Un pipeline d’essais cliniques régulés transformé en un seul dashboard Salesforce. Sites, recrutements, déviations — chaque événement traçable.' },
    scope: ['Health Cloud · Experience Cloud · 21 CFR Part 11',
            '38 trial sites · 1 200 enrolments tracked',
            'Audit-ready logs, end-to-end'],
    sds_url: null,
  },
  {
    id: 'telecom', roman: 'III',
    industry:  { en: 'TELECOM · CLAIMS', fr: 'TÉLÉCOM · RÉCLAMATIONS' },
    title:     { en: 'Claim Resolver', fr: 'Claim Resolver' },
    punchline: { en: '14-day average resolution dropped to 4. Claims triaged by Einstein, dispatched by Sophie, audited by Elena.',
                 fr: 'Délai moyen de résolution passé de 14 à 4 jours. Réclamations triées par Einstein, dispatchées par Sophie, auditées par Elena.' },
    scope: ['Service Cloud · Einstein Bots · Omnichannel',
            '110 000 claims/year · 87% first-touch resolution',
            '−71% AHT, +12 NPS in two quarters'],
    sds_url: null,
  },
  {
    id: 'b2b-distribution', roman: 'IV',
    industry:  { en: 'B2B · DISTRIBUTION', fr: 'B2B · DISTRIBUTION' },
    title:     { en: 'Pipeline Tuner', fr: 'Pipeline Tuner' },
    punchline: { en: 'Twelve regional sales pipelines reconciled into one consolidated view. Forecast accuracy up from 68% to 91% in the first quarter.',
                 fr: 'Douze pipelines commerciaux régionaux réconciliés en une vue consolidée. Précision du forecast passée de 68% à 91% au premier trimestre.' },
    scope: ['Sales Cloud · CPQ · Tableau CRM',
            '12 regions · 240 reps · €310M ARR tracked',
            '+23 forecast accuracy points'],
    sds_url: null,
  },
  {
    id: 'energy', roman: 'V',
    industry:  { en: 'ENERGY · GRID', fr: 'ÉNERGIE · RÉSEAU' },
    title:     { en: 'Grid Foresight', fr: 'Grid Foresight' },
    punchline: { en: 'High-voltage maintenance scheduling moved from spreadsheets to Salesforce. Outage windows down 38%, asset uptime up 6 points.',
                 fr: 'Planification de la maintenance haute tension basculée des spreadsheets vers Salesforce. Fenêtres de coupure −38%, disponibilité des actifs +6 points.' },
    scope: ['Field Service · Asset 360 · Net Zero Cloud',
            '4 800 high-voltage assets monitored',
            'Predictive maintenance via Einstein Discovery'],
    sds_url: null,
  },
  {
    id: 'retail', roman: 'VI',
    industry:  { en: 'RETAIL · OMNICHANNEL', fr: 'RETAIL · OMNICANAL' },
    title:     { en: 'Omnichannel Loop', fr: 'Omnichannel Loop' },
    punchline: { en: 'Fifty stores, one customer record. Loyalty events, returns, e-commerce orders, in-store visits — stitched into a single graph.',
                 fr: 'Cinquante magasins, un seul dossier client. Événements de fidélité, retours, commandes e-commerce, visites en magasin — cousus dans un seul graphe.' },
    scope: ['Commerce Cloud · Marketing Cloud · Loyalty',
            '50 stores · 1.4M customers unified',
            '+18% repeat purchase rate'],
    sds_url: null,
  },
];

// Mod 16 fix: COVER accède directement à R[key] (plus de AV() qui re-préfixe 'av')
const COVER = id => {
  const R = (window.__resources || {});
  const key = 'cv' + id.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  return R[key] || ('assets/covers/' + id + '.jpg');
};

function OurWork({lang}) {
  const scrollerRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = el.clientWidth;
        const i = Math.round(el.scrollLeft / w);
        const total = PROJECTS.length;
        const clamped = Math.max(0, Math.min(total - 1, i));
        setActiveIdx(clamped);
      });
    };
    el.addEventListener('scroll', onScroll, {passive: true});
    return () => { el.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  const goTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const total = PROJECTS.length;
    const clamped = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({left: clamped * el.clientWidth, behavior: 'smooth'});
  };

  const onSlideTap = (e) => {
    if (window.matchMedia && window.matchMedia('(hover: hover)').matches) return;
    e.currentTarget.classList.toggle('flipped');
  };

  const t = lang === 'en'
    ? { num: '№ 03 · The work',
        title: (<>Whatever theatre of work, <em>one rim rule</em>, Quality.</>),
        lede: 'Each engagement is a single Salesforce solution composed by the ensemble. Six are public ; the rest live behind NDAs we are happy to honour.',
        cta: 'Read the SDS', soon: 'SDS · coming soon' }
    : { num: '№ 03 · L’atelier',
        title: (<>Quel que soit le théâtre, <em>une seule règle</em>, Qualité.</>),
        lede: 'Chaque mission est une solution Salesforce composée par l’ensemble. Six sont publiques ; les autres vivent derrière des NDA que nous respectons volontiers.',
        cta: 'Lire le SDS', soon: 'SDS · bientôt' };

  const isFirst = activeIdx === 0;
  const isLast = activeIdx === PROJECTS.length - 1;

  return (
    <section id="work" className="block">
      <div className="wrap">
        <div className="section-head">
          <div className="num">{t.num}</div>
          <div>
            <h2>{t.title}</h2>
            <p className="lede">{t.lede}</p>
          </div>
        </div>
        <div className="sequence-container work-sequence">
          <div className="steps work-steps" ref={scrollerRef}>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="step work-slide" onClick={onSlideTap}>
                <div className="work-flip">
                  <div className="work-face work-face-front">
                    <img className="work-cover-img" src={COVER(p.id)} alt={p.title[lang]} loading="lazy"/>
                    <div className="work-cover-gradient"></div>
                    <div className="work-cover-overlay">
                      <div className="work-eyebrow">
                        <span className="work-roman">{p.roman}</span>
                        <span className="work-sep"> · </span>
                        <span>{p.industry[lang]}</span>
                      </div>
                      <h3 className="work-title">{p.title[lang]}</h3>
                    </div>
                  </div>
                  <div className="work-face work-face-back">
                    <div className="work-eyebrow">
                      <span className="work-roman">{p.roman}</span>
                      <span className="work-sep"> · </span>
                      <span>{p.industry[lang]}</span>
                    </div>
                    <h3 className="work-title">{p.title[lang]}</h3>
                    <ul className="work-scope">
                      {p.scope.map((s, k) => (<li key={k}>{s}</li>))}
                    </ul>
                    <p className="work-punch">{p.punchline[lang]}</p>
                    {p.sds_url
                      ? (<a href={p.sds_url} className="work-cta" target="_blank" rel="noopener">{t.cta}<span className="ar"> →</span></a>)
                      : (<span className="work-soon">{t.soon}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="seq-arrow seq-prev" onClick={() => goTo(activeIdx - 1)} disabled={isFirst} aria-label="Previous project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button className="seq-arrow seq-next" onClick={() => goTo(activeIdx + 1)} disabled={isLast} aria-label="Next project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <div className="seq-dots" role="tablist" aria-label="Project navigation">
          {PROJECTS.map((p, i) => (
            <button key={p.id}
              role="tab"
              className={'seq-dot' + (i === activeIdx ? ' active' : '')}
              style={{'--c': 'var(--brass)'}}
              onClick={() => goTo(i)}
              aria-label={'Project ' + p.roman}
              aria-selected={i === activeIdx ? 'true' : 'false'}
              aria-current={i === activeIdx ? 'true' : 'false'}/>
          ))}
        </div>
      </div>
    </section>
  );
}


const PRICING_TIERS = [
  {
    id: 'free',
    eyebrow: { en: 'TIER I', fr: 'PALIER I' },
    name:    { en: 'Free',  fr: 'Gratuit' },
    tagline: { en: 'Discover the studio.', fr: 'Découvrir le studio.' },
    price:   { en: 'Free',  fr: 'Gratuit' },
    period:  { en: '',      fr: '' },
    bullets: {
      en: [
        'Chat with Sophie and Olivia',
        'No file upload, no persistent memory',
        'Sonnet 4.6 model',
        'Sessions stateless — nothing stored',
      ],
      fr: [
        'Chat avec Sophie et Olivia',
        'Pas d’upload, pas de mémoire persistante',
        'Modèle Sonnet 4.6',
        'Sessions sans trace — rien n’est stocké',
      ],
    },
    cta: { en: 'Get on the list', fr: 'S’inscrire à la liste' },
  },
  {
    id: 'pro',
    eyebrow:   { en: 'TIER II · MOST POPULAR', fr: 'PALIER II · LE PLUS DEMANDÉ' },
    name:      { en: 'Pro',   fr: 'Pro' },
    tagline:   { en: 'From brief to delivered SDS.', fr: 'Du brief au SDS livré.' },
    price:     { en: '49€',   fr: '49€' },
    period:    { en: '/month', fr: '/mois' },
    featured:  true,
    bullets: {
      en: [
        'Full ensemble of 11 agents',
        'File upload & persistent memory',
        '2 SDS per month included (BR · UC · Solution Design · Word/PDF)',
        'Marcus runs on Opus — the technical depth that makes the SDS shippable',
        'Sonnet 4.6 for the rest of the team',
      ],
      fr: [
        'L’ensemble complet des 11 agents',
        'Upload de fichiers & mémoire persistante',
        '2 SDS par mois inclus (BR · UC · Solution Design · Word/PDF)',
        'Marcus tourne en Opus — la rigueur technique qui rend le SDS livrable',
        'Sonnet 4.6 pour le reste de l’équipe',
      ],
    },
    cta: { en: 'Coming soon', fr: 'Bientôt' },
    disabled: true,
    note: { en: 'No code generation, no deployment — those live in Team.',
            fr: 'Pas de génération de code ni de déploiement — c’est l’offre Team.' },
  },
  {
    id: 'team',
    eyebrow: { en: 'TIER III', fr: 'PALIER III' },
    name:    { en: 'Team',     fr: 'Team' },
    tagline: { en: 'Pocket team for continuous work.', fr: 'Équipe-poche pour les évolutions continues.' },
    price:   { en: '1 490€',   fr: '1 490€' },
    period:  { en: '/month',   fr: '/mois' },
    bullets: {
      en: [
        'Everything in Pro',
        'BUILD phase — Apex, LWC, Admin generation',
        'SFDX deployment to sandbox',
        'Opus 4.7 on opt-in (cost shown before each call)',
        'Multi-environment, git integration',
      ],
      fr: [
        'Tout le contenu de Pro',
        'Phase BUILD — génération Apex, LWC, Admin',
        'Déploiement SFDX vers sandbox',
        'Opus 4.7 en opt-in (coût affiché avant chaque appel)',
        'Multi-environnement, intégration git',
      ],
    },
    cta: { en: 'Coming soon', fr: 'Bientôt' },
    disabled: true,
    note: { en: 'Sandbox only — production deploys are reserved for Enterprise contracts.',
            fr: 'Sandbox uniquement — la mise en production est réservée aux contrats Enterprise.' },
  },
];

function Pricing({lang}) {
  const openSophie = (e) => {
    e.preventDefault();
    const launcher = document.querySelector('.sophie-launcher');
    if (launcher) launcher.click();
  };

  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
      <div className="section-head">
        <div className="num">{lang==='fr' ? '№ 04 · Le pacte' : '№ 04 · The pact'}</div>
        <div>
          <h2>{lang==='fr'
            ? <>Trois manières de <em>travailler avec nous</em>.</>
            : <>Three ways to <em>work with us</em>.</>}</h2>
          <p className="lede">{lang==='fr'
            ? 'Early access — l’ouverture se fait par paliers. Inscris-toi pour être prévenu·e.'
            : 'Early access — we’re opening in waves. Get on the list to be notified.'}</p>
        </div>
      </div>

      <div className="pricing-grid">
        {PRICING_TIERS.map((t) => (
          <article key={t.id} className={"pricing-card" + (t.featured ? " is-featured" : "")}>
            <div className="pricing-eyebrow">{t.eyebrow[lang] || t.eyebrow.en}</div>
            <div className="pricing-name">{t.name[lang] || t.name.en}</div>
            <div className="pricing-tagline">{t.tagline[lang] || t.tagline.en}</div>
            <div className="pricing-price">
              <span className="pricing-amount">{t.price[lang] || t.price.en}</span>
              <span className="pricing-period">{t.period[lang] || t.period.en}</span>
            </div>
            <ul className="pricing-bullets">
              {(t.bullets[lang] || t.bullets.en).map((b, i) => (
                <li key={i}><span className="pricing-bullet-mark">—</span><span>{b}</span></li>
              ))}
            </ul>
            {t.note && (
              <div className="pricing-note">{t.note[lang] || t.note.en}</div>
            )}
            {t.disabled ? (
              <span className="pricing-cta is-disabled" aria-disabled="true">
                {t.cta[lang] || t.cta.en}
              </span>
            ) : (
              <button type="button" className="pricing-cta" onClick={() => {
                if (t.id === 'free') {
                  window.location.href = 'https://app.digital-humans.fr/signup';
                } else if (typeof openSophie === 'function') {
                  openSophie();
                }
              }}>
                {t.cta[lang] || t.cta.en}
                <span className="pricing-cta-arrow">→</span>
              </button>
            )}
          </article>
        ))}
      </div>

      <div className="pricing-enterprise">
        <div className="pricing-enterprise-eyebrow">
          {lang==='fr' ? 'TIER IV · ENTERPRISE' : 'TIER IV · ENTERPRISE'}
        </div>
        <div className="pricing-enterprise-body">
          <div className="pricing-enterprise-text">
            <strong>{lang==='fr' ? 'Sur devis · on-premise.' : 'On request · on-premise.'}</strong>{' '}
            {lang==='fr'
              ? 'Installation chez vous, choix du LLM (Claude, GPT, Mistral, Llama), customisation projet, SSO, audit logs, déploiement en production négocié au contrat.'
              : 'Hosted on your infrastructure, your choice of LLM (Claude, GPT, Mistral, Llama), project-level customisation, SSO, audit logs, production deploys negotiated in the contract.'}
          </div>
          <button type="button" className="pricing-enterprise-cta" onClick={openSophie}>
            {lang==='fr' ? 'Nous contacter' : 'Talk to us'}
            <span className="pricing-cta-arrow">→</span>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}


function CTA({lang}) {
  const t = lang === 'en' ? {
    num: '№ 05 · Correspondence',
    title: <>Ship Salesforce like it’s <em>already shipped</em>.</>,
    sub: 'A 30-minute conversation with Sophie and one of our architects. We walk through your pipeline, your team, and the two or three places the ensemble can absorb work this quarter.',
    btn: 'Talk to Sophie', ghost: 'Read the journal',
  } : {
    num: '№ 05 · Correspondance',
    title: <>Livrez Salesforce comme si c’était <em>déjà livré</em>.</>,
    sub: 'Trente minutes avec Sophie et l’un de nos architectes. Nous parcourons votre pipeline, votre équipe, et les deux ou trois endroits où l’ensemble peut absorber du travail ce trimestre.',
    btn: 'Parler à Sophie', ghost: 'Lire le journal',
  };
  return (
    <section id="cta" className="cta">
      <div className="wrap">
        <div className="eyebrow" style={{display:'block', marginBottom:24}}>{t.num}</div>
        <div className="cta-body">
          <div>
            <h2>{t.title}</h2>
            <p>{t.sub}</p>
          </div>
          <div className="actions">
            <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.sophie-launcher')?.click(); window.scrollTo({top:0, behavior:'smooth'}); }} className="cta-btn">{t.btn} <span className="ar">→</span></a>
            <a href="https://digital-humans.fr/journal" className="btn-ghost" style={{justifyContent:'space-between'}}>{t.ghost} <span className="ar">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({lang}) {
  const left = lang === 'en' ? '— Paris · London · Remote-native' : '— Paris · Londres · Remote-native';
  const cgv  = lang === 'en' ? 'Terms of Sale' : 'CGV';
  const legal= lang === 'en' ? 'Legal'         : 'Mentions légales';
  const priv = lang === 'en' ? 'Privacy'       : 'Confidentialité';
  return (
    <footer>
      <div className="wrap row">
        <span>{left}</span>
        <span className="footer-legal">
          <a href="/cgv" className="footer-link">{cgv}</a>
          <span className="footer-sep">·</span>
          <a href="/legal" className="footer-link">{legal}</a>
          <span className="footer-sep">·</span>
          <a href="/privacy" className="footer-link">{priv}</a>
        </span>
        <span className="r"><a href="mailto:hello@digital-humans.fr" className="footer-mail">hello@digital-humans.fr</a> · MMXXV</span>
      </div>
    </footer>
  );
}

Object.assign(window, {OurAgents, CTA, Footer, ENSEMBLE, OurWork});
