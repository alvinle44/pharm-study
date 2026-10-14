// ===== PHAR 117 exam section UI =====
const TIMELINE = [
 [1848,"Drug Importation Act","Adulterated imported quinine; soldiers died in the Mexican War","Imported drugs must be inspected; USP recognised"],
 [1902,"Biologics Control Act","Tetanus-contaminated diphtheria antitoxin killed 13 children in St. Louis","First premarket approval (biologics); Hygienic Laboratory → NIH"],
 [1906,"Pure Food and Drugs Act","Patent medicines with cocaine/opium; The Jungle","Banned misbranded/adulterated products — but no proof of safety"],
 [1938,"FD&C Act","Elixir Sulfanilamide in diethylene glycol — 107 deaths","Safety before marketing; created the NDA"],
 [1951,"Durham-Humphrey Amendment","No legal line between Rx and OTC","Created Rx vs OTC categories; 503(b)(3) switch power"],
 [1962,"Kefauver-Harris Amendments","Thalidomide → phocomelia","Efficacy required; IND; informed consent"],
 [1983,"Orphan Drug Act","Rare diseases too small a market to develop for","7-yr exclusivity, tax credits, PDUFA fee waiver, grants"],
 [1984,"Hatch-Waxman Act","Need for generic competition","ANDA + 505(b)(2); patent term restoration; 180-day exclusivity"],
 [1992,"PDUFA","Slow, unpredictable reviews; AIDS crisis","Industry user fees in exchange for review-time goals"],
 [1997,"FDAMA","Codify and extend the PDUFA bargain","Pediatric exclusivity; ClinicalTrials.gov; Fast Track formalised"],
 [2007,"FDAAA","Vioxx, Rezulin and SSRI safety problems after approval","Required post-marketing studies, label changes, REMS"],
 [2010,"BPCIA","No abbreviated route for copies of biologics","Biosimilar pathway (351(k)); 12-yr reference exclusivity"],
 [2022,"FDORA","Accelerated approvals left without confirmation","Confirmatory trial underway before AA; expedited withdrawal"],
 [2022,"FDA Modernization Act 2.0","Animal models predict human results poorly","Animal testing no longer statutorily required"],
 [2022,"Inflation Reduction Act","High drug prices in Medicare","Medicare negotiates prices (7 yrs small molecule, 11 yrs biologic)"]
];
const NUMS = [ // quick-fire numbers
 ["NCE exclusivity","5 years",["3 years","5 years","7 years","12 years"]],
 ["New clinical investigation exclusivity","3 years",["3 years","5 years","6 months","7 years"]],
 ["Orphan drug exclusivity","7 years",["5 years","7 years","10 years","12 years"]],
 ["Pediatric exclusivity","+6 months",["+3 months","+6 months","+1 year","+2 years"]],
 ["Biologic (reference product) exclusivity","12 years",["5 years","7 years","10 years","12 years"]],
 ["Patent term","~20 years from filing",["~14 years from approval","~20 years from filing","~20 years from approval","~12 years from filing"]],
 ["Rare disease threshold","< 200,000 people in US",["< 20,000","< 100,000","< 200,000 people in US","< 1 million"]],
 ["Standard review goal","10 months",["6 months","10 months","12 months","18 months"]],
 ["Priority review goal","6 months",["3 months","6 months","8 months","10 months"]],
 ["IND waiting period","30 days",["30 days","60 days","6 months","No wait"]],
 ["NDA filing decision","60 days",["30 days","60 days","90 days","10 months"]],
 ["PDUFA reauthorisation","Every 5 years",["Every year","Every 3 years","Every 5 years","Every 10 years"]],
 ["FY2026 PDUFA fee with clinical data","$4.68M",["$442K","$2.34M","$4.68M","$9.4M"]],
 ["FY2026 PDUFA fee without clinical data","$2.34M",["$442K","$2.34M","$4.68M","$1.2M"]],
 ["FY2026 annual program fee","$442K",["$442K","$2.34M","$4.68M","$100K"]],
 ["Discovery to approval","10–15 years",["3–5 years","5–8 years","10–15 years","20–25 years"]],
 ["Cost per approved drug (Deloitte 2024)","~$2.2B",["$708M","~$2.2B","$4.6B","$500M"]],
 ["% of Phase I drugs approved","7.9%",["2%","7.9%","25%","58%"]],
 ["Novel drugs approved by CDER in 2025","46",["25","46","90","120"]],
 ["Phase I → II success","~50%",["~10%","~30%","~50%","~90%"]],
 ["Phase II → III success","~30%",["~30%","~50%","~58%","~91%"]],
 ["Phase III → NDA/BLA","~58%",["~30%","~58%","~75%","~91%"]],
 ["Generics: share of Rx / share of spending","90% / 12%",["50% / 50%","70% / 30%","90% / 12%","95% / 2%"]],
 ["Bioequivalence 90% CI limits","80–125%",["90–110%","80–120%","80–125%","70–143%"]],
 ["Hatch-Waxman patent term restoration (max)","5 years",["2 years","5 years","7 years","14 years"]],
 ["Hatch-Waxman stay on generic approval","30 months",["6 months","180 days","30 months","5 years"]],
 ["First Para IV filer exclusivity","180 days",["90 days","180 days","1 year","3 years"]],
 ["Phase I size","20–100",["20–100","100–300","300–3,000","Thousands+"]],
 ["Phase I / II / III duration","~1.5 / 2.5 / 3.5 yrs",["~1 / 1 / 1 yrs","~1.5 / 2.5 / 3.5 yrs","~3 / 3 / 3 yrs","~0.5 / 1 / 5 yrs"]]
];
const DECK_NAMES = {all:"All", dd1:"Part 1 basics", acts:"Acts, patents & numbers", dd2:"Part 2 development", dd3:"Part 3 generics/OTC/biosimilars", case:"Case studies"};
const OC_TOPIC = {"o-bond":"Bonding","o-imf":"IMF","o-np":"Groups","o-p":"Groups","o-ab":"Acid/base","o-sol":"Solubility","o-misc":"Design"};
const CONF = ["Shaky","OK","Solid"];
const CASES=[{name:"Ozempic", guide:"g-case", pre:"cq", qs:CASE_QS, intro:"Semaglutide for type 2 diabetes"},{name:"Wegovy", guide:"g-case2", pre:"wq", qs:WEGOVY_QS, intro:"Semaglutide for weight loss"}];

