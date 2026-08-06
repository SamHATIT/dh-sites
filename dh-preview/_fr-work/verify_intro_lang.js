const PW='/usr/lib/node_modules/@executeautomation/playwright-mcp-server/node_modules/playwright';
const { chromium } = require(PW);
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  async function introText(locale){
    const c=await b.newContext({viewport:{width:1280,height:900},locale}); // fresh: no dh_intro_seen
    const p=await c.newPage();
    await p.goto('file:///tmp/dh_fr.html',{waitUntil:'load',timeout:25000}).catch(()=>{});
    await p.waitForTimeout(1600);
    const t=await p.evaluate(()=>{const i=document.getElementById('dh-intro');return i?i.innerText:'(no overlay)';});
    await c.close(); return t.replace(/\n+/g,' | ').slice(0,180);
  }
  const fr=await introText('fr-FR');
  const en=await introText('en-US');
  await b.close();
  console.log('INTRO (fr-FR):',JSON.stringify(fr));
  console.log('INTRO (en-US):',JSON.stringify(en));
  console.log('PASS:', /dort|sp\u00e9cialistes|n\u00f4tre/i.test(fr) && /sleep|specialists|ours/i.test(en));
})().catch(e=>{console.error('FATAL',e.message);process.exit(1);});
