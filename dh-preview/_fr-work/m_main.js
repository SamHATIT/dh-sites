function Benefits({lang}) {
  const t = lang === 'en' ? {
    num: '№ 01 · The case',
    title: <>Four <em>promises</em>, measured.</>,
    lede: (<><span style={{letterSpacing:'0.08em', fontWeight: 600}}>WE BELIEVE</span> that Salesforce consulting is evolving, often too slow. too expensive. too rigid. We replace the consultancy pattern — pitch, estimate, staff, wait — with a studio pattern: a standing ensemble, a composed sequence, and a first deliverable on your desk before the first invoice.</>),
    items: [
      {n:'01', t:<>Accelerated <em>delivery</em></>,      d:'Project timelines compress from months to days. The ensemble drafts in parallel and hands you work ready to review — not ready to revise.', I: Speed},
      {n:'02', t:<>Systematic <em>accuracy</em></>,       d:'Every deliverable passes through QA and Architecture before it reaches you. Human error is a systemic failure, not a line item.', I: Accuracy},
      {n:'03', t:<>Honest <em>economics</em></>,          d:'A flat engagement fee, a fixed deliverable sequence, and a measurable reduction in total cost of ownership — typically 40–70%.', I: Cost},
      {n:'04', t:<>Traceable <em>ceremony</em></>,        d:'Every agent decision is logged. Every sign-off is witnessed. You set the rules once; the ensemble enforces them on every pass.', I: Security},
    ],
  } : {
    num: '№ 01 · L\u2019argument',
    title: <>Quatre <em>promesses</em>, mesurées.</>,
    lede: (<><span style={{letterSpacing:'0.08em', fontWeight: 600}}>NOUS CROYONS</span> que le conseil Salesforce évolue, souvent trop lent. trop cher. trop rigide. Nous remplaçons le modèle du conseil — pitch, devis, équipe, attente — par un modèle de studio : un ensemble permanent, une séquence composée, un premier livrable sur votre bureau avant la première facture.</>),
    items: [
      {n:'01', t:<>Livraison <em>accélérée</em></>,      d:'Les délais passent de mois à jours. L\u2019ensemble rédige en parallèle et vous remet un travail prêt à relire — pas prêt à reprendre.', I: Speed},
      {n:'02', t:<>Exactitude <em>systémique</em></>,    d:'Chaque livrable traverse la QA et l\u2019architecture avant de vous parvenir. L\u2019erreur humaine est une défaillance systémique.', I: Accuracy},
      {n:'03', t:<>Économie <em>honnête</em></>,         d:'Un forfait fixe, une séquence définie, une baisse mesurable du coût total — typiquement 40 à 70 %.', I: Cost},
      {n:'04', t:<>Cérémonie <em>traçable</em></>,       d:'Chaque décision d\u2019agent est consignée. Chaque validation est témoin. Vous définissez les règles une fois ; l\u2019ensemble les applique à chaque passe.', I: Security},
    ],
  };
  return (
    <section id="benefits" className="block">
      <div className="wrap">
        <div className="section-head">
          <div className="num">{t.num}</div>
          <div>
            <h2>{t.title}</h2>
            <p className="lede">{t.lede}</p>
          </div>
        </div>
        <div className="benefits-grid">
          {t.items.map(b => (
            <div key={b.n} className="benefit">
              <div className="num">— Act I · Benefit {b.n}</div>
              <div className="ic"><b.I size={36}/></div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({lang}) {
  const R = (window.__resources || {});
  const AV = s => R['av' + s[0].toUpperCase() + s.slice(1)] || `../assets/avatars/${s}.svg`;

  const t = lang === 'en' ? {
    num: '№ 02 · The sequence',
    title: (<>A <em>five-act</em> production.</>),
    lede: 'Every engagement follows the same score. The ensemble shifts; the sequence does not. Scroll through the five acts.',
    steps: [
      {r:'I', c:'var(--indigo)', t:(<>Direction <em>sets scope</em></>),
        d:'A 30-minute brief with your sponsor. Sophie returns a signed scope document and a staffing plan within the hour.',
        detail:(<><span className="k">in</span>  brief.md, stakeholders.yaml<br/><span className="k">out</span> scope.v1.md <span className="pass">✓ signed</span><br/><span className="k">ttl</span> 00:47:12</>),
        agents:[{n:'Sophie Chen', role:'Project Manager · Orchestrator', ac:'#8B5CF6', av:'sophie', lines:['Sophie never speaks louder than necessary.','While you sleep, she reads your requirements. 300 pages in 4 minutes.']}]},
      {r:'II', c:'var(--plum)', t:(<>Visionaries <em>draft</em></>),
        d:'Business Analyst, Architect, and Research compose an SDS and reference design — both drafts are on your desk within the first day.',
        detail:(<><span className="k">out</span> sds.v1.md, adr-*.md<br/><span className="k">out</span> reference-design.fig<br/><span className="pass">✓ 14 passed</span>  <span className="run">2 in review</span></>),
        agents:[
          {n:'Olivia Parker', role:'Business Analyst · The Interpreter', ac:'#3B82F6', av:'olivia', lines:['Olivia understands what you really want. Even when you don’t know how to explain it.']},
          {n:'Marcus Johnson', role:'Solution Architect · The Builder of Shapes', ac:'#F97316', av:'marcus', lines:['Marcus transforms needs into architecture. ADRs. Patterns. Solid decisions.']},
          {n:'Emma Rodriguez', role:'Research Analyst · The Verifier', ac:'#06B6D4', av:'emma',   lines:['Emma verifies at each team decision that the proposed solution matches your request.','Zero ambiguity. Zero interpretation.']},
        ]},
      {r:'III', c:'var(--terra)', t:(<>Builders <em>compose</em></>),
        d:'Apex, LWC, and Admin work in parallel against the SDS. Each commit carries a test suite, a changelog entry, and an architect approval.',
        detail:(<><span className="k">branch</span> feature/*<br/><span className="k">coverage</span> <span className="pass">94%</span><br/><span className="k">reviews</span> MJ +3 · <span className="pass">approved</span></>),
        agents:[
          {n:'Diego Martinez', role:'Apex Developer · The Pianist', ac:'#EF4444', av:'diego', lines:['Diego writes Apex code like a pianist. Bulkified. Efficient. 94.3% coverage.']},
          {n:'Zara Thompson', role:'LWC Developer · The Painter', ac:'#22C55E', av:'zara',  lines:['Zara paints LWC interfaces. “Why didn’t we do this before?”']},
          {n:'Raj Patel', role:'Administrator · The No-Code Wizard', ac:'#EAB308', av:'raj',   lines:['Raj configures without coding. “Code is for complex cases.”']},
        ]},
      {r:'IV', c:'var(--sage)', t:(<>Guardians <em>witness</em></>),
        d:'QA ruthlessly regresses against the SDS. Data Migration prepares cutover artefacts. Nothing moves to Stage without a clean sheet.',
        detail:(<><span className="k">regression</span> <span className="pass">0 critical</span><br/><span className="k">migration</span> dry-run <span className="pass">ok</span><br/><span className="k">sign-off</span> EV <span className="pass">✓</span></>),
        agents:[
          {n:'Aisha Okonkwo', role:'Data Specialist · The Curator', ac:'#92400E', av:'aisha', lines:['Aisha migrates your data without losing a comma. 2 million records? 12 minutes.']},
          {n:'Elena Vasquez', role:'QA Engineer · The Guardian', ac:'#6B7280', av:'elena', lines:['Elena tests what no one thinks to test. 89% coverage. Systematically.']},
        ]},
      {r:'V', c:'var(--slate)', t:(<>The Stage <em>delivers</em></>),
        d:'DevOps ships. The Trainer ships the humans. You wake up on Monday with a production org and a team who already know how to use it.',
        detail:(<><span className="k">deploy</span> prod @ 03:14 <span className="pass">✓</span><br/><span className="k">runbook</span> handed off<br/><span className="k">training</span> 4 sessions booked</>),
        agents:[
          {n:'Jordan Blake', role:'DevOps Engineer · The Stagehand', ac:'#1E40AF', av:'jordan', lines:['Jordan deploys stress-free. CI/CD. GitHub. Production in 8 minutes.']},
          {n:'Lucas Fernandez', role:'Trainer · The Transmitter', ac:'#D946EF', av:'lucas',  lines:['Lucas trains your teams. Zero resistance to change.']},
        ]},
    ],
  } : {
    num: '№ 02 · La séquence',
    title: (<>Une production <em>en cinq actes</em>.</>),
    lede: 'Chaque engagement suit la même partition. L’ensemble varie ; la séquence, jamais. Faites défiler les cinq actes.',
    steps: [
      {r:'I', c:'var(--indigo)', t:(<>La Direction <em>fixe</em></>),
        d:'Un brief de 30 minutes avec votre sponsor. Sophie renvoie un document de cadrage signé et un plan d’équipe dans l’heure.',
        detail:(<><span className="k">in</span>  brief.md<br/><span className="k">out</span> scope.v1.md <span className="pass">✓ signé</span><br/><span className="k">ttl</span> 00:47:12</>),
        agents:[{n:'Sophie Chen', role:'Chef de projet · Chef d’orchestre', ac:'#8B5CF6', av:'sophie', lines:['Sophie ne parle jamais plus fort que nécessaire.','Pendant que vous dormez, elle lit vos requirements. 300 pages en 4 minutes.']}]},
      {r:'II', c:'var(--plum)', t:(<>Les Visionnaires <em>rédigent</em></>),
        d:'BA, architecte et recherche composent le SDS et le design de référence, livrés sous 24 heures.',
        detail:(<><span className="k">out</span> sds.v1.md<br/><span className="pass">✓ 14 validés</span></>),
        agents:[
          {n:'Olivia Parker', role:'Business Analyst · L’Interprete', ac:'#3B82F6', av:'olivia', lines:['Olivia comprend ce que vous voulez vraiment. Même quand vous ne savez pas l’expliquer.']},
          {n:'Marcus Johnson', role:'Architecte Solution · Le Batisseur', ac:'#F97316', av:'marcus', lines:['Marcus transforme les besoins en architecture. ADRs. Patterns. Décisions solides.']},
          {n:'Emma Rodriguez', role:'Research Analyst · La Verificatrice', ac:'#06B6D4', av:'emma',   lines:['Emma vérifie à chaque décision de l’équipe que la solution proposée correspond bien à votre demande.','Zéro ambiguïté. Zéro interprétation.']},
        ]},
      {r:'III', c:'var(--terra)', t:(<>Les Bâtisseurs <em>composent</em></>),
        d:'Apex, LWC et Admin travaillent en parallèle contre le SDS. Chaque commit porte tests, changelog et validation architecte.',
        detail:(<><span className="k">coverage</span> <span className="pass">94%</span><br/><span className="k">reviews</span> MJ <span className="pass">✓</span></>),
        agents:[
          {n:'Diego Martinez', role:'Développeur Apex · Le Pianiste', ac:'#EF4444', av:'diego', lines:['Diego écrit du code Apex comme un pianiste. Bulkified. Efficient. 94.3% de couverture.']},
          {n:'Zara Thompson', role:'Développeuse LWC · La Peintre', ac:'#22C55E', av:'zara',  lines:['Zara peint des interfaces LWC. « Pourquoi ne l’a-t-on pas fait avant ? »']},
          {n:'Raj Patel', role:'Administrateur · Le Magicien No-Code', ac:'#EAB308', av:'raj',   lines:['Raj configure sans coder. « Le code, c’est pour les cas complexes. »']},
        ]},
      {r:'IV', c:'var(--sage)', t:(<>Les Gardiens <em>attestent</em></>),
        d:'La QA régresse sans pitié. Migration prépare la bascule. Rien ne passe sans sceau.',
        detail:(<><span className="k">regression</span> <span className="pass">0 critique</span><br/><span className="k">sign-off</span> EV <span className="pass">✓</span></>),
        agents:[
          {n:'Aisha Okonkwo', role:'Spécialiste Data · La Curatrice', ac:'#92400E', av:'aisha', lines:['Aisha migre vos données sans perdre une virgule. 2 millions de records ? 12 minutes.']},
          {n:'Elena Vasquez', role:'Ingénieure QA · La Gardienne', ac:'#6B7280', av:'elena', lines:['Elena teste ce que personne ne pense à tester. 89% de couverture. Systématiquement.']},
        ]},
      {r:'V', c:'var(--slate)', t:(<>La Scène <em>livre</em></>),
        d:'DevOps déploie. Le formateur transmet. Vous arrivez lundi sur un org en prod avec une équipe déjà formée.',
        detail:(<><span className="k">deploy</span> prod <span className="pass">✓</span><br/><span className="k">training</span> 4 sessions</>),
        agents:[
          {n:'Jordan Blake', role:'Ingénieur DevOps · Le Regisseur', ac:'#1E40AF', av:'jordan', lines:['Jordan déploie sans stress. CI/CD. GitHub. Production en 8 minutes.']},
          {n:'Lucas Fernandez', role:'Formateur · Le Transmetteur', ac:'#D946EF', av:'lucas',  lines:['Lucas forme vos équipes. Zéro résistance au changement.']},
        ]},
    ],
  };
  const {useState, useEffect, useRef} = React;
  const scrollerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const goTo = (idx) => {
    const el = scrollerRef.current;
    if (!el) return;
    const total = t.steps.length;
    const clamped = Math.max(0, Math.min(total - 1, idx));
    el.scrollTo({left: clamped * el.clientWidth, behavior: 'smooth'});
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        setActiveIdx(idx);
      });
    };
    el.addEventListener('scroll', onScroll, {passive: true});
    return () => { el.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  const isFirst = activeIdx === 0;
  const isLast = activeIdx === t.steps.length - 1;

  return (
    <section id="how" className="block">
      <div className="wrap">
        <div className="section-head">
          <div className="num">{t.num}</div>
          <div>
            <h2>{t.title}</h2>
            <p className="lede">{t.lede}</p>
          </div>
        </div>
        <div className="sequence-container">
          <div className="steps" ref={scrollerRef}>
            {t.steps.map((s,i) => (
              <div key={i} className="step">
                <div className="step-head">
                  <div className="num">{s.r}</div>
                  <div className="step-title"><h3>{s.t}</h3></div>
                </div>
                <div className="step-body">
                  <div className="step-photo-col">
                    {s.agents.map((a,j) => (
                      <div key={j} className="agent-card" style={{'--ac': a.ac || 'var(--brass)'}}>
                        <div className="hero-photo"><img src={AV(a.av)} alt={a.n}/></div>
                        <div className="hero-meta">
                          <div className="hero-name">{a.n}</div>
                          <div className="hero-role"><span className="role-label">{a.role.split(' · ')[0]}</span>{a.role.includes(' · ') && (<span className="role-tag">{a.role.split(' · ').slice(1).join(' · ')}</span>)}</div>
                          {a.lines.map((ln,k) => (<div key={k} className="hero-line">{ln}</div>))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="step-meta-col">
                    <div className="detail">{s.detail}</div>
                    <div className="step-desc">{s.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="seq-arrow seq-prev" onClick={() => goTo(activeIdx - 1)} disabled={isFirst} aria-label="Previous act">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button className="seq-arrow seq-next" onClick={() => goTo(activeIdx + 1)} disabled={isLast} aria-label="Next act">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <div className="seq-dots" role="tablist" aria-label="Act navigation">
          {t.steps.map((s,i) => (
            <button
              key={i}
              role="tab"
              className={'seq-dot' + (i === activeIdx ? ' active' : '')}
              style={{'--c': s.c}}
              onClick={() => goTo(i)}
              aria-label={'Act ' + s.r}
              aria-selected={i === activeIdx ? 'true' : 'false'}
              aria-current={i === activeIdx ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {Benefits, HowItWorks});