function xs(){ state.ex=state.ex||{subj:"dd",tab:"guide",conf:{},qs:{},gen:[],deck:"all",starOnly:false,cram:false,cdeck:"all"}; return state.ex; }
const md = s => esc(s).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\*([^*]+)\*/g,"<i>$1</i>");
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
let xq=null, xcard=null, xtl=null, xcalc=null, xcase=null, xgenBusy=false;

// ---- data accessors ----
function allExamCards(subj){
  if(subj==="oc") return OC_CARDS.map(([id,deck,f,b])=>({key:"x|"+id, id, deck, star:0, f, b}));
  const c=DD_CARDS.map(([id,deck,lo,star,f,b])=>({key:"x|"+id, id, deck, lo, star, f, b}));
  CASES.forEach(cs=>cs.qs.forEach((q,i)=>c.push({key:"x|"+cs.pre+i, id:cs.pre+i, deck:"case", lo:"P1-12", star:1, f:cs.name+" Q"+(i+1)+": "+q.q, b:q.a})));
  return c;
}
function allMcq(subj){
  if(subj==="oc") return OC_PRACTICE.map(([n,q,o,a,w])=>({id:"op"+n, set:"practice", topic:"Practice exam", n, q, o, a, w}))
    .concat(OC_MCQ.map(([id,t,q,o,a,w])=>({id, set:"new", topic:t, q, o, a, w})))
    .concat((xs().gen||[]).filter(g=>g.subj==="oc").map(g=>({...g, set:"ai"})));
  return DD_MCQ.map(([id,t,lo,q,o,a,w])=>({id, set:t, topic:DECK_NAMES[t]||t, lo, q, o, a, w}))
    .concat((xs().gen||[]).filter(g=>g.subj==="dd").map(g=>({...g, set:"ai"})));
}
function quizAcc(subj){ const ids=allMcq(subj).map(q=>q.id), st=xs().qs; let r=0,t=0; ids.forEach(id=>{ const s=st[id]; if(s){ t++; r+=s.last?1:0; } }); return {r,t,n:ids.length}; }
function examMastery(subj){
  const cards=allExamCards(subj), cs=cards.reduce((a,c)=>a+cardStrength(c.key),0)/Math.max(1,cards.length);
  const q=quizAcc(subj), qa=q.n? q.r/q.n : 0; // unanswered count as 0
  return Math.round((cs*0.5+qa*0.5)*100);
}
const examDue = subj => allExamCards(subj).filter(c=>isDue(c.key)).length;

// ---- shell ----
function renderExam(){
  const x=xs(), card=document.getElementById("card");
  const dd=examMastery("dd"), oc=examMastery("oc"), due=examDue(x.subj);
  document.getElementById("stats").innerHTML=(state.game?`<span class="pill o">Lv ${levelInfo().lvl}</span>`:"")+`<span class="pill ${due?"w":"g"}">${due} cards due</span><span class="pill a">${streak()}-day streak</span>`;
  document.getElementById("xbar").innerHTML=`
    <div class="xsubj seg" role="group" aria-label="Subject"><button data-xs="dd" aria-pressed="${x.subj==="dd"}">Drug development</button><button data-xs="oc" aria-pressed="${x.subj==="oc"}">Pharm chem (ochem)</button></div>
    <div class="xmast"><span class="lbl">Drug dev</span>${bar(dd)}<span class="num">${dd}%</span><span class="lbl">Ochem</span>${bar(oc)}<span class="num">${oc}%</span></div>
    <div class="modes xtabs" role="group" aria-label="Exam tools">${[["guide","Guide"],["cards","Cards"],["quiz","Quiz"],[x.subj==="dd"?"case":"calc",x.subj==="dd"?"Case":"Calc"],[x.subj==="dd"?"time":"calc2",x.subj==="dd"?"Timeline":"Practice"],["dose",x.subj==="dd"?"Dose calc":"Formulas"]].map(([k,l])=>`<button data-xt="${k}" aria-pressed="${x.tab===k}">${l}</button>`).join("")}</div>`;
  if(x.subj==="oc" && ["case","time"].includes(x.tab)) x.tab="calc";
  if(x.subj==="dd" && ["calc","calc2"].includes(x.tab)) x.tab="case";
  ({guide:xGuide, cards:xCards, quiz:xQuiz, case:xCase, time:xTime, calc:xCalc, calc2:xPractice, dose:x.subj==="dd"?xDose:xFormulas})[x.tab](card);
}

