const PW='/usr/lib/node_modules/@executeautomation/playwright-mcp-server/node_modules/playwright';
const { chromium } = require(PW);
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const c=await b.newContext({viewport:{width:1280,height:900}});
  await c.addInitScript(()=>{try{localStorage.setItem('dh_intro_seen','1');}catch(e){}});
  const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file:///tmp/dh_fr.html',{waitUntil:'load',timeout:45000}).catch(e=>errs.push('goto'+e.message));
  await p.waitForFunction(()=>document.querySelector('h1')!==null,{timeout:40000}).catch(()=>{});
  await p.waitForTimeout(1800);
  await p.evaluate(()=>{const i=document.getElementById('dh-intro');if(i)i.remove();});
  const en=await p.evaluate(()=>({h1:document.querySelector('h1').innerText,sub:document.querySelector('.hero .sub')?.innerText||''}));
  // toggle FR
  await p.evaluate(()=>{const el=[...document.querySelectorAll('button,a')].find(e=>/FR\s*·?\s*EN|switch to French/i.test((e.textContent||'')+(e.getAttribute('aria-label')||'')));if(el)el.click();});
  await p.waitForTimeout(700);
  const fr=await p.evaluate(()=>({h1:document.querySelector('h1').innerText,sub:document.querySelector('.hero .sub')?.innerText||''}));
  await b.close();
  console.log('EN h1:',JSON.stringify(en.h1));
  console.log('FR h1:',JSON.stringify(fr.h1));
  console.log('FR sub:',JSON.stringify(fr.sub));
  const ok = fr.h1.includes('Autonome par nature') && fr.sub.includes('Onze spécialistes') && fr.sub.includes('en a tous les codes') && fr.sub.includes('il ne dort jamais') && !fr.sub.includes('comporte comme tel') && en.h1.includes('autonomous');
  console.log('PASS:',ok,'| errors:',errs.slice(0,3).join('|')||'none');
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});
