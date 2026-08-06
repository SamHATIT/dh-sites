const PW='/usr/lib/node_modules/@executeautomation/playwright-mcp-server/node_modules/playwright';
const { chromium } = require(PW);
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  async function load(locale){
    const c=await b.newContext({viewport:{width:1280,height:900},locale});
    await c.addInitScript(()=>{try{localStorage.setItem('dh_intro_seen','1');}catch(e){}});
    const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file:///tmp/dh_fr.html',{waitUntil:'load',timeout:30000}).catch(()=>errs.push('goto'));
    await p.waitForFunction(()=>document.querySelector('h1'),{timeout:25000}).catch(()=>{});
    await p.waitForTimeout(1100);
    await p.evaluate(()=>{const i=document.getElementById('dh-intro');if(i)i.remove();});
    return {p,c,errs};
  }
  const fr=await load('fr-FR');
  const frTxt=await fr.p.evaluate(()=>document.body.innerText);
  const frLang=await fr.p.evaluate(()=>document.documentElement.lang);
  await fr.c.close();
  const en=await load('en-US');
  const enH1=await en.p.evaluate(()=>document.querySelector('h1').innerText);
  await en.p.evaluate(()=>{const el=[...document.querySelectorAll('button,a')].find(e=>/FR\s*·?\s*EN|switch to French/i.test((e.textContent||'')+(e.getAttribute('aria-label')||'')));if(el)el.click();});
  await en.p.waitForTimeout(500);
  const tgl=await en.p.evaluate(()=>document.querySelector('h1').innerText);
  await b.close();
  const need={hero:'Autonome par nature',benefits:'Quatre promesses',ceremony:'Un cérémonial',seq:'Une pièce',orch:'L’Orchestratrice',facon:'Le Façonneur',passeur:'Le Passeur',atelier:'théâtre d’opérations',regle:'une seule règle d’or',lead:'Accès anticipé',vous:'Inscrivez-vous',p4:'PALIER IV',close:'déjà en production'};
  const miss=Object.entries(need).filter(([k,v])=>!frTxt.includes(v)).map(([k])=>k);
  const bad=['Inscris-toi','Le Regisseur','Le Transmetteur','est témoin','respectons volontiers','TIER IV','Une production'].filter(x=>frTxt.includes(x));
  console.log('FR default <html lang>:',frLang,'| starts FR (h1):',frTxt.includes('Pas un outil'));
  console.log('FR sections MISSING:',miss.length?miss:'NONE');
  console.log('FR stale strings:',bad.length?bad:'NONE');
  console.log('FR JS errors:',fr.errs.slice(0,2).join('|')||'none');
  console.log('EN default h1:',JSON.stringify(enH1),'| errs:',en.errs.slice(0,2).join('|')||'none');
  console.log('EN->FR toggle h1:',JSON.stringify(tgl));
  console.log('PASS:', miss.length===0 && bad.length===0 && fr.errs.length===0 && en.errs.length===0 && /autonomous/i.test(enH1) && /Autonome/.test(tgl) && frLang==='fr');
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});