// ---- Guide ----
function xGuide(card){
  const x=xs(), so=x.starOnly;
  if(x.subj==="oc"){
    card.innerHTML=`<div class="rx"><h2>Pharm chem study guide</h2></div>
      <p class="hint">From his study guide. No need to memorize specific drug or excipient structures. Practice exam questions get reworded, so learn the concept behind each answer.</p>
      ${OC_GUIDE.map(s=>`<details class="gsec" open><summary><b>${esc(s.t)}</b></summary><ul class="gpts">${s.pts.map(p=>`<li>${md(p.x)}</li>`).join("")}</ul>
        <div class="row left"><button data-xquiz="${OC_TOPIC[s.id]}">Quiz this topic</button></div></details>`).join("")}`;
    return;
  }
  const los=LOS.map(l=>{ const c=x.conf[l.id]??-1; return `<div class="lo"><div style="min-width:0"><b>${l.star?"★ ":""}${esc(l.t)}</b> <span class="lbl">${l.id}</span><div class="hint">${esc(l.d)}</div></div>
    <div class="seg" role="group" aria-label="Confidence">${CONF.map((n,i)=>`<button data-xconf="${l.id}:${i}" aria-pressed="${c===i}">${n}</button>`).join("")}</div></div>`; }).join("");
  const solid=Object.values(x.conf).filter(v=>v===2).length;
  card.innerHTML=`<div class="rx"><h2>Drug development study guide</h2><label class="toggle"><input type="checkbox" id="xstar" ${so?"checked":""}> ★ annotated only</label></div>
    <p class="hint">★ = something you circled, highlighted or wrote a note on. <i>Your note</i> shows your handwriting typed up.</p>
    <details class="gsec" open><summary><b>Learning objectives</b> <span class="pill ${solid===LOS.length?"g":"a"}">${solid}/${LOS.length} solid</span></summary><div class="los">${los}</div></details>
    ${DD_GUIDE.map(s=>{ const pts=s.pts.filter(p=>!so||p.s); if(!pts.length) return "";
      return `<details class="gsec" ${so?"open":""}><summary><span class="lbl">${esc(s.lec)}</span> <b>${esc(s.t)}</b></summary>
      <ul class="gpts">${pts.map(p=>`<li class="${p.s?"st":""}">${p.s?'<span class="star">★</span> ':""}${md(p.x)}${p.note?`<div class="mynote">Your note: ${esc(p.note)}</div>`:""}</li>`).join("")}</ul>
      <div class="row left"><button data-xquiz="lo:${s.lo.join(",")}">Quiz this section</button><button data-xcards="lo:${s.lo.join(",")}">Flashcards</button></div></details>`; }).join("")}`;
}

// ---- Flashcards (spaced repetition) ----
function xCards(card){
  const x=xs(), subj=x.subj;
  let pool=allExamCards(subj);
  const decks = subj==="dd" ? ["all","dd1","acts","dd2","dd3","case"] : ["all",...new Set(OC_CARDS.map(c=>c[1]))];
  if(x.cdeck && x.cdeck.startsWith("lo:")){ const los=x.cdeck.slice(3).split(","); pool=pool.filter(c=>los.includes(c.lo)); }
  else if(x.cdeck && x.cdeck!=="all") pool=pool.filter(c=>c.deck===x.cdeck);
  if(x.starOnly && subj==="dd") pool=pool.filter(c=>c.star);
  const sig=subj+"|"+x.cdeck+"|"+x.starOnly+"|"+x.cram;
  if(!xcard||xcard.sig!==sig){ xcard={sig, deck:shuffle(pool.filter(c=>x.cram||isDue(c.key))), done:0, again:0, show:false}; }
  const chips=`<div class="chips" role="group" aria-label="Deck">${decks.map(d=>`<button data-xdeck="${d}" aria-pressed="${x.cdeck===d}">${esc(DECK_NAMES[d]||d)}</button>`).join("")}${x.cdeck&&x.cdeck.startsWith("lo:")?`<button aria-pressed="true">This section</button>`:""}</div>
    <div class="row left">${subj==="dd"?`<label class="toggle"><input type="checkbox" id="xstar" ${x.starOnly?"checked":""}> ★ annotated only</label>`:""}<label class="toggle"><input type="checkbox" id="xcram" ${x.cram?"checked":""}> Include cards not due</label></div>`;
  const q=xcard;
  if(!q.deck.length){
    card.innerHTML=`<div class="rx"><h2>Flashcards</h2><span class="pill a">${pool.length} in this deck</span></div>${chips}
      <div class="done"><span class="big">${q.done?"Done":"Nothing due"}</span><p class="hint">${q.done?`${q.done} reviewed. Cards come back on schedule, and the ones you miss come back sooner.`:"Turn on 'Include cards not due' to cram, or switch decks."}</p></div>`;
    return;
  }
  const c=q.deck[0];
  card.innerHTML=`<div class="rx"><h2>Flashcards</h2><span class="pill a">${pool.length} in this deck</span></div>${chips}
    <div class="row left"><span class="pill g">${q.done} done</span><span class="pill b">${q.again} again</span><span class="pill w">${q.deck.length} left</span></div>
    <div class="flash"><span class="from">${c.star?'<span class="star">★</span> ':""}${esc(DECK_NAMES[c.deck]||c.deck)}</span><span class="q xq">${md(c.f)}</span>
      ${q.show?`<div class="ans">${md(c.b)}</div>`:""}</div>
    ${q.show?`<div class="grades"><button class="again" data-xg="0">Again<br><small>${ivl(c.key,0)}</small></button><button class="hard" data-xg="3">Hard<br><small>${ivl(c.key,3)}</small></button><button class="good" data-xg="4">Good<br><small>${ivl(c.key,4)}</small></button><button class="easy" data-xg="5">Easy<br><small>${ivl(c.key,5)}</small></button></div>`
      :`<div class="row"><button class="primary" id="xshow">Show answer</button></div>`}
    <p class="hint">Answer out loud or in your head before you flip. If you'd miss it on the exam, tap Again.</p>`;
}

