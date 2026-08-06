(function(){
  if(window.__dhIntroInit) return; window.__dhIntroInit=1;
  var CSS=`
  #dh-intro{position:fixed;inset:0;z-index:9999;background:#0A0A0B;color:#F5F2EC;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:1;transition:opacity 1s cubic-bezier(0.4,0,0.2,1);}
  #dh-intro.dh-out{opacity:0;}
  #dh-intro .grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(245,242,236,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,242,236,0.04) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at 50% 42%,#000 25%,transparent 75%);mask-image:radial-gradient(ellipse at 50% 42%,#000 25%,transparent 75%);transform:scale(1.04);transition:transform 9s linear;}
  #dh-intro.dh-run .grid{transform:scale(1.0);}
  #dh-intro .halo{position:absolute;width:680px;height:680px;border-radius:50%;left:50%;top:42%;transform:translate(-50%,-50%) scale(0.6);background:radial-gradient(circle at 50% 50%,rgba(200,169,126,0.20),transparent 62%);filter:blur(10px);opacity:0;pointer-events:none;transition:opacity 1.6s ease, transform 2s ease;}
  #dh-intro.dh-lit .halo{opacity:1;transform:translate(-50%,-50%) scale(1);}
  #dh-intro.dh-pulse .halo{animation:dh-breath 2.2s ease-in-out 1;}
  @keyframes dh-breath{0%{opacity:0.7;transform:translate(-50%,-50%) scale(1);}45%{opacity:1;transform:translate(-50%,-50%) scale(1.12);}100%{opacity:0.85;transform:translate(-50%,-50%) scale(1.04);}}
  #dh-intro .dh-stage{position:relative;z-index:2;text-align:center;padding:0 32px;max-width:760px;}
  #dh-intro .dh-clock{font-family:var(--mono);font-size:13px;letter-spacing:6px;color:#C8A97E;opacity:0;transform:translateY(8px);transition:opacity 1s ease, transform 1s ease;margin-bottom:40px;}
  #dh-intro .dh-clock.on{opacity:1;transform:translateY(0);}
  #dh-intro .dh-clock::before{content:"\u25CF ";color:#6B5238;font-size:9px;vertical-align:2px;}
  #dh-intro .dh-narr{position:relative;height:1.2em;min-height:64px;}
  #dh-intro .dh-line{font-family:var(--serif);font-weight:400;font-size:clamp(30px,5.4vw,52px);letter-spacing:-0.02em;line-height:1.12;color:#F5F2EC;opacity:0;transform:translateY(14px);transition:opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 1.1s cubic-bezier(0.4,0,0.2,1);position:absolute;left:50%;top:50%;width:100%;translate:-50% -50%;padding:0 32px;}
  #dh-intro .dh-line.on{opacity:1;transform:translateY(0);}
  #dh-intro .dh-line em{font-style:italic;color:#C8A97E;text-shadow:0 0 24px rgba(200,169,126,0.35);}
  #dh-intro .dh-sub{font-family:var(--sans);font-size:15px;font-weight:400;color:#B8B2A6;letter-spacing:0.2px;line-height:1.6;margin-top:26px;opacity:0;transform:translateY(10px);transition:opacity 1s ease 0.3s, transform 1s ease 0.3s;}
  #dh-intro .dh-sub.on{opacity:1;transform:translateY(0);}
  #dh-intro .dh-telemetry{font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9A938A;margin-top:18px;opacity:0;transition:opacity 1s ease 0.5s;}
  #dh-intro .dh-telemetry.on{opacity:1;}
  #dh-intro .dh-telemetry .ok{color:#C8A97E;}
  #dh-intro .dh-logo{font-family:var(--serif);font-weight:500;font-size:clamp(38px,6vw,64px);letter-spacing:-0.02em;color:#F5F2EC;opacity:0;transform:translateY(12px);transition:opacity 1.2s ease, transform 1.2s ease;}
  #dh-intro .dh-logo.on{opacity:1;transform:translateY(0);}
  #dh-intro .dh-logo .dot{color:#8C6E4A;}
  #dh-intro .dh-logo em{font-style:italic;color:#C8A97E;}
  #dh-intro .dh-logo .tag{display:block;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#9A938A;margin-top:18px;}
  #dh-intro .dh-skip{position:fixed;top:20px;right:22px;z-index:10000;font-family:var(--mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#D8BE96;background:transparent;border:1px solid rgba(200,169,126,0.55);border-radius:2px;padding:8px 14px;cursor:pointer;transition:color .2s ease, border-color .2s ease, background .2s ease;}
  #dh-intro .dh-skip:hover,#dh-intro .dh-skip:focus-visible{color:#0A0A0B;background:#C8A97E;border-color:#C8A97E;outline:none;}
  #dh-intro .dh-skip:focus-visible{box-shadow:0 0 0 2px rgba(200,169,126,0.4);}
  `;
  var MARKUP='<div id="dh-intro" role="dialog" aria-label="Intro" aria-live="polite"><div class="grid"></div><div class="halo"></div><button class="dh-skip" type="button" aria-label="Skip intro">Skip \u23CE</button><div class="dh-stage"><div class="dh-clock" id="dh-clock">05:00</div><div class="dh-narr" id="dh-narr"></div><div class="dh-sub" id="dh-sub"></div><div class="dh-telemetry" id="dh-tel"></div><div class="dh-logo" id="dh-logo" style="display:none">Digital<span class="dot">\u00B7</span><em>Humans</em><span class="tag" id="dh-tagline"></span></div></div></div>';
  function run(intro){
    var lang=(window.__dhLang)||(function(){try{return localStorage.getItem("dh-lang");}catch(e){return null;}}())||(document.documentElement.lang||"en").slice(0,2);
    if(lang!=="fr") lang="en";
    var T={en:{lines:["The city sleeps.","Yours did, hours ago.","Ours <em>didn\u2019t</em>."],sub:"Eleven specialists. One orchestrator. Working through the night.",tel:"scope <span class=\"ok\">\u2713</span> \u00B7 build <span class=\"ok\">\u2713</span> \u00B7 tests 94%",resolve:"By the time you\u2019re awake, the work is done.",tagline:"A studio that never sleeps."},
      fr:{lines:["La ville dort.","La v\u00F4tre aussi, depuis des heures.","<em>Pas la n\u00F4tre.</em>"],sub:"Onze sp\u00E9cialistes. Un orchestrateur. Toute la nuit.",tel:"p\u00E9rim\u00E8tre <span class=\"ok\">\u2713</span> \u00B7 build <span class=\"ok\">\u2713</span> \u00B7 tests 94%",resolve:"\u00C0 votre r\u00E9veil, le travail est fait.",tagline:"Un studio qui ne dort jamais."}}[lang];
    var clock=intro.querySelector("#dh-clock"),narr=intro.querySelector("#dh-narr"),sub=intro.querySelector("#dh-sub"),tel=intro.querySelector("#dh-tel"),logo=intro.querySelector("#dh-logo"),tagEl=intro.querySelector("#dh-tagline"),skipBtn=intro.querySelector(".dh-skip");
    var timers=[],done=false;
    function after(ms,fn){timers.push(setTimeout(fn,ms));}
    var lineEls=T.lines.map(function(html){var d=document.createElement("div");d.className="dh-line";d.innerHTML=html;narr.appendChild(d);return d;});
    tagEl.textContent=T.tagline;
    function runClock(from,to,dur){var start=performance.now();(function tick(now){if(done)return;var p=Math.min(1,(now-start)/dur);var v=Math.round(from+(to-from)*p);var h=Math.floor(v/60),m=v%60;clock.lastChild.nodeValue=(h<10?"0":"")+h+":"+(m<10?"0":"")+m;if(p<1)requestAnimationFrame(tick);})(start);}
    function teardown(){if(done)return;done=true;timers.forEach(clearTimeout);try{localStorage.setItem("dh_intro_seen","1");}catch(e){}intro.classList.add("dh-out");document.removeEventListener("keydown",onKey);setTimeout(function(){intro.parentNode&&intro.parentNode.removeChild(intro);var st=document.getElementById("dh-intro-style");st&&st.parentNode&&st.parentNode.removeChild(st);},1050);}
    function onKey(e){if(e.key==="Escape")teardown();}
    var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var seen=false;try{seen=localStorage.getItem("dh_intro_seen")==="1";}catch(e){}
    if(reduce||seen){if(reduce&&!seen){logo.style.display="block";requestAnimationFrame(function(){logo.classList.add("on");intro.classList.add("dh-lit");});after(1100,teardown);}else{intro.parentNode&&intro.parentNode.removeChild(intro);var st0=document.getElementById("dh-intro-style");st0&&st0.parentNode&&st0.parentNode.removeChild(st0);}return;}
    skipBtn.addEventListener("click",teardown);document.addEventListener("keydown",onKey);try{skipBtn.focus({preventScroll:true});}catch(e){}
    requestAnimationFrame(function(){
      intro.classList.add("dh-run");
      after(150,function(){intro.classList.add("dh-lit");clock.classList.add("on");});
      after(1400,function(){lineEls[0].classList.add("on");});
      after(2900,function(){lineEls[0].classList.remove("on");after(550,function(){lineEls[1].classList.add("on");});});
      after(4400,function(){lineEls[1].classList.remove("on");after(550,function(){lineEls[2].classList.add("on");});});
      after(5700,function(){lineEls[2].classList.remove("on");after(450,function(){sub.innerHTML=T.sub;sub.classList.add("on");tel.innerHTML=T.tel;tel.classList.add("on");runClock(300,407,1700);});});
      after(7600,function(){sub.classList.remove("on");tel.classList.remove("on");lineEls[2].innerHTML=T.resolve;after(420,function(){lineEls[2].classList.add("on");});});
      after(9100,function(){lineEls[2].classList.remove("on");clock.classList.remove("on");after(500,function(){logo.style.display="block";requestAnimationFrame(function(){logo.classList.add("on");intro.classList.add("dh-pulse");});});});
      after(11400,teardown);
    });
  }
  function build(){
    if(document.getElementById("dh-intro")||!document.body) return;
    var st=document.createElement("style");st.id="dh-intro-style";st.textContent=CSS;document.head.appendChild(st);
    var wrap=document.createElement("div");wrap.innerHTML=MARKUP;var intro=wrap.firstChild;document.body.appendChild(intro);
    run(intro);
  }
  var tries=0;var iv=setInterval(function(){tries++;if((document.body&&document.getElementById("root"))||tries>80){clearInterval(iv);build();}},40);
})();