// ---- Quiz ----
function startQuiz(filter, label, limit){
  const x=xs(); let pool=allMcq(x.subj);
  if(filter==="missed") pool=pool.filter(q=>x.qs[q.id]&&!x.qs[q.id].last);
  else if(filter==="unseen") pool=pool.filter(q=>!x.qs[q.id]);
  else if(filter && filter.startsWith("lo:")){ const los=filter.slice(3).split(","); pool=pool.filter(q=>los.includes(q.lo)); }
  else if(filter && filter!=="all") pool=pool.filter(q=>q.set===filter||q.topic===filter);
  pool=shuffle(pool); if(limit) pool=pool.slice(0,limit);
  if(filter==="practice") pool.sort((a,b)=>a.n-b.n);
  // shuffle answer positions (his practice exam keeps its original A–D order)
  pool=pool.map(q=>{ if(q.set==="practice"||q.o.some(o=>/\b(both|neither|all of|none of)\b.*\b[A-D]\b/i.test(o))) return q;
    const idx=shuffle(q.o.map((_,i)=>i)); return {...q, o:idx.map(i=>q.o[i]), a:idx.indexOf(q.a)}; });
  xq={label, list:pool, i:0, pick:null, right:0, wrong:[], t0:Date.now()};
}
function xQuiz(card){
  const x=xs(), subj=x.subj, acc=quizAcc(subj);
  if(!xq||xq.subj!==subj){
    const missed=allMcq(subj).filter(q=>x.qs[q.id]&&!x.qs[q.id].last).length;
    const sets = subj==="dd"
      ? [["exam","Exam simulation (25 mixed)"],["all","All drug dev questions"],["dd1","Part 1 basics"],["acts","Acts & patents"],["dd2","Part 2 development"],["dd3","Part 3 generics/OTC/biosimilars"],["case","Case studies (Ozempic + Wegovy)"]]
      : [["practice","His practice exam (24)"],["new","New questions in his style"],["exam","Exam simulation (25 mixed)"],["Acid/base","Acid/base"],["Solubility","Solubility"],["Groups","Functional groups"],["Bonding","Bonding"],["IMF","Intermolecular forces"],["Design","Drug design & excipients"]];
    const ai=(x.gen||[]).filter(g=>g.subj===subj).length;
    card.innerHTML=`<div class="rx"><h2>${subj==="dd"?"Drug development quiz":"Pharm chem quiz"}</h2><span class="pill a">${acc.r}/${acc.n} answered right</span></div>
      <p class="hint">${subj==="oc"?"He said the exam will be like the practice exam with the wording changed, so the 'new questions' set rewords his questions and flips which form is asked about.":"Questions are built from the lecture slides and your annotations. Every answer comes with an explanation."}</p>
      <div class="qsets">${sets.map(([k,l])=>`<button data-xset="${k}">${esc(l)}</button>`).join("")}
        ${missed?`<button class="primary" data-xset="missed">Retry ${missed} missed</button>`:""}
        ${ai?`<button data-xset="ai">Claude-generated (${ai})</button>`:""}</div>
      ${sample?`<div class="gen"><b>Generate more with Claude</b><p class="hint">Writes 5 new exam-style questions from your study guide content on a topic you pick.</p>
        <div class="ctrl"><select id="xgtopic">${(subj==="dd"?DD_GUIDE.map(s=>`<option value="${s.id}">${esc(s.t)}</option>`):OC_GUIDE.map(s=>`<option value="${s.id}">${esc(s.t)}</option>`)).join("")}</select><button class="primary" id="xgen" ${xgenBusy?"disabled":""}>${xgenBusy?"Writing…":"Generate 5"}</button></div><div id="xgenout"></div></div>`:""}`;
    return;
  }
  const q=xq;
  if(q.i>=q.list.length){
    const pct=q.list.length?Math.round(q.right/q.list.length*100):0;
    card.innerHTML=`<div class="rx"><h2>${esc(q.label)}</h2></div>
      <div class="done"><span class="big">${q.right}/${q.list.length}</span><p class="hint">${pct}% · ${Math.round((Date.now()-q.t0)/60000)} min</p>
      ${q.wrong.length?`<div class="weak"><span class="lbl">Review these</span>${q.wrong.map(w=>`<div class="rev"><b>${md(w.q)}</b><div>✓ ${md(w.o[w.a])}</div><div class="hint">${md(w.w)}</div></div>`).join("")}</div>`:""}
      <div class="row"><button id="xqback">Back to quiz menu</button>${q.wrong.length?`<button class="primary" data-xset="missed">Retry missed</button>`:""}</div></div>`;
    return;
  }
  const c=q.list[q.i], picked=q.pick;
  card.innerHTML=`<div class="rx"><h2>${esc(q.label)}</h2><span class="pill a">${q.i+1}/${q.list.length}</span></div>
    ${bar(q.i/q.list.length*100,"thin")}
    <div class="flash"><span class="from">${esc(c.topic||"")}${c.n?` · Practice Q${c.n}`:""}${c.set==="ai"?" · Claude-generated":""}</span><span class="q xq">${md(c.q)}</span></div>
    <div class="opts xopts">${c.o.map((o,i)=>`<button data-xpick="${i}" class="${picked!=null?(i===c.a?"right":(i===picked?"wrong":"")):""}" ${picked!=null?"disabled":""}>${/^[A-E]$/.test(o)?"":`<span class="lbl">${"ABCDE"[i]}</span> `}${md(o)}</button>`).join("")}</div>
    ${picked!=null?`<div class="note ${picked===c.a?"ok":""}"><b>${picked===c.a?"Correct.":"Not quite — answer: "+"ABCDE"[c.a]+"."}</b> ${md(c.w)}</div><div class="row"><button id="xqquit" class="ghost">End quiz</button><button class="primary" id="xqnext">Next →</button></div>`
      :`<div class="row"><button id="xqquit" class="ghost">End quiz</button></div>`}`;
}
async function xGenerate(){
  if(!sample||xgenBusy) return;
  const x=xs(), id=document.getElementById("xgtopic").value, subj=x.subj;
  const sec=(subj==="dd"?DD_GUIDE:OC_GUIDE).find(s=>s.id===id); if(!sec) return;
  const content=sec.pts.map(p=>"- "+p.x.replace(/\*\*/g,"")+(p.note?" (student note: "+p.note+")":"")).join("\n");
  const existing=allMcq(subj).slice(0,60).map(q=>"- "+q.q).join("\n");
  const prompt=`You write exam questions for a PharmD course (PHAR 117, ${subj==="dd"?"drug development and FDA regulation":"pharmaceutical chemistry"}). The professor reuses concepts but changes the wording, so write questions that test the same facts from new angles: flip which form or item is asked about, use scenarios, ask "which is NOT", and use numbers from the material. Use ONLY facts in this study guide section; do not add outside facts.

SECTION: ${sec.t}
${content}

Avoid duplicating these existing questions:
${existing}

Write exactly 5 multiple-choice questions with 4 options each and exactly one correct answer. Reply with only a JSON array like:
[{"q":"question text","o":["option A","option B","option C","option D"],"a":0,"w":"one-sentence explanation of why the answer is right"}]`;
  xgenBusy=true; renderExam();
  const out=()=>document.getElementById("xgenout");
  try{
    const r=await sample.json(prompt,{cache:false});
    const ok=(Array.isArray(r)?r:[]).filter(g=>g&&typeof g.q==="string"&&Array.isArray(g.o)&&g.o.length>=2&&Number.isInteger(g.a)&&g.a>=0&&g.a<g.o.length)
      .map((g,i)=>({id:"g"+Date.now()+i, subj, topic:sec.t, lo:(sec.lo||[])[0], q:String(g.q), o:g.o.map(String).slice(0,5), a:g.a, w:String(g.w||"")}));
    x.gen=(x.gen||[]).concat(ok).slice(-150); save();
    xgenBusy=false;
    if(ok.length){ startQuiz("ai-new","New: "+sec.t); xq.list=shuffle(ok); xq.subj=subj; renderExam(); toast(`${ok.length} new questions`); }
    else { renderExam(); const o=out(); if(o) o.innerHTML=`<p class="hint">Claude's reply couldn't be used. Try again.</p>`; }
  }catch(e){
    xgenBusy=false; renderExam();
    const msg={not_granted:"Claude access wasn't allowed for this page.",rate_limited:"Too many requests. Try again in a minute.",invalid_json:"The reply came back garbled. Try again."}[e&&e.code]||"Couldn't generate questions. Try again.";
    const o=out(); if(o) o.innerHTML=`<p class="hint">${msg}</p>`;
    if(e&&["not_granted","sampling_disabled","not_declared"].includes(e.code)) sample=null;
  }
}

// ---- Case study ----
function xCase(card){
  if(!xcase) xcase={k:0, i:0, show:false, txt:{}, ai:{}};
  const c=xcase, cs=CASES[c.k], QS=cs.qs, q=QS[c.i], g=DD_GUIDE.find(s=>s.id===cs.guide), tk=c.k+":"+c.i;
  card.innerHTML=`<div class="rx"><h2>${cs.name} case study</h2><span class="pill a">Q${c.i+1}/${QS.length}</span></div>
    <div class="seg" role="group" aria-label="Case">${CASES.map((x,k)=>`<button data-xck="${k}" aria-pressed="${k===c.k}">${x.name} <span class="lbl">${esc(x.intro)}</span></button>`).join("")}</div>
    <details class="gsec"><summary><b>Case facts to know</b></summary><ul class="gpts">${g.pts.map(p=>`<li>${md(p.x)}</li>`).join("")}</ul></details>
    <p class="hint">Both cases use the same 15 questions on the same molecule, with different answers (e.g., Phase I in healthy volunteers vs subjects with obesity). The exam will follow this pattern, so learn the reasoning, not just the numbers.</p>
    <div class="flash"><span class="from">Case question ${c.i+1}</span><span class="q xq">${md(q.q)}</span></div>
    <textarea id="xcasetxt" style="min-height:110px" placeholder="Write your answer the way you would on the exam…">${esc(c.txt[tk]||"")}</textarea>
    <div class="row"><button id="xcprev" ${c.i?"":"disabled"}>← Prev</button>${sample?`<button id="xcai">Grade my answer</button>`:""}<button class="primary" id="xcshow">${c.show?"Hide":"Show"} model answer</button><button id="xcnext" ${c.i<QS.length-1?"":"disabled"}>Next →</button></div>
    <div id="xcaiout">${c.ai[tk]||""}</div>
    ${c.show?`<div class="ans note ok">${md(q.a)}</div>`:""}
    <div class="chips">${QS.map((_,i)=>`<button data-xci="${i}" aria-pressed="${i===c.i}">${i+1}</button>`).join("")}</div>
    <div class="row left"><button data-xset="case" data-xgo="quiz">Case multiple choice</button><button data-xdeck="case" data-xgo="cards">Case flashcards</button></div>`;
}
async function xCaseGrade(){
  const c=xcase, cs=CASES[c.k], q=cs.qs[c.i], tk=c.k+":"+c.i, ans=(document.getElementById("xcasetxt").value||"").trim(), out=document.getElementById("xcaiout");
  if(!ans){ toast("Write an answer first"); return; }
  out.innerHTML=`<p class="hint">Grading…</p>`;
  try{
    const r=await sample.json(`Grade a PharmD student's short exam answer for a drug development case study (${cs.name}/semaglutide). Compare to the model answer; accept equivalent wording. Be brief and encouraging but honest.
QUESTION: ${q.q}
MODEL ANSWER: ${q.a.replace(/\*\*/g,"")}
STUDENT ANSWER: ${ans}
Reply with only JSON: {"score":0-10,"missing":["key point missing"],"verdict":"one sentence"}`);
    const sc=Math.max(0,Math.min(10,Math.round(Number(r.score)||0)));
    c.ai[tk]=`<div class="ai"><div class="score"><span class="big">${sc}/10</span><span>${esc(r.verdict||"")}</span></div>${Array.isArray(r.missing)&&r.missing.length?`<span class="lbl">Missing</span><ul>${r.missing.map(m=>`<li>${esc(m)}</li>`).join("")}</ul>`:""}</div>`;
    out.innerHTML=c.ai[tk]; award(Math.round(sc/2)+1);
  }catch(e){ out.innerHTML=`<p class="hint">${e&&e.code==="not_granted"?"Claude grading wasn't allowed.":"Grading failed. Try again."}</p>`; }
}

// ---- Timeline & numbers ----
function xTime(card){
  if(!xtl) xtl={mode:"order"};
  const t=xtl, seg=`<div class="seg" role="group"><button data-xtm="order" aria-pressed="${t.mode==="order"}">Put in order</button><button data-xtm="match" aria-pressed="${t.mode==="match"}">Match the act</button><button data-xtm="nums" aria-pressed="${t.mode==="nums"}">Numbers quick-fire</button><button data-xtm="list" aria-pressed="${t.mode==="list"}">Full timeline</button></div>`;
  let body="";
  if(t.mode==="list"){
    body=`<div class="tl">${TIMELINE.map(([y,n,c,r])=>`<div class="tli"><span class="ty">${y}</span><div style="min-width:0"><b>${esc(n)}</b><div class="hint">Crisis: ${esc(c)}</div><div>${esc(r)}</div></div></div>`).join("")}</div>`;
  } else if(t.mode==="order"){
    if(!t.ord){ const pick=shuffle(TIMELINE.filter(r=>r[1]!=="FDORA"&&r[1]!=="FDA Modernization Act 2.0")).slice(0,7); t.ord={items:shuffle(pick), placed:[], slips:0, wrong:null}; }
    const o=t.ord, sorted=[...o.items].sort((a,b)=>a[0]-b[0]), fin=o.placed.length===sorted.length;
    body=`<p class="hint">Tap the acts from oldest to newest.</p><div class="placed">${o.placed.map(n=>{const r=TIMELINE.find(x=>x[1]===n); return `<div>${r[0]} · ${esc(n)}</div>`;}).join("")}</div>
      ${fin?`<div class="done"><span class="big">${o.slips?o.slips+" slip"+(o.slips>1?"s":""):"Perfect"}</span><button class="primary" id="xtlagain">New set</button></div>`
        :`<div class="chips">${o.items.filter(r=>!o.placed.includes(r[1])).map(r=>`<button data-xord="${esc(r[1])}" class="${o.wrong===r[1]?"wrong":""}">${esc(r[1])}</button>`).join("")}</div>`}`;
  } else {
    if(!t.q){
      if(t.mode==="match"){ const r=TIMELINE[Math.floor(Math.random()*TIMELINE.length)], kind=Math.floor(Math.random()*3);
        const others=shuffle(TIMELINE.filter(x=>x[1]!==r[1])).slice(0,3);
        if(kind===0) t.q={q:`Which act responded to: **${r[2]}**?`, o:shuffle([r,...others]).map(x=>x[1]), a:r[1], w:`${r[0]} ${r[1]}: ${r[3]}`};
        else if(kind===1) t.q={q:`What did the **${r[1]}** do?`, o:shuffle([r,...others]).map(x=>x[3]), a:r[3], w:`${r[0]}. Crisis: ${r[2]}`};
        else { const yrs=shuffle([...new Set(TIMELINE.map(x=>x[0]).filter(y=>y!==r[0]))]).slice(0,3); t.q={q:`What year was the **${r[1]}**?`, o:shuffle([r[0],...yrs]).map(String), a:String(r[0]), w:`${r[1]} — ${r[3]}`}; }
      } else { const n=NUMS[Math.floor(Math.random()*NUMS.length)]; t.q={q:`**${n[0]}**?`, o:shuffle(n[2]), a:n[1], w:""}; }
      t.pick=null;
    }
    const q=t.q;
    body=`<div class="flash"><span class="from">${t.mode==="match"?"Match the act":"Numbers to know"}</span><span class="q xq">${md(q.q)}</span></div>
      <div class="opts xopts">${q.o.map(o=>`<button data-xtp="${esc(o)}" class="${t.pick!=null?(o===q.a?"right":(o===t.pick?"wrong":"")):""}" ${t.pick!=null?"disabled":""}>${esc(o)}</button>`).join("")}</div>
      ${t.pick!=null?`${q.w?`<div class="note ${t.pick===q.a?"ok":""}">${md(q.w)}</div>`:""}<div class="row"><button class="primary" id="xtlnext">Next →</button></div>`:""}
      <div class="row left"><span class="pill g">${t.r||0} right</span><span class="pill b">${t.x||0} wrong</span></div>`;
  }
  card.innerHTML=`<div class="rx"><h2>Acts, timeline & numbers</h2></div>${seg}${body}`;
}

// ---- Dose calculator (MRSD) ----
const KM={"Mouse":12.3,"Rat":6.2,"Rabbit":3.1,"Monkey":3.1,"Dog":1.8};
function xDose(card){
  if(!xcalc||xcalc.kind!=="dose"){
    const sp=shuffle(Object.keys(KM)).slice(0,2), w=[50,60,70,80][Math.floor(Math.random()*4)];
    const vals=sp.map(s=>({s, noael:[5,10,15,20,25,30,40,50,60,75,100][Math.floor(Math.random()*11)]}));
    vals.forEach(v=>v.hed=v.noael/KM[v.s]);
    const min=vals.reduce((a,b)=>a.hed<=b.hed?a:b), mrsd=min.hed/10;
    xcalc={kind:"dose", vals, w, min, mrsd, ans:null};
  }
  const c=xcalc;
  card.innerHTML=`<div class="rx"><h2>First-in-human dose (MRSD)</h2><button id="xdnew">New problem</button></div>
    <p class="hint">FDA conversion: HED (mg/kg) = animal NOAEL ÷ factor. Mouse 12.3 · Rat 6.2 · Rabbit 3.1 · Monkey 3.1 · Dog 1.8. Most sensitive species = lowest HED. MRSD = HED ÷ 10.</p>
    <div class="flash"><span class="from">Problem</span><span class="q xq">Repeat-dose NOAELs: ${c.vals.map(v=>`<b>${v.s} ${v.noael} mg/kg</b>`).join(" and ")}. What is the MRSD (in mg) for a <b>${c.w}-kg</b> adult?</span></div>
    <div class="ctrl"><input type="number" id="xdans" inputmode="decimal" step="any" placeholder="mg" style="width:9em"><button class="primary" id="xdcheck">Check</button></div>
    ${c.ans!=null?`<div class="note ${Math.abs(c.ans-c.mrsd*c.w)/(c.mrsd*c.w)<=0.06?"ok":""}"><b>${Math.abs(c.ans-c.mrsd*c.w)/(c.mrsd*c.w)<=0.06?"Correct.":"Not quite."}</b><br>
      ${c.vals.map(v=>`${v.s}: ${v.noael} ÷ ${KM[v.s]} = <b>${v.hed.toFixed(2)} mg/kg</b>`).join("<br>")}<br>
      Lowest HED → <b>${c.min.s}</b> is most sensitive.<br>MRSD = ${c.min.hed.toFixed(2)} ÷ 10 = <b>${c.mrsd.toFixed(3)} mg/kg</b> × ${c.w} kg = <b>${(c.mrsd*c.w).toFixed(1)} mg</b></div>`:""}`;
}

// ---- Ochem calculators ----
function rnd(a,b,d=1){ const f=10**d; return Math.round((a+Math.random()*(b-a))*f)/f; }
function newCalc(){
  const t=Math.floor(Math.random()*5);
  if(t===0){ const acid=Math.random()<.5, pKa=rnd(acid?2.5:6.5,acid?6:10.5), pH=rnd(1,8); const un=acid?100/(1+10**(pH-pKa)):100/(1+10**(pKa-pH));
    return {q:`A weak ${acid?"acid":"base"} has pKa ${pKa}. At pH ${pH}, what % is **unionized** (available for passive diffusion)?`, ans:un, unit:"%", tol:v=>Math.abs(v-un)<=Math.max(1,un*0.03),
      sol:`${acid?`Acid: log([A⁻]/[HA]) = pH − pKa = ${(pH-pKa).toFixed(2)}`:`Base: log([BH⁺]/[B]) = pKa − pH = ${(pKa-pH).toFixed(2)}`} → ratio ionized:unionized = ${(10**(acid?pH-pKa:pKa-pH)).toPrecision(3)} : 1.<br>% unionized = 100 ÷ (1 + ratio) = <b>${un.toPrecision(3)}%</b>`}; }
  if(t===1){ const lp=rnd(-2,5.5,1), ratio=10**lp; return {q:`A drug partitions ${ratio>=1?ratio.toPrecision(5):ratio.toPrecision(3)} parts into octanol for every 1 part in water. What is log P?`, ans:lp, unit:"", tol:v=>Math.abs(v-lp)<=0.05, sol:`log P = log(${ratio.toPrecision(5)}) = <b>${lp.toFixed(1)}</b>. ${lp>=0&&lp<=5?"In the drug-like range (0–5).":"Outside the typical drug-like range (0–5)."}`}; }
  if(t===2||t===3){ const acid=t===2, mw=Math.round(rnd(150,450,0)), pct=[1,2,5,10][Math.floor(Math.random()*4)], ST=pct*10/mw, S0=Math.round(ST*rnd(0.05,0.5,2)*1000)/1000||0.001, pKa=acid?rnd(3,6.5):rnd(7,10);
    const pH=acid? pKa+Math.log10((ST-S0)/S0) : pKa+Math.log10(S0/(ST-S0));
    return {q:`Make a **${pct}% w/v** solution of a weak **${acid?"acid":"base"}** (MW ${mw}, pKa ${pKa}, intrinsic solubility S₀ = ${S0} M). What is the limiting pH?`, ans:pH, unit:"", tol:v=>Math.abs(v-pH)<=0.05,
      sol:`S_T = ${pct*10} g/L ÷ ${mw} = <b>${ST.toFixed(4)} M</b>.<br>${acid?`Acid: pH = pKa + log((S_T − S₀)/S₀) = ${pKa} + log(${(ST-S0).toFixed(4)}/${S0})`:`Base: pH = pKa + log(S₀/(S_T − S₀)) = ${pKa} + log(${S0}/${(ST-S0).toFixed(4)})`} = <b>${pH.toFixed(2)}</b>.<br>${acid?"Keep the pH at or above this or it precipitates.":"Keep the pH at or below this or it precipitates."}`}; }
  const S0=rnd(0.005,0.05,3), pKa=rnd(3,6), pH=rnd(pKa-1,pKa+3); const ST=S0*(1+10**(pH-pKa));
  return {q:`A weak acid has S₀ = ${S0} M and pKa ${pKa}. What is its total solubility S_T at pH ${pH} (in M)?`, ans:ST, unit:"M", tol:v=>Math.abs(v-ST)/ST<=0.03, sol:`S_T = S₀(1 + Ka/[H⁺]) = S₀(1 + 10^(pH−pKa)) = ${S0} × (1 + ${(10**(pH-pKa)).toPrecision(3)}) = <b>${ST.toPrecision(3)} M</b>`};
}
function xCalc(card){
  if(!xcalc||xcalc.kind!=="oc"){ xcalc={kind:"oc", p:newCalc(), val:null, r:0, n:0}; }
  const c=xcalc, p=c.p, ok=c.val!=null&&p.tol(c.val);
  card.innerHTML=`<div class="rx"><h2>Calculation practice</h2><span class="pill a">${c.r}/${c.n} right</span></div>
    <p class="hint">Endless problems like practice Q21, 22 and 27 with new numbers. Use a calculator.</p>
    <div class="flash"><span class="from">Problem</span><span class="q xq">${md(p.q)}</span></div>
    <div class="ctrl"><input type="number" id="xcans" inputmode="decimal" step="any" placeholder="answer ${p.unit}" style="width:10em"><button class="primary" id="xccheck">Check</button><button id="xcnew">New problem</button></div>
    ${c.val!=null?`<div class="note ${ok?"ok":""}"><b>${ok?"Correct.":"Not quite."}</b><br>${p.sol}</div>`:""}`;
}
function xPractice(card){ xs().tab="quiz"; xq=null; startQuiz("practice","His practice exam (24)"); xq.subj="oc"; xQuiz(card); }
function xFormulas(card){
  card.innerHTML=`<div class="rx"><h2>Formula sheet</h2></div>
    <div class="fsheet">
      <div><span class="lbl">pH / pKa</span><p>pH = −log[H⁺] · pKa = −log Ka</p></div>
      <div><span class="lbl">Henderson–Hasselbalch</span><p>Acid: pH = pKa + log([A⁻]/[HA])<br>Base: pH = pKa + log([B]/[BH⁺])</p></div>
      <div><span class="lbl">Shortcuts</span><p>|pH − pKa| = 1 → 90:10 · 2 → 99:1 · 3 → 99.9:0.1<br>Acids ionize at high pH; bases ionize at low pH. Unionized = absorbable.</p></div>
      <div><span class="lbl">Total solubility (acid)</span><p>S_T = S₀(1 + Ka/[H⁺])</p></div>
      <div><span class="lbl">Limiting pH</span><p>Acid: pH = pKa + log((S_T − S₀)/S₀)<br>Base: pH = pKa + log(S₀/(S_T − S₀))</p></div>
      <div><span class="lbl">% w/v → molarity</span><p>M = (% × 10 g/L) ÷ MW &nbsp; e.g. 10% of MW 214.24 = 100/214.24 = 0.467 M</p></div>
      <div><span class="lbl">log P</span><p>log P = log([drug]octanol/[drug]water) · drug-like ≈ 0–5</p></div>
      <div><span class="lbl">Basicity (practice exam pKa)</span><p>amines 10–11 > amidines 9–10 > imidazoles ~5 > pyrroles 1–3</p></div>
      <div><span class="lbl">IMF ranking</span><p>ion–ion > ion–dipole > dipole–dipole > dipole–induced dipole > instantaneous dipole</p></div>
    </div>`;
}

// ---- events ----
document.addEventListener("click", e=>{
  const t=e.target.closest("button"); if(!t) return;
  const d=t.dataset;
  if(d.sect){ state.section=d.sect; save(); stopMic&&stopMic(); render(); return; }
  if(state.section!=="exam") return;
  const x=xs();
  if(d.xs){ x.subj=d.xs; xq=null; xcard=null; xcalc=null; x.cdeck="all"; save(); renderExam(); return; }
  if(d.xt){ x.tab=d.xt; if(d.xt==="quiz") xq=null; save(); renderExam(); return; }
  if(d.xconf){ const [id,v]=d.xconf.split(":"); x.conf[id]=+v; save(); renderExam(); return; }
  if(d.xquiz){ const f=d.xquiz; x.tab="quiz"; startQuiz(f, f.startsWith("lo:")?"Section quiz":f); xq.subj=x.subj; renderExam(); return; }
  if(d.xcards){ x.tab="cards"; x.cdeck=d.xcards; x.cram=true; xcard=null; renderExam(); return; }
  if(d.xdeck){ x.cdeck=d.xdeck; xcard=null; if(d.xgo) x.tab=d.xgo; save(); renderExam(); return; }
  if(d.xg!==undefined){ const c=xcard.deck.shift(); if(+d.xg===0){ xcard.again++; xcard.deck.splice(Math.min(3,xcard.deck.length),0,c);} else xcard.done++; xcard.show=false; grade(c.key,+d.xg); renderExam(); return; }
  if(d.xset){ const f=d.xset, lab=t.textContent.trim(); if(d.xgo) x.tab=d.xgo; if(f==="exam") startQuiz("all","Exam simulation",25); else startQuiz(f,lab); xq.subj=x.subj; renderExam(); return; }
  if(d.xpick!==undefined){ const c=xq.list[xq.i]; if(xq.pick!=null) return; xq.pick=+d.xpick; const ok=xq.pick===c.a; const s=x.qs[c.id]||{r:0,w:0}; ok?s.r++:s.w++; s.last=ok?1:0; x.qs[c.id]=s; if(ok) xq.right++; else xq.wrong.push(c); award(ok?4:1); renderExam(); return; }
  if(d.xck!==undefined){ xcase.k=+d.xck; xcase.i=0; xcase.show=false; renderExam(); return; }
  if(d.xci!==undefined){ xcase.i=+d.xci; xcase.show=false; renderExam(); return; }
  if(d.xtm){ xtl={mode:d.xtm}; renderExam(); return; }
  if(d.xord){ const o=xtl.ord, sorted=[...o.items].sort((a,b)=>a[0]-b[0]); if(d.xord===sorted[o.placed.length][1]){ o.placed.push(d.xord); o.wrong=null; } else { o.slips++; o.wrong=d.xord; } if(o.placed.length===sorted.length) award(o.slips?8:15); renderExam(); return; }
  if(d.xtp!==undefined){ if(xtl.pick!=null) return; xtl.pick=d.xtp; if(d.xtp===xtl.q.a){ xtl.r=(xtl.r||0)+1; award(3);} else xtl.x=(xtl.x||0)+1; renderExam(); return; }
  switch(t.id){
    case "xshow": xcard.show=true; renderExam(); break;
    case "xqnext": xq.i++; xq.pick=null; renderExam(); break;
    case "xqquit": xq.list=xq.list.slice(0,xq.i+(xq.pick!=null?1:0)); xq.i=xq.list.length; renderExam(); break;
    case "xqback": xq=null; renderExam(); break;
    case "xgen": xGenerate(); break;
    case "xcshow": xcase.show=!xcase.show; renderExam(); break;
    case "xcnext": xcase.i++; xcase.show=false; renderExam(); break;
    case "xcprev": xcase.i--; xcase.show=false; renderExam(); break;
    case "xcai": xCaseGrade(); break;
    case "xtlagain": xtl.ord=null; renderExam(); break;
    case "xtlnext": xtl.q=null; renderExam(); break;
    case "xdnew": xcalc=null; renderExam(); break;
    case "xdcheck": { const v=parseFloat(document.getElementById("xdans").value); if(isNaN(v)) return toast("Enter a number"); xcalc.ans=v; if(Math.abs(v-xcalc.mrsd*xcalc.w)/(xcalc.mrsd*xcalc.w)<=0.06) award(6); renderExam(); break; }
    case "xccheck": { const v=parseFloat(document.getElementById("xcans").value); if(isNaN(v)) return toast("Enter a number"); xcalc.val=v; xcalc.n++; if(xcalc.p.tol(v)){ xcalc.r++; award(6);} renderExam(); break; }
    case "xcnew": xcalc.p=newCalc(); xcalc.val=null; renderExam(); break;
  }
});
document.addEventListener("change", e=>{
  if(state.section!=="exam") return;
  const x=xs();
  if(e.target.id==="xstar"){ x.starOnly=e.target.checked; xcard=null; save(); renderExam(); }
  if(e.target.id==="xcram"){ x.cram=e.target.checked; xcard=null; save(); renderExam(); }
});
document.addEventListener("input", e=>{ if(e.target.id==="xcasetxt"&&xcase) xcase.txt[xcase.k+":"+xcase.i]=e.target.value; });

