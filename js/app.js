const KEY = "scriptDrill.v3", OLDKEY = "scriptDrill.v2";
const S = (label, text) => ({label, text});
// *stars* mark must-say key points
const DEFAULTS = [
  { id:"flow", type:"flow", name:"Counseling flow", sections:[
    S("Intro","Hi, *my name is [your name]*. I'm the *pharmacy intern* who will be counseling you today. Before we go over your medication, I'd like to ask you a few questions to make sure everything is *safe and appropriate* for you."),
    S("Verify info","*Is the medication for you?* Can I get your *full name and date of birth*? Your *address and phone number*?"),
    S("Questions","Have you taken any medications in the past to *treat the same condition*? Are you taking any *other medications, OTC medications, vitamins, or supplements*? Do you have any *allergies*? *What reaction* did you have? Do you have any *other medical conditions*? Are you *pregnant, planning to become pregnant, or breastfeeding*?"),
    S("Purpose","Thank you! So today I am going to be going over your medication with you, including *what it is for*, *how to take it*, important *side effects and interactions*, and other information to make you feel comfortable with the medication."),
    S("3 prime questions","One, *what did the doctor tell you this medication was for*? Two, *how did the doctor tell you to take this medication*? Three, *what did the doctor tell you to expect*?")
  ]},
  { id:"meto", type:"drug", name:"Metoprolol", sections:[
    S("What it is","*Beta blocker* used to *lower blood pressure*."),
    S("How it works","It works by *slowing your heart rate* and *reducing how hard your heart has to work*, lowering your blood pressure."),
    S("How to take","Take *exactly as prescribed*. Try to take it at the *same time every day*, *with or without food*."),
    S("Side effects","*Tiredness*, *dizziness*, and a *slower heart rate*. If they are severe, contact your healthcare provider. If you have diabetes, it can *mask warning signs of low blood sugar*, so *monitor your blood glucose*."),
    S("Important","*Do not stop taking metoprolol suddenly*. It can cause your *heart rate and blood pressure to increase* and increase your risk of *serious heart problems*."),
    S("Interactions","Certain medications like *verapamil and diltiazem* can *further slow your heart rate* when combined with metoprolol.")
  ]},
  { id:"amlo", type:"drug", name:"Amlodipine (Norvasc)", sections:[
    S("What it is","*Dihydropyridine calcium channel blocker* used to *lower blood pressure*."),
    S("How it works","It works by *relaxing your blood vessels*, making it *easier for your heart to pump blood*, and lowers your blood pressure."),
    S("How to take","Take *exactly as prescribed*. Try to take it around the *same time each day*, *with or without food*."),
    S("Side effects","*Swelling in your ankles or feet*, *headache*, *flushing*, *dizziness*, and *fatigue*. If you notice mild ankle swelling, let your healthcare provider know, or if the effects are severe, let them know. Rarely, *serious allergies* occur. Contact your healthcare provider if you have *swelling or trouble breathing*."),
    S("Interactions","Taking it with *other medications that lower blood pressure* increases the risk of *dizziness or low blood pressure*.")
  ]},
  { id:"psde", type:"drug", name:"Pseudoephedrine + DM", sections:[
    S("What it is","Pseudoephedrine relieves *nasal congestion*. Dextromethorphan *suppresses coughing*."),
    S("How to take","Use the *measuring device provided* and take *exactly the amount listed on the label*. *Do not use a household spoon*, because it is not accurate."),
    S("Pseudoephedrine effects","*Increased blood pressure*, *increased heart rate*, *nervousness*, *restlessness*, and *difficulty sleeping*."),
    S("DM effects","*Dizziness*, *drowsiness*, or *nausea*. *Do not drive* or perform activities requiring alertness."),
    S("Interactions","Medications for *depression, anxiety, or other mental health conditions*, such as *MAO inhibitors*."),
    S("Hypertension safety","Pseudoephedrine *raises blood pressure and heart rate*. Make sure your *blood pressure is controlled* and you have *no heart conditions*. *Contact your prescriber* if you do.")
  ]},
  { id:"enal", type:"drug", name:"Enalapril (Vasotec)", sections:[
    S("What it is","*ACE inhibitor* used to *lower blood pressure*."),
    S("How it works","This medication works by *relaxing your blood vessels*, which *lowers the pressure your heart has to pump against*."),
    S("How to take","Take it *as prescribed*, *with or without food*. Try to take it at the *same time each day*."),
    S("Side effects","*Dizziness*, especially when you *first start taking it*, *headache*, and a *dry cough*. If you feel dizzy, *stand up slowly* and *sit or lie down until it gets better*. If the cough is *persistent, contact your doctor*."),
    S("Important reaction","*Angioedema*: *sudden swelling of the lips, tongue, face, or throat*. If this happens, *seek emergency medical attention immediately*. It can also *increase potassium levels*, so your doctor may *monitor your potassium and kidney function*."),
    S("Beware","Avoid *potassium supplements* and *potassium-containing salt substitutes*. *NSAIDs like ibuprofen* can *affect your kidneys* and *interfere with the blood pressure lowering effect*. It *should not be used during pregnancy*.")
  ]},
  { id:"hctz", type:"drug", name:"Hydrochlorothiazide", sections:[
    S("What it is","*Thiazide diuretic* used to *lower your blood pressure*. Brand names Hydrodiuril and Microzide."),
    S("How it works","It works by *helping your kidneys remove extra sodium and water* from your body, *decreasing the amount of fluid in your bloodstream*, and helps *lower your blood pressure*."),
    S("How to take","Take it *as prescribed*. This medication *increases urination*, so try to *take it earlier in the day* so it *doesn't interfere with sleep*. Take it *with or without food*."),
    S("Side effects","*Increased urination*, especially when you *first start taking it*, *dizziness*, and *lightheadedness*. Since you are losing a lot of fluid, *make sure you're hydrated*."),
    S("Electrolytes","This medication can *change electrolyte levels*, *lowering potassium and sodium*. Signs of an electrolyte problem include *unusual weakness, muscle cramps, confusion, or irregular heartbeat*."),
    S("Gout and sun","It can *increase uric acid*, which can *worsen gout* in people who are susceptible. It can also cause *sensitivity to the sun*, so *use sun protection* and *avoid excess sun exposure*."),
    S("Interactions","*NSAIDs* can *reduce the effectiveness* of this medication and *affect kidney function*. With *digoxin*, *changes in potassium levels can increase the risk of digoxin toxicity*. It *can increase lithium levels*.")
  ]},
  { id:"outro", type:"flow", name:"Outro statement", sections:[
    S("Diet / sodium","Can you tell me a little about *what you typically eat* in a day? One thing that can help is *limiting sodium*, especially from *processed or packaged foods, fast food, and salty snacks*. Choosing more *fresh foods, fruits and vegetables*, and *checking nutrition labels for sodium* can help."),
    S("Physical activity","How *physically active* are you during a typical week? Regular physical activity can help *lower blood pressure* and *improve heart health*. A good goal is about *150 minutes of moderate activity per week*, such as *brisk walking*. You can *start gradually* if you're not currently active."),
    S("Weight","Has your doctor ever talked with you about *your weight* or recommended any changes? If weight loss is recommended for you, even a *modest amount of weight loss* can help *lower blood pressure* and improve your overall cardiovascular health."),
    S("Smoking / nicotine","Do you currently *smoke or use any nicotine products*? If you do, *quitting is one of the most important things* you can do for your heart and blood vessels. If you're interested, there are *medications and other resources* that can help you quit."),
    S("Alcohol","*How often do you drink alcohol*? Drinking *too much alcohol can raise blood pressure*, so *limiting your intake* can help with blood pressure control."),
    S("Home blood pressure","Do you *check your blood pressure at home*? If you do, I recommend *keeping a record of your readings* and *bringing them to your healthcare appointments*. This can help your doctor see how well your treatment is working.")
  ]}
];
const CURVES = [
  {q:"Wait, what is this medicine for again?", m:/what it is/i},
  {q:"How does it actually work?", m:/how it works/i},
  {q:"When should I take it? Do I need to take it with food?", m:/how to take/i},
  {q:"Are there side effects I should watch out for?", m:/effect/i},
  {q:"Can I take it with my other medicines?", m:/interaction/i},
  {q:"What if I forget a dose?", m:/missed/i},
  {q:"Where should I keep it?", m:/storage|store/i},
  {q:"How do I get refills?", m:/refill/i},
  {q:"I feel fine now. Can I just stop taking it?", m:/important/i, only:"meto"},
  {q:"I have diabetes. Is there anything I should know?", m:/side effects/i, only:"meto"},
  {q:"My ankles are kind of swollen. Is that normal?", m:/side effects/i, only:"amlo"},
  {q:"I have high blood pressure. Is this cold medicine okay for me?", m:/hypertension/i, only:"psde"},
  {q:"Will this make me sleepy? I drive for work.", m:/dm effects/i, only:"psde"},
  {q:"I take something for anxiety. Is that a problem?", m:/interaction/i, only:"psde"},
  {q:"I've had this dry cough that won't go away. Is that the pill?", m:/side effects/i, only:"enal"},
  {q:"What if my lips or face start swelling?", m:/important/i, only:"enal"},
  {q:"Can I use a salt substitute or take ibuprofen for my back?", m:/beware/i, only:"enal"},
  {q:"My wife and I are trying to have a baby. Is this okay?", m:/beware/i, only:"enal"},
  {q:"Will this make me pee a lot? When should I take it?", m:/how to take/i, only:"hctz"},
  {q:"I've been getting leg cramps and feeling weak. Should I worry?", m:/electrolyte/i, only:"hctz"},
  {q:"I'm going to the beach next week. Anything I should know?", m:/gout and sun/i, only:"hctz"},
  {q:"I also take digoxin for my heart. Is that okay?", m:/interaction/i, only:"hctz"}
];
const PERSONAS = ["Normal","Worried","In a hurry","Hard of hearing","Distrustful","Chatty, goes off topic"];
const RUBRIC = [
  "Introduced self as pharmacy intern","Confirmed patient (name + DOB)","Asked screening questions (meds, allergies, conditions, pregnancy)",
  "Asked the 3 prime questions","Drug name and what it's for","How to take (dose, timing, food)","Major side effects",
  "Warnings, precautions, interactions","Missed dose instructions","Storage","Refills",
  "Outro: lifestyle (diet, activity, weight, smoking, alcohol, home BP)","Used open-ended questions",
  "Teach-back: patient said key points back","Summarized and offered follow-up"
];
const LADDER = ["Key facts","Fade 30%","Fade 60%","1st letters"];
const TITLES = ["Pharmacy Newbie","Tech in Training","Counter Rookie","Intern","Confident Intern","Counseling Pro","Clinical Ace","Preceptor Material","PharmD Legend"];
const BADGES = [
  {id:"first", n:"First Rep", d:"Review your first card"},
  {id:"s3", n:"On a Roll", d:"3-day streak"},
  {id:"s7", n:"Full Week", d:"7-day streak"},
  {id:"s14", n:"Habit Formed", d:"14-day streak"},
  {id:"r100", n:"Century", d:"100 card reviews"},
  {id:"order", n:"In Order", d:"Perfect order drill"},
  {id:"which10", n:"Drug Detective", d:"10 correct Which-drug cards"},
  {id:"keys", n:"Every Point", d:"Hit all key points on a full-script recite"},
  {id:"ai90", n:"Claude Approved", d:"Score 90+ from Claude's grading"},
  {id:"mock1", n:"Showtime", d:"Finish your first mock"},
  {id:"mock12", n:"Competition Ready", d:"12+ on a mock checklist"},
  {id:"m1", n:"Mastered One", d:"Any script at 80% mastery"},
  {id:"mall", n:"Full Formulary", d:"Every script at 80% mastery"}
];

// ---------- state ----------
const strip = t => t.replace(/\*/g,"");
// Study sets, newest first. To add a new one, add a line at the top with the date it was added.
const SECTIONS=[
  {id:"e1",      name:"PHAR 131 · Exam 1",  added:"2026-10-13"},
  {id:"exam",    name:"PHAR 117",           added:"2026-10-07"},
  {id:"counsel", name:"Counseling scripts", added:"2026-10-06"},
].sort((a,b)=>b.added.localeCompare(a.added));
let state = load();
state.section = SECTIONS[0].id; // always open on the newest study set
(function(){ const sel=document.getElementById("sectsel");
  const fmtD=d=>new Date(d+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"});
  sel.innerHTML=SECTIONS.map((x,i)=>`<option value="${x.id}">${x.name} · ${fmtD(x.added)}</option>`).join("");
  sel.addEventListener("change",()=>{ state.section=sel.value; save(); if(typeof stopMic==="function") stopMic(); render(); window.scrollTo(0,0); }); })();
let mode="read", editing=false, confirmDel=false, revealed=new Set(), fadeSeed=1, lastCheck=null;
let reciteSec="all", quiz=null, quizAll=false, quizView="cards", order=null, mock=null, tick=null;
let sample=null, aiCtl=null, aiBusy=false, rec=null, listening=false, micBroken=false, confirmReset=false;

function load(){
  try{ const s=JSON.parse(localStorage.getItem(KEY)); if(s && s.scripts && s.scripts.length) return fill(s); }catch(e){}
  const fresh={scripts:JSON.parse(JSON.stringify(DEFAULTS)), cur:"flow"};
  try{
    const old=JSON.parse(localStorage.getItem(OLDKEY));
    if(old && old.scripts) fresh.scripts=old.scripts.map(o=>{
      const d=DEFAULTS.find(x=>x.id===o.id);
      if(d && JSON.stringify(d.sections.map(x=>[x.label,strip(x.text)]))===JSON.stringify(o.sections.map(x=>[x.label,x.text]))) return JSON.parse(JSON.stringify(d));
      return {...o, type:o.id==="flow"?"flow":"drug"};
    });
  }catch(e){}
  return fill(fresh);
}
function fill(s){
  s.cards=s.cards||{}; s.days=s.days||[]; s.mocks=s.mocks||[]; s.level=s.level||{}; s.best=s.best||{};
  s.xp=s.xp||0; s.badges=s.badges||{}; s.reviews=s.reviews||0; s.whichRight=s.whichRight||0;
  s.game = s.game===undefined ? true : s.game; s.reward=s.reward||{text:"",goal:80,won:false};
  s.scripts.forEach(x=>x.type=x.type||"drug");
  s.patient=s.patient||{age:45,hoh:false};
  if(!s.v||s.v<4){ // move risk questions out of the flow into the Outro statement script
    const f=s.scripts.find(x=>x.id==="flow");
    if(f) f.sections=f.sections.filter(x=>x.label!=="Risk questions");
    if(!s.scripts.find(x=>x.id==="outro")) s.scripts.push(JSON.parse(JSON.stringify(DEFAULTS.find(x=>x.id==="outro"))));
    s.v=4;
  }
  if(s.v<5){ // add enalapril + HCTZ before the outro
    ["enal","hctz"].forEach(id=>{ if(!s.scripts.find(x=>x.id===id)){ const i=s.scripts.findIndex(x=>x.id==="outro"); s.scripts.splice(i<0?s.scripts.length:i,0,JSON.parse(JSON.stringify(DEFAULTS.find(x=>x.id===id)))); } });
    s.v=5;
  }
  return s;
}
function save(){ state._ts=Date.now(); try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} if(window.onStateSaved) window.onStateSaved(); }
const cur = () => state.scripts.find(s=>s.id===state.cur) || state.scripts[0];
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = w => w.toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9']/g,"");
const words = t => strip(t).split(/\s+/).filter(Boolean);
const keysOf = t => [...t.matchAll(/\*([^*]+)\*/g)].map(m=>m[1]);
const marked = t => esc(t).replace(/\*([^*]+)\*/g,"<mark>$1</mark>");
const dayStr = (d=new Date()) => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const midnight = () => { const d=new Date(); d.setHours(0,0,0,0); return d.getTime(); };
const bar = (p, cls="") => `<div class="bar ${cls}"><i style="width:${Math.max(0,Math.min(100,p))}%"></i></div>`;
function markDay(){ const t=dayStr(); if(!state.days.includes(t)){ state.days.push(t); state.days=state.days.slice(-400); } }
function streak(){ const set=new Set(state.days); let n=0, d=new Date(); if(!set.has(dayStr(d))) d.setDate(d.getDate()-1); while(set.has(dayStr(d))){ n++; d.setDate(d.getDate()-1);} return n; }

// ---------- quest, xp, levels, badges ----------
function quest(){ const t=dayStr(); if(!state.quest||state.quest.date!==t) state.quest={date:t,cards:0,recite:false,drill:false,claimed:false}; return state.quest; }
function levelInfo(){ let lvl=1, need=100, xp=state.xp; while(xp>=need){ xp-=need; lvl++; need=100+50*(lvl-1); } return {lvl, into:xp, need, title:TITLES[Math.min(lvl-1,TITLES.length-1)]}; }
function toast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toast.h); toast.h=setTimeout(()=>t.classList.remove("show"),2200); }
function award(xp){
  const before=levelInfo().lvl; state.xp+=xp; markDay();
  const q=quest(); if(!q.claimed && q.cards>=10 && q.recite && q.drill){ q.claimed=true; state.xp+=50; if(state.game){ toast("Daily quest complete! +50 XP"); burst(); } }
  const after=levelInfo();
  if(state.game){ if(after.lvl>before){ toast(`Level ${after.lvl}: ${after.title}!`); burst(); } else if(xp>0) toast(`+${xp} XP`); }
  checkBadges(); save(); renderTop();
}
function checkBadges(){
  const st=streak(), ms=state.scripts.filter(s=>s.sections.length).map(mastery);
  const got = {first:state.reviews>0, s3:st>=3, s7:st>=7, s14:st>=14, r100:state.reviews>=100, which10:state.whichRight>=10,
    mock1:state.mocks.length>0, mock12:state.mocks.some(m=>m.score>=12), m1:ms.some(m=>m>=80), mall:ms.length>0&&ms.every(m=>m>=80)};
  Object.entries(got).forEach(([k,v])=>{ if(v) unlock(k); });
  const ov=overall();
  if(state.reward.text && !state.reward.won && ov>=state.reward.goal){ state.reward.won=dayStr(); toast(`Reward unlocked: ${state.reward.text}!`); burst(); }
}
function unlock(id){ if(state.badges[id]) return; state.badges[id]=dayStr(); const b=BADGES.find(x=>x.id===id); if(state.game&&b){ setTimeout(()=>{toast(`Badge: ${b.n}`); burst();},700); } }
function burst(){
  if(!state.game || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c=document.getElementById("fx"), x=c.getContext("2d"); c.width=innerWidth; c.height=innerHeight;
  const css=getComputedStyle(document.documentElement), cols=["--accent","--gold","--good","--bad"].map(v=>css.getPropertyValue(v).trim());
  const P=Array.from({length:90},()=>({x:c.width/2,y:c.height*0.35,vx:(Math.random()-.5)*12,vy:Math.random()*-12-3,s:Math.random()*6+4,c:cols[Math.floor(Math.random()*4)],r:Math.random()*6}));
  let f=0; (function step(){ x.clearRect(0,0,c.width,c.height); P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.4;p.r+=0.2;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore();}); if(++f<80) requestAnimationFrame(step); else x.clearRect(0,0,c.width,c.height); })();
}

// ---------- mastery ----------
function cardStrength(k){ const c=state.cards[k]; if(!c||!c.reps) return 0; return c.int>=21?1:c.int>=7?.8:c.int>=3?.6:.4; }
function mastery(s){
  if(!s.sections.length) return 0;
  const cards=s.sections.map(x=>cardStrength(s.id+"|"+x.label)), cardPct=cards.reduce((a,b)=>a+b,0)/cards.length*100;
  const rec=state.best[s.id]||0;
  return Math.round(cardPct*0.6 + rec*0.4);
}
function overall(){ const ss=state.scripts.filter(s=>s.sections.length); return ss.length? Math.round(ss.reduce((a,s)=>a+mastery(s),0)/ss.length) : 0; }

// ---------- spaced repetition (SM-2) ----------
function allCards(scopeAll){
  const src=scopeAll?state.scripts:[cur()], out=[];
  src.forEach(s=>s.sections.forEach((x,i)=>out.push({key:s.id+"|"+x.label, kind:"sec", sid:s.id, name:s.name, label:x.label, text:x.text, prev:i?s.sections[i-1].label:null})));
  const drugs=state.scripts.filter(s=>s.type==="drug"&&s.sections.length);
  if(scopeAll && drugs.length>1){
    const names=drugs.flatMap(s=>s.name.split(/[^A-Za-z]+/)).filter(w=>w.length>3).concat(["pseudoephedrine","dextromethorphan","norvasc","vasotec","hydrodiuril","microzide","hydrochlorothiazide","HCTZ"]);
    const re=new RegExp("\\b("+names.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")\\b","gi");
    drugs.forEach(s=>s.sections.forEach(x=>{ if(/effect|interaction|important|safety|works|beware|electrolyte|gout/i.test(x.label))
      out.push({key:"which|"+s.id+"|"+x.label, kind:"which", sid:s.id, name:s.name, label:x.label, text:strip(x.text).replace(re,"____"), opts:drugs.map(d=>({id:d.id,name:d.name}))}); }));
  }
  return out;
}
const isDue = k => { const c=state.cards[k]; return !c || c.due<=Date.now(); };
const dueCount = () => allCards(true).filter(c=>isDue(c.key)).length;
function nextInt(c,q){ if(c.reps===0) return q===5?3:1; if(c.reps===1) return q===3?2:q===5?6:3; return Math.max(c.int+1,Math.round(c.int*(q===3?1.2:q===5?c.ef*1.3:c.ef))); }
function grade(key,q){
  const c=state.cards[key]||{ef:2.5,int:0,reps:0,lapses:0,due:0};
  if(q<3){ c.reps=0; c.int=0; c.lapses++; c.due=Date.now()+10*60e3; }
  else { c.int=nextInt(c,q); c.reps++; c.due=midnight()+c.int*864e5; }
  c.ef=Math.max(1.3, c.ef+(0.1-(5-q)*(0.08+(5-q)*0.02)));
  state.cards[key]=c; state.reviews++; quest().cards++;
  award(q<3?2:q===3?5:8);
}
const ivl = (key,q) => q<3?"10m":nextInt(state.cards[key]||{ef:2.5,int:0,reps:0},q)+"d";
function buildQuiz(cram){
  let deck=allCards(quizAll).filter(c=>cram||isDue(c.key));
  for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
  quiz={deck, done:0, again:0, show:false, pick:null, scope:quizAll?"all":cur().id};
}
function weakSpots(){
  return Object.entries(state.cards).filter(([k,c])=>c.lapses>0).sort((a,b)=>b[1].lapses-a[1].lapses).slice(0,4).map(([k,c])=>{
    const p=k.split("|"), sid=p[0]==="which"?p[1]:p[0], label=p[0]==="which"?p[2]:p[1], s=state.scripts.find(x=>x.id===sid);
    return s?`${esc(s.name)} · ${esc(label)}${p[0]==="which"?" (which drug)":""} <span class="pill b">${c.lapses}× missed</span>`:null;
  }).filter(Boolean);
}
function nextDue(){
  const ts=allCards(quizAll).map(c=>(state.cards[c.key]||{}).due||0).filter(t=>t>Date.now());
  if(!ts.length) return null; const h=(Math.min(...ts)-Date.now())/36e5;
  return h<1?Math.ceil(h*60)+" min":h<24?Math.round(h)+" h":Math.round(h/24)+" d";
}

// ---------- rendering ----------
function renderTop(){
  const due=dueCount(), st=streak(), L=levelInfo(), ov=overall();
  document.getElementById("stats").innerHTML = (state.game?`<span class="pill o">Lv ${L.lvl}</span>`:"")+`<span class="pill ${due?"w":"g"}">${due} due</span><span class="pill a">${st}-day streak</span>`;
  document.getElementById("overall").innerHTML = `<span class="lbl">Mastery</span>${bar(ov)}<span class="num">${ov}%</span>`;
  document.getElementById("drugs").innerHTML = state.scripts.map(s=>`<button class="drug" data-id="${s.id}" aria-pressed="${s.id===cur().id}">${esc(s.name||"Untitled")}</button>`).join("")+`<button class="drug add" id="add">+ Add drug</button>`;
  document.querySelectorAll(".modes button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.mode===mode&&!editing));
}
const head = () => `<div class="rx"><h2>${esc(cur().name||"Untitled")}</h2><div class="row"><button class="ghost" id="edit">Edit</button></div></div>`;
const secHTML = (label,inner) => `<div class="sec"><span class="lbl">${esc(label)}</span><p>${inner}</p></div>`;
function gaps(s){
  const L=s.sections.map(x=>x.label).join(" | ");
  if(s.type==="flow"){ const flows=state.scripts.filter(x=>x.type==="flow"); if(s!==flows[flows.length-1]) return []; return /clos|teach|summar/i.test(L)?[]:["Closing / teach-back"]; }
  return [["Missed dose",/missed/i],["Storage",/stor/i],["Refills",/refill/i]].filter(([n,r])=>!r.test(L)).map(([n])=>n);
}
function render(){
  const sec=state.section||"counsel", ex=sec!=="counsel";
  document.querySelectorAll("[data-sect]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.sect===sec));
  { const ss=document.getElementById("sectsel"); if(ss&&ss.value!==sec) ss.value=sec; }
  document.getElementById("cwrap").hidden=ex; document.getElementById("xbar").hidden=sec!=="exam"; document.getElementById("e1bar").hidden=sec!=="e1";
  if(ex){ if(tick){ clearInterval(tick); tick=null; } stopMic();
    if(sec==="exam"&&typeof renderExam==="function") renderExam();
    if(sec==="e1"&&typeof renderE1==="function") renderE1();
    return; }
  renderTop();
  const card=document.getElementById("card"), s=cur();
  if(mode!=="mock"&&tick){ clearInterval(tick); tick=null; }
  if(mode!=="recite") stopMic();
  if(editing) return renderEdit(card,s);
  if(mode==="progress") return renderProgress(card);
  if(!s.sections.length){ card.innerHTML=head()+`<p class="hint">No script yet. Tap Edit and paste it in.</p>`; return; }
  ({read:renderRead, quiz:renderQuiz, fill:renderFill, recite:renderRecite, mock:renderMock})[mode](card,s);
}

function renderEdit(card,s){
  const txt=s.sections.map(x=>`# ${x.label}\n${x.text}`).join("\n\n");
  card.innerHTML=`<div class="rx"><h2>Edit script</h2></div>
    <label class="lbl" for="ename">Name</label>
    <input type="text" id="ename" value="${esc(s.name)}" placeholder="e.g. Lisinopril">
    <label class="toggle"><input type="checkbox" id="eflow" ${s.type==="flow"?"checked":""}> This is the general counseling flow, not a drug</label>
    <label class="lbl" for="etext">Script</label>
    <p class="hint">Start each section with <b># Section name</b>. Wrap must-say phrases in *stars*. They become key points for Fill-in and Recite scoring.</p>
    <textarea id="etext" style="min-height:340px" placeholder="# What it is&#10;*ACE inhibitor* used to *lower blood pressure*.&#10;&#10;# Missed dose&#10;...">${esc(txt)}</textarea>
    ${confirmDel?`<div class="confirm">Delete ${esc(s.name||"this script")}? <button id="delyes" class="danger">Delete</button><button id="delno">Keep</button></div>`:""}
    <div class="row">${state.scripts.length>1?'<button class="ghost danger" id="del">Delete</button>':''}<button class="ghost" id="cancel">Cancel</button><button class="primary" id="done">Save</button></div>`;
}
function parseEdit(t){
  const out=[]; let c=null;
  t.split("\n").forEach(line=>{ const m=line.match(/^#\s*(.+)$/);
    if(m){ c={label:m[1].trim(),text:""}; out.push(c); }
    else if(line.trim()){ if(!c){ c={label:"Script",text:""}; out.push(c);} c.text+=(c.text?" ":"")+line.trim(); } });
  return out.filter(x=>x.text);
}
function renderRead(card,s){
  const g=gaps(s);
  card.innerHTML=head()
    +(g.length?`<div class="note">Counseling rubrics usually check for <b>${g.join(", ")}</b>, and this script doesn't have ${g.length>1?"those sections":"that section"} yet. Ask her preceptor what to say, then add it with Edit.</div>`:"")
    +`<div class="script">${s.sections.map(x=>secHTML(x.label,marked(x.text))).join("")}</div>
    <p class="hint">Highlighted = key points graders listen for. Read it out loud once or twice, then go to Quiz and Fill-in.</p>`;
}

function renderQuiz(card,s){
  const seg=`<div class="qbar"><div class="seg"><button data-qv="cards" aria-pressed="${quizView==="cards"}">Cards</button><button data-qv="order" aria-pressed="${quizView==="order"}">Order drill</button></div>
    <label class="toggle"><input type="checkbox" id="qall" ${quizAll?"checked":""}> Mix all scripts</label></div>`;
  if(quizView==="order") return card.innerHTML=head()+seg+orderHTML(s);
  if(!quiz||quiz.scope!==(quizAll?"all":s.id)) buildQuiz(false);
  const q=quiz, bar2=`<div class="row left"><span class="pill g">${q.done} done</span><span class="pill b">${q.again} again</span><span class="pill w">${q.deck.length} left</span></div>`;
  if(!q.deck.length){
    const w=weakSpots(), nd=nextDue();
    card.innerHTML=head()+seg+`<div class="done"><span class="big">${q.done?"Done":"All caught up"}</span>
      <p class="hint">${nd?`Next card due in ${nd}. Spacing reviews out is the point, so come back then.`:"Nothing scheduled yet."}</p>
      <button id="qcram">Practice everything anyway</button>
      ${w.length?`<div class="weak"><span class="lbl">Weak spots</span>${w.map(x=>`<div>${x}</div>`).join("")}</div>`:""}</div>`;
    return;
  }
  const c=q.deck[0]; let body;
  if(c.kind==="which"){
    body=`<div class="flash"><span class="from">Which drug? · ${esc(c.label)}</span><div class="ans" style="border:0;padding:0">${esc(c.text)}</div></div>
      <div class="opts">${c.opts.map(o=>`<button data-pick="${o.id}" class="${q.pick?(o.id===c.sid?"right":(o.id===q.pick?"wrong":"")):""}" ${q.pick?"disabled":""}>${esc(o.name)}</button>`).join("")}</div>
      ${q.pick?`<div class="row"><button class="primary" id="qnext">Next</button></div>`:""}`;
  } else {
    body=`<div class="flash"><span class="from">${esc(c.name)}</span><span class="q">${esc(c.label)}?</span>
      <span class="prev">${c.prev?"Comes after: "+esc(c.prev):"First section"}</span>
      ${q.show?`<div class="ans">${marked(c.text)}</div>`:""}</div>
      ${q.show?`<div class="grades"><button class="again" data-g="0">Again<br><small>${ivl(c.key,0)}</small></button><button class="hard" data-g="3">Hard<br><small>${ivl(c.key,3)}</small></button><button class="good" data-g="4">Good<br><small>${ivl(c.key,4)}</small></button><button class="easy" data-g="5">Easy<br><small>${ivl(c.key,5)}</small></button></div>`
        :`<div class="row"><button class="primary" id="qshow">Show answer</button></div>`}
      <p class="hint">Say it out loud before you flip. Be strict: missing a highlighted point = Again.</p>`;
  }
  card.innerHTML=head()+seg+bar2+body;
}
function orderHTML(s){
  if(!order||order.sid!==s.id){ const labels=s.sections.map(x=>x.label); order={sid:s.id, sh:[...labels].sort(()=>Math.random()-.5), placed:[], mistakes:0, wrong:null}; }
  const o=order, labels=s.sections.map(x=>x.label), finished=o.placed.length===labels.length;
  return `<p class="hint">Tap the sections in the order you'd say them.</p>
    <div class="placed">${o.placed.map(l=>`<div>${esc(l)}</div>`).join("")}</div>
    ${finished?`<div class="done"><span class="big">${o.mistakes?o.mistakes+" slip"+(o.mistakes>1?"s":""):"Perfect"}</span><button class="primary" id="oagain">Shuffle again</button></div>`
      :`<div class="chips">${o.sh.filter(l=>!o.placed.includes(l)).map(l=>`<button data-ord="${esc(l)}" class="${o.wrong===l?"wrong":""}">${esc(l)}</button>`).join("")}</div>`}`;
}

function renderFill(card,s){
  const lvl=state.level[s.id]||0, ladder=`<div class="seg" role="group" aria-label="Difficulty">${LADDER.map((n,i)=>`<button data-lvl="${i}" aria-pressed="${i===lvl}">${n}</button>`).join("")}</div>`;
  let body, i=0;
  if(lvl===0){
    const hasKeys=s.sections.some(x=>keysOf(x.text).length);
    body=hasKeys?`<div class="script">${s.sections.map(x=>secHTML(x.label, x.text.split(/(\*[^*]+\*)/).map(part=>{
        if(/^\*[^*]+\*$/.test(part)){ const k="k"+(i++); return `<span class="blank${revealed.has(k)?" shown":""}" data-k="${k}" role="button" tabindex="0" aria-label="hidden key point">${esc(part.slice(1,-1))}</span>`; }
        return esc(part); }).join(""))).join("")}</div>`
      :`<div class="note">No key points marked in this script. Tap Edit and wrap must-say phrases in *stars*.</div>`;
  } else if(lvl<3){
    const pct=lvl===1?30:60, total=s.sections.reduce((n,x)=>n+words(x.text).length,0), rank=hideOrder(total,fadeSeed), cut=Math.round(total*pct/100);
    body=`<div class="script">${s.sections.map(x=>secHTML(x.label, words(x.text).map(w=>{const k=i++; return rank[k]<cut?`<span class="blank${revealed.has(k)?" shown":""}" data-k="${k}" role="button" tabindex="0" aria-label="hidden word">${esc(w)}</span>`:esc(w);}).join(" "))).join("")}</div>
      <div class="row left"><button id="shuffle">New blanks</button></div>`;
  } else {
    const fl=w=>{const m=w.match(/^([^A-Za-z0-9]*)([A-Za-z0-9])[A-Za-z0-9’'\-]*(.*)$/); return m?m[1]+m[2]+m[3]:w;};
    body=`<div class="script fl">${s.sections.map(x=>secHTML(x.label, esc(words(x.text).map(fl).join(" ")))).join("")}</div>`;
  }
  card.innerHTML=head()+ladder+body+`<p class="hint">Say the whole script out loud and fill each blank from memory. Tap a blank only to check. These are training wheels, so move up as soon as a level feels easy.</p>
    <div class="row">${lvl<3?`<button class="primary" data-lvl="${lvl+1}">Level up →</button>`:`<button class="primary" data-mode="recite">No hints: go to Recite →</button>`}</div>`;
}
function rng(seed){ return ()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }; }
function hideOrder(n,seed){ const a=[...Array(n).keys()], r=rng(seed*7919+n); for(let i=n-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];} const rank=new Array(n); a.forEach((v,i)=>rank[v]=i); return rank; }

// ---------- recite: mic + scoring + Claude grading ----------
const MIC_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`;
function renderRecite(card,s){
  if(reciteSec!=="all"&&!s.sections[+reciteSec]) reciteSec="all";
  const key=s.id+":"+reciteSec, draft=(s.drafts||{})[reciteSec]||"";
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition, GUM=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);
  const micOK=(SR&&!micBroken)||(GUM&&!levelBroken), t=targets(), p=state.patient;
  const z=[pos(t.vol[0]), pos(t.vol[1])];
  card.innerHTML=head()+`<div class="ctrl"><label class="lbl" for="rsec">Section</label>
      <select id="rsec"><option value="all">Whole script</option>${s.sections.map((x,i)=>`<option value="${i}" ${String(i)===reciteSec?"selected":""}>${esc(x.label)}</option>`).join("")}</select></div>
    <div class="patient">
      <div class="ctrl"><label class="lbl" for="page">Patient age</label><input type="number" id="page" min="1" max="110" inputmode="numeric" value="${p.age}">
        <label class="toggle"><input type="checkbox" id="phoh" ${p.hoh?"checked":""}> Hard of hearing</label></div>
      <p class="hint"><b>${esc(t.name)}:</b> volume ${fmtDb(t.vol[0])} to ${fmtDb(t.vol[1])} dB vs her normal voice, pace ${t.pace[0]}–${t.pace[1]} words/min. ${t.tip}</p>
      ${state.calib==null?`<div class="note">To grade volume, calibrate once: tap <b>Calibrate</b> and say “Hi, my name is [your name], I'm the pharmacy intern who will be counseling you today” at her normal talking volume, phone held where she'll hold it.</div>`:""}
      <div class="row left">${GUM&&!levelBroken?`<button id="calib">${state.calib==null?"Calibrate":"Recalibrate"} normal voice</button>`:`<span class="hint">Volume can't be measured on this device.</span>`}</div>
    </div>
    ${micOK?`<div class="mic"><button class="micbtn ${listening?"on":""}" id="mic" aria-label="${listening?"Stop recording":"Start recording"}">${MIC_SVG}</button>
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px"><p class="hint" id="michint">${listening?"Listening… tap again to stop.":"Tap the mic and say it with no notes."}</p>
      <div class="meter" id="meter" ${listening&&lv&&state.calib!=null?"":"hidden"}><span class="zone" style="left:${z[0]}%;width:${z[1]-z[0]}%"></span><i id="mlvl"></i></div></div></div>`
      :`<p class="hint">${micBroken?"The mic button isn't allowed on this page. ":""}Tap the box, then the <b>mic on your phone keyboard</b>, and say it with no notes. Or type it. (Volume and pace grading need the mic button.)</p>`}
    <textarea id="rec" placeholder="Your recitation shows up here…">${esc(draft)}</textarea>
    <div id="delivery">${state.lastDelivery&&state.lastDelivery.key===key?deliveryHTML(state.lastDelivery):""}</div>
    <div class="row"><button class="ghost" id="clear">Clear</button><button class="primary" id="check">Check</button></div>
    <div id="result">${lastCheck&&lastCheck.key===key?lastCheck.html:""}</div>
    <div id="aiout"></div>`;
}

// ---------- delivery: volume + pace by patient ----------
function targets(){
  const {age,hoh}=state.patient;
  if(hoh) return {name:`Hard of hearing patient (${age})`, vol:[6,12], pace:[90,130], tip:"Louder, slower, face them, and keep a lower pitch. Raised, not shouting."};
  if(age>=65) return {name:`Older adult (${age})`, vol:[3,9], pace:[100,140], tip:"A little louder and noticeably slower, with pauses after key points."};
  if(age<18) return {name:`Young patient or caregiver (${age})`, vol:[0,6], pace:[110,150], tip:"Normal volume, simple words, check understanding often."};
  return {name:`Adult (${age})`, vol:[0,6], pace:[120,160], tip:"Normal conversational volume and a calm, steady pace."};
}
const pos = rel => Math.max(0,Math.min(100,(rel+15)/35*100));
const fmtDb = d => (d>0?"+":"")+Math.round(d);
let lv=null, levelBroken=false, sess=null;
async function openLevel(){
  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
  const ctx=new (window.AudioContext||window.webkitAudioContext)(), an=ctx.createAnalyser(); an.fftSize=2048;
  ctx.createMediaStreamSource(stream).connect(an);
  const buf=new Float32Array(an.fftSize), L={frames:[], raf:0, onFrame:null,
    stop(){ cancelAnimationFrame(L.raf); stream.getTracks().forEach(t=>t.stop()); ctx.close().catch(()=>{}); }};
  const step=()=>{ an.getFloatTimeDomainData(buf); let s=0; for(let i=0;i<buf.length;i++) s+=buf[i]*buf[i]; const db=10*Math.log10(s/buf.length+1e-12); L.frames.push(db); L.onFrame&&L.onFrame(db); L.raf=requestAnimationFrame(step); };
  step(); return L;
}
function voiced(frames){ // speech frames = well above the room's noise floor
  if(frames.length<30) return null;
  const s=[...frames].sort((a,b)=>a-b), floor=s[Math.floor(s.length*0.2)], v=frames.filter(d=>d>floor+10);
  if(v.length<20) return null; const vs=[...v].sort((a,b)=>a-b); return {med:vs[Math.floor(vs.length/2)], v};
}
async function calibrate(){
  const b=document.getElementById("calib"); if(!b) return;
  try{
    b.disabled=true; b.textContent="Say the intro line… (4s)";
    const L=await openLevel(); await new Promise(r=>setTimeout(r,4000)); L.stop();
    const res=voiced(L.frames);
    if(!res){ toast("Couldn't hear enough. Try again a bit closer."); }
    else { state.calib=res.med; save(); toast("Normal voice saved"); }
  }catch(e){ levelBroken=true; toast("This page isn't allowed to measure volume here"); }
  render();
}
function deliveryHTML(d){
  const t=d.t, row=(label,val,ok,msg)=>`<div class="drow"><span class="lbl">${label}</span><b>${val}</b><span class="${ok===null?"hint":ok?"y":"n"}">${ok===null?"":ok?"✓ ":"✗ "}${msg}</span></div>`;
  const vol = d.rel==null ? row("Volume","—",null, state.calib==null?"Calibrate first to grade volume.":"Couldn't measure volume this time.")
    : row("Volume", fmtDb(d.rel)+" dB", d.rel>=t.vol[0]&&d.rel<=t.vol[1], d.rel<t.vol[0]?"Too quiet for this patient. Project more.":d.rel>t.vol[1]?"Louder than needed. Raised, not shouting.":`Right level · in range ${d.zone}% of the time`);
  const pace = d.wpm==null ? row("Pace","—",null,"Need a longer recording to measure pace.")
    : row("Pace", d.wpm+" wpm", d.wpm>=t.pace[0]&&d.wpm<=t.pace[1], d.wpm>t.pace[1]?"Too fast. Slow down and pause after key points.":d.wpm<t.pace[0]?"A bit slow. Keep it flowing.":"Good pace");
  return `<div class="deliv"><span class="lbl">Delivery for ${esc(t.name)}</span>${vol}${pace}</div>`;
}
function startMic(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const ta=document.getElementById("rec"), base=ta.value.trim()?ta.value.trim()+" ":"";
  sess={t0:Date.now(), baseWords:words(base).length};
  listening=true;
  const b=document.getElementById("mic"); b.classList.add("on"); b.setAttribute("aria-label","Stop recording"); document.getElementById("michint").textContent="Listening… tap again to stop.";
  if(SR&&!micBroken){
    try{
      rec=new SR(); rec.continuous=true; rec.interimResults=true; rec.lang="en-US";
      rec.onresult=e=>{ let tx=""; for(let i=0;i<e.results.length;i++) tx+=e.results[i][0].transcript; const el=document.getElementById("rec"); if(el){ el.value=base+tx.trim(); const s=cur(); s.drafts=s.drafts||{}; s.drafts[reciteSec]=el.value; save(); } };
      rec.onerror=e=>{
        if(e.error==="audio-capture"&&lv){ const h=document.getElementById("michint"); if(h) h.textContent="Measuring volume only. This phone can't transcribe at the same time, so use the keyboard mic for words."; return; }
        if(["not-allowed","service-not-allowed","audio-capture"].includes(e.error)){ micBroken=true; if(!lv){ listening=false; render(); } }
      };
      rec.onend=()=>{ if(listening&&!lv) stopMic(); };
      rec.start();
    }catch(e){ micBroken=true; }
  }
  if(!levelBroken&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
    openLevel().then(L=>{
      if(!listening){ L.stop(); return; }
      lv=L; const m=document.getElementById("meter"); if(m&&state.calib!=null) m.hidden=false;
      L.onFrame=db=>{ const i=document.getElementById("mlvl"); if(i&&state.calib!=null){ const rel=db-state.calib, t=targets(); i.style.left=pos(rel)+"%"; i.className=rel>=t.vol[0]&&rel<=t.vol[1]?"ok":""; } };
    }).catch(()=>{ levelBroken=true; if(micBroken){ listening=false; render(); } });
  }
}
function stopMic(){
  if(!listening) return;
  listening=false;
  if(rec){ try{rec.stop();}catch(e){} rec=null; }
  const s=cur(), t=targets(), ta=document.getElementById("rec");
  let rel=null, zone=0;
  if(lv){ const res=voiced(lv.frames); lv.stop();
    if(res&&state.calib!=null){ rel=res.med-state.calib; zone=Math.round(res.v.filter(d=>{const r=d-state.calib; return r>=t.vol[0]&&r<=t.vol[1];}).length/res.v.length*100); }
    lv=null; }
  const secs=sess?(Date.now()-sess.t0)/1000:0, n=ta?words(ta.value).length-(sess?sess.baseWords:0):0;
  const wpm = secs>=8&&n>=15 ? Math.round(n/(secs/60)) : null;
  if(rel!=null||wpm!=null){
    state.lastDelivery={key:s.id+":"+reciteSec, rel, zone, wpm, t};
    const good=(rel==null||(rel>=t.vol[0]&&rel<=t.vol[1]))&&(wpm==null||(wpm>=t.pace[0]&&wpm<=t.pace[1]));
    save(); if(good) award(5);
  }
  const b=document.getElementById("mic");
  if(b){ b.classList.remove("on"); b.setAttribute("aria-label","Start recording"); document.getElementById("michint").textContent="Tap the mic and say it with no notes."; const m=document.getElementById("meter"); if(m) m.hidden=true;
    const dv=document.getElementById("delivery"); if(dv&&state.lastDelivery&&state.lastDelivery.key===s.id+":"+reciteSec) dv.innerHTML=deliveryHTML(state.lastDelivery); }
}

function reciteTarget(s){ return reciteSec==="all"?s.sections.map(x=>`[${x.label}] ${x.text}`).join("\n"):s.sections[+reciteSec].text; }
function check(){
  stopMic();
  const s=cur(), said=document.getElementById("rec").value;
  if(!said.trim()){ toast("Say or type something first"); return; }
  const target=reciteSec==="all"?s.sections.map(x=>x.text).join(" "):s.sections[+reciteSec].text;
  const A=words(target), B=said.split(/\s+/).filter(Boolean), a=A.map(norm), b=B.map(norm);
  const n=a.length, m=b.length, L=Array.from({length:n+1},()=>new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) L[i][j]=a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  let i=0,j=0,out=[],hit=0,miss=0,extra=0;
  while(i<n||j<m){
    if(i<n&&j<m&&a[i]===b[j]){ out.push(esc(A[i])); hit++; i++; j++; }
    else if(j<m&&(i>=n||L[i][j+1]>=L[i+1][j])){ if(b[j]){out.push(`<span class="extra">${esc(B[j])}</span>`); extra++;} j++; }
    else { out.push(`<span class="miss">${esc(A[i])}</span>`); miss++; i++; }
  }
  const saidSet=new Set(b), keys=keysOf(target);
  const kres=keys.map(k=>{ const kw=k.split(/\s+/).map(norm).filter(Boolean), h=kw.filter(w=>saidSet.has(w)).length; return {k, ok:kw.length&&h/kw.length>=0.75}; });
  const khit=kres.filter(x=>x.ok).length, pct=n?Math.round(hit/n*100):0, kpct=keys.length?Math.round(khit/keys.length*100):pct;
  if(reciteSec==="all"){ state.best[s.id]=Math.max(state.best[s.id]||0,kpct); if(keys.length&&khit===keys.length) unlock("keys"); }
  quest().recite=true;
  const html=`<div class="card" style="padding:16px;border-style:dashed">
    <div class="score">${keys.length?`<span class="big">${khit}/${keys.length}</span><span class="lbl">key points</span>`:`<span class="big">${pct}%</span>`}
      <span class="pill a">${pct}% word match</span><span class="pill b">${miss} missed</span><span class="pill w">${extra} extra</span></div>
    ${keys.length?`<div class="keys">${kres.map(x=>`<div class="${x.ok?"y":"n"}">${x.ok?"✓":"✗"} ${esc(x.k)}</div>`).join("")}</div>`:""}
    <details><summary class="lbl" style="cursor:pointer">Word-by-word diff</summary>
    <div class="legend" style="margin-block:8px"><span><span class="miss">red</span> = skipped</span><span><span class="extra">struck</span> = not in script</span></div>
    <div class="diff">${out.join(" ")}</div></details>
    ${sample?`<div class="row"><button class="primary" id="aigrade">Get Claude's feedback</button></div>`:""}</div>`;
  lastCheck={key:s.id+":"+reciteSec, html};
  document.getElementById("result").innerHTML=html;
  document.getElementById("aiout").innerHTML="";
  award(Math.max(3,khit*2));
}
async function aiGrade(){
  if(!sample||aiBusy) return;
  const s=cur(), said=document.getElementById("rec").value.trim(), out=document.getElementById("aiout"), btn=document.getElementById("aigrade");
  const part=reciteSec==="all"?"the whole script":`the "${s.sections[+reciteSec].label}" section`;
  const prompt=`You are a friendly but honest pharmacy preceptor grading a pharmacy intern's spoken patient-counseling practice for ${s.name}, ${part}.
Her reference script is below. Phrases wrapped in *stars* are must-say key points. Her attempt was captured with speech-to-text, so ignore transcription glitches, filler words, punctuation, and harmless rewording; judge whether the meaning and key points came across correctly and in a sensible order, in patient-friendly language. Flag anything she said that contradicts the script or could mislead a patient. Grade only against her script; do not add new clinical content.

REFERENCE SCRIPT:
${reciteTarget(s)}

HER ATTEMPT:
${said}
${(()=>{ const d=state.lastDelivery; if(!d||d.key!==s.id+":"+reciteSec) return ""; return `
DELIVERY (measured by the app; patient is ${d.t.name}): volume ${d.rel==null?"not measured":fmtDb(d.rel)+" dB vs her normal voice (target "+fmtDb(d.t.vol[0])+" to "+fmtDb(d.t.vol[1])+")"}; pace ${d.wpm==null?"not measured":d.wpm+" words/min (target "+d.t.pace[0]+"-"+d.t.pace[1]+")"}. If delivery is off target, mention it in the tip.`; })()}

Reply with only JSON in this shape:
{"score": 0-100, "verdict": "one short sentence", "praise": "one specific thing she did well", "covered": ["key point", ...], "missed": ["key point", ...], "inaccurate": ["what she said that was wrong or misleading", ...], "tip": "one concrete thing to fix next attempt"}`;
  aiBusy=true; if(btn){ btn.disabled=true; btn.textContent="Grading…"; }
  aiCtl=new AbortController();
  out.innerHTML=`<div class="ai"><span class="lbl">Claude is grading</span><p class="hint">Thinking…</p><div class="row left"><button id="aistop">Stop</button></div></div>`;
  try{
    const r=await sample.json(prompt,{signal:aiCtl.signal});
    const sc=Math.max(0,Math.min(100,Math.round(Number(r.score)||0))), li=a=>Array.isArray(a)&&a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p class="hint">None</p>`;
    out.innerHTML=`<div class="ai"><div class="score"><span class="big">${sc}</span><span class="lbl">Claude's grade</span></div>
      <p style="margin:0"><b>${esc(r.verdict||"")}</b></p>
      ${r.praise?`<p style="margin:0" class="hint">👍 ${esc(r.praise)}</p>`:""}
      <span class="lbl">Missed</span>${li(r.missed)}
      ${Array.isArray(r.inaccurate)&&r.inaccurate.length?`<span class="lbl" style="color:var(--bad)">Inaccurate</span>${li(r.inaccurate)}`:""}
      <details><summary class="lbl" style="cursor:pointer">Covered</summary>${li(r.covered)}</details>
      ${r.tip?`<div class="tip"><b>Next time:</b> ${esc(r.tip)}</div>`:""}</div>`;
    if(reciteSec==="all") state.best[s.id]=Math.max(state.best[s.id]||0,sc);
    if(sc>=90) unlock("ai90");
    award(Math.round(sc/5));
  }catch(e){
    const msg={cancelled:"Stopped.", not_granted:"Claude grading wasn't allowed, so it's hidden for now.", sampling_disabled:"Claude grading isn't available on this account.", rate_limited:"Too many requests right now. Try again in a minute.", invalid_json:"Claude's reply came back garbled. Try again.", session_expired:"Sign in again to use Claude grading."}[e&&e.code]||"Grading failed. Try again.";
    out.innerHTML=`<p class="hint">${msg}</p>`;
    if(e&&["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(e.code)) sample=null;
  }finally{ aiBusy=false; const b=document.getElementById("aigrade"); if(b){ if(!sample) b.remove(); else { b.disabled=false; b.textContent="Grade again"; } } }
}

// ---------- mock ----------
function renderMock(card,s){
  const drugs=state.scripts.filter(x=>x.type==="drug");
  if(!mock){
    const hist=state.mocks.slice(-5).reverse();
    card.innerHTML=`<div class="rx"><h2>Mock counseling</h2></div>
      <p class="hint">A full timed run: counseling flow plus one drug, 5 minutes, scored on a counseling-competition-style checklist. Best with a partner: hand them the phone so they play the patient, tick boxes, and throw curveball questions.</p>
      <div class="ctrl"><label class="lbl" for="mdrug">Drug</label><select id="mdrug">${drugs.map(d=>`<option value="${d.id}" ${d.id===s.id?"selected":""}>${esc(d.name)}</option>`).join("")}</select></div>
      <div class="ctrl"><label class="lbl" for="mpers">Patient</label><select id="mpers"><option value="rand">Random personality</option>${PERSONAS.map(p=>`<option>${p}</option>`).join("")}</select></div>
      <div class="row"><button class="primary" id="mstart">Start 5:00</button></div>
      ${hist.length?`<div class="hist"><span class="lbl">Recent runs</span>${hist.map(h=>`<div>${h.date} · ${esc(h.name)} · <b>${h.score}/${h.total}</b> · ${fmt(h.secs)}</div>`).join("")}</div>`:""}`;
    return;
  }
  const m=mock, d=state.scripts.find(x=>x.id===m.sid)||s, score=Object.values(m.checks).filter(Boolean).length;
  const curveHTML=m.curve?(()=>{ const sec=d.sections.find(x=>m.curve.m.test(x.label));
    return `<div class="curve"><span class="lbl">Patient asks</span><span class="q">“${esc(m.curve.q)}”</span>
      <details><summary class="lbl" style="cursor:pointer">Answer from her script</summary><p style="margin:.5em 0 0">${sec?marked(sec.text):`<i>Not in her script yet. Add this section with Edit.</i>`}</p></details></div>`; })():"";
  const missed=RUBRIC.filter((r,i)=>!m.checks[i]);
  card.innerHTML=`<div class="rx"><h2>${esc(d.name)}</h2><span class="pill a">Patient: ${esc(m.persona)}</span></div>
    <div class="qbar"><span class="timer ${m.left<=60?"warn":""}" id="mtime">${fmt(m.done?m.used:m.left)}</span>
      <div class="row">${m.done?"":`<button id="mcurve">Curveball</button><button class="primary" id="mstop">Finish</button>`}</div></div>
    ${curveHTML}
    ${m.done?`<div class="score"><span class="big">${score}/${RUBRIC.length}</span><span class="lbl">checklist · ${fmt(m.used)} used</span></div>
      ${missed.length?`<div class="note"><b>Missed:</b> ${missed.join(" · ")}</div>`:""}`:""}
    <div class="checks">${RUBRIC.map((r,i)=>`<label><input type="checkbox" data-chk="${i}" ${m.checks[i]?"checked":""}><span>${r}</span></label>`).join("")}</div>
    ${m.done?`<div class="row"><button id="mnew">New run</button></div>`:`<p class="hint">Partner: tick each item as she covers it. Say "one minute" at 1:00.</p>`}`;
}
const fmt=t=>Math.floor(Math.max(0,t)/60)+":"+String(Math.max(0,t)%60).padStart(2,"0");
function startMock(){
  const sid=document.getElementById("mdrug").value, p=document.getElementById("mpers").value;
  mock={sid, persona:p==="rand"?PERSONAS[Math.floor(Math.random()*PERSONAS.length)]:p, end:Date.now()+300e3, left:300, checks:{}, curve:null, done:false, paid:0};
  try{ navigator.wakeLock&&navigator.wakeLock.request("screen").then(l=>{ if(mock) mock.lock=l; }).catch(()=>{}); }catch(e){}
  tick=setInterval(()=>{
    if(!mock||mock.done) return;
    mock.left=Math.round((mock.end-Date.now())/1000);
    const el=document.getElementById("mtime"); if(el){ el.textContent=fmt(mock.left); el.classList.toggle("warn",mock.left<=60); }
    if(mock.left===60&&navigator.vibrate) try{navigator.vibrate(300);}catch(e){}
    if(mock.left<=0) finishMock();
  },500);
  render();
}
function finishMock(){
  if(!mock||mock.done) return;
  clearInterval(tick); tick=null; mock.done=true; mock.used=Math.min(300,300-Math.max(0,mock.left));
  try{ mock.lock&&mock.lock.release(); }catch(e){}
  const d=state.scripts.find(x=>x.id===mock.sid);
  mock.rec={date:dayStr(), sid:mock.sid, name:d?d.name:"", secs:mock.used, score:0, total:RUBRIC.length};
  state.mocks.push(mock.rec); state.mocks=state.mocks.slice(-30); quest().drill=true;
  syncMock(); award(10); render();
}
function syncMock(){ if(!mock||!mock.rec) return; const sc=Object.values(mock.checks).filter(Boolean).length; mock.rec.score=sc; const extra=sc*3-mock.paid; if(extra>0){ mock.paid+=extra; award(extra);} else save(); }

// ---------- progress ----------
function renderProgress(card){
  const ov=overall(), L=levelInfo(), q=quest(), rw=state.reward;
  const rows=state.scripts.filter(s=>s.sections.length).map(s=>{
    const m=mastery(s), learned=s.sections.filter(x=>cardStrength(s.id+"|"+x.label)>0).length, best=state.best[s.id], mk=state.mocks.filter(x=>x.sid===s.id).reduce((a,x)=>Math.max(a,x.score),-1);
    return `<div class="prow"><div class="top"><b>${esc(s.name)}</b><span class="num">${m}%</span></div>${bar(m)}
      <div class="sub"><span>Cards learned ${learned}/${s.sections.length}</span><span>Best recite ${best!==undefined?best+"%":"—"}</span>${s.type==="drug"?`<span>Best mock ${mk>=0?mk+"/"+RUBRIC.length:"—"}</span>`:""}</div></div>`;
  }).join("");
  const qi=(on,t)=>`<div><span class="ck ${on?"on":""}">${on?"✓":""}</span>${t}</div>`;
  card.innerHTML=`<div class="rx"><h2>Progress</h2>
      <div class="seg" role="group" aria-label="Style"><button data-style="study" aria-pressed="${!state.game}">Study</button><button data-style="game" aria-pressed="${state.game}">Game</button></div></div>
    <div class="prog">
      <div class="prow"><div class="top"><b>Overall mastery</b><span class="big" style="font-size:1.8rem">${ov}%</span></div>${bar(ov)}
        <p class="hint">Mastery = how well cards are sticking over days (60%) + her best full-script recite score (40%).</p></div>
      ${rw.text?`<div class="reward ${rw.won?"won":""}"><span class="lbl">${rw.won?"Unlocked "+rw.won:"Reward at "+rw.goal+"% mastery"}</span><span class="r">${esc(rw.text)}</span>
          ${rw.won?`<p class="hint" style="color:var(--ink)">Earned it. Cash it in.</p>`:`${bar(ov/rw.goal*100,"gold")}<p class="hint">${rw.goal-ov}% to go</p>`}</div>`:""}
      ${state.game?`<div class="lvl"><div class="badge">${L.lvl}</div><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px"><b>${L.title}</b>${bar(L.into/L.need*100,"gold")}<span class="sub">${L.into}/${L.need} XP to level ${L.lvl+1} · ${state.xp} XP total</span></div></div>
        <div><h3>Today's quest ${q.claimed?'<span class="pill g">Done +50 XP</span>':'<span class="pill o">+50 XP bonus</span>'}</h3>
          <div class="quest" style="margin-top:8px">${qi(q.cards>=10,`Review 10 cards (${Math.min(q.cards,10)}/10)`)}${qi(q.recite,"Do one Recite check")}${qi(q.drill,"Finish a Mock or an Order drill")}</div></div>`:""}
      <h3>Per script</h3>${rows}
      ${state.game?`<h3>Badges <span class="num">${Object.keys(state.badges).length}/${BADGES.length}</span></h3>
        <div class="badges">${BADGES.map(b=>`<div class="bdg ${state.badges[b.id]?"on":"off"}"><b>${b.n}</b><span>${b.d}</span>${state.badges[b.id]?`<span class="lbl">${state.badges[b.id]}</span>`:""}</div>`).join("")}</div>`:""}
      <details><summary class="lbl" style="cursor:pointer">Set a reward</summary>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">
          <p class="hint">Something real she unlocks when overall mastery hits the goal. A boba run, a dinner, a day off from dishes.</p>
          <div class="ctrl"><input type="text" id="rwtext" value="${esc(rw.text)}" placeholder="e.g. Sushi dinner">
          <select id="rwgoal">${[60,70,80,90].map(g=>`<option ${g===rw.goal?"selected":""}>${g}</option>`).join("")}</select><span class="lbl">%</span></div>
          <div class="row"><button class="primary" id="rwsave">Save reward</button></div></div></details>
      <details><summary class="lbl" style="cursor:pointer">Reset progress</summary>
        <div class="row left" style="margin-top:10px">${confirmReset?`<div class="confirm">Wipe all progress, XP and badges? Scripts stay. <button id="resetyes" class="danger">Reset</button><button id="resetno">Keep</button></div>`:`<button class="danger" id="reset">Reset progress</button>`}</div></details>
    </div>`;
}

// ---------- events ----------
document.addEventListener("click", e=>{
  const t=e.target.closest("button,.blank"); if(!t) return;
  if(t.classList.contains("blank")){ const k=t.dataset.k; revealed.has(k)?revealed.delete(k):revealed.add(k); t.classList.toggle("shown"); return; }
  const s=cur(), d=t.dataset;
  if(t.id==="overall"){ mode="progress"; editing=false; render(); return; }
  if(d.mode){ mode=d.mode; editing=false; render(); return; }
  if(d.id){ state.cur=d.id; editing=false; revealed.clear(); reciteSec="all"; order=null; if(!quizAll) quiz=null; if(mode==="progress") mode="read"; save(); render(); return; }
  if(d.style){ state.game=d.style==="game"; save(); render(); return; }
  if(d.qv){ quizView=d.qv; render(); return; }
  if(d.lvl!==undefined){ state.level[s.id]=+d.lvl; revealed.clear(); save(); render(); return; }
  if(d.g!==undefined){ const c=quiz.deck.shift(); if(+d.g===0){ quiz.again++; quiz.deck.splice(Math.min(3,quiz.deck.length),0,c);} else quiz.done++; quiz.show=false; grade(c.key,+d.g); render(); return; }
  if(d.pick){ const c=quiz.deck[0]; quiz.pick=d.pick; if(d.pick===c.sid){ state.whichRight++; } grade(c.key, d.pick===c.sid?4:0); render(); return; }
  if(d.ord){ const labels=s.sections.map(x=>x.label); if(d.ord===labels[order.placed.length]){ order.placed.push(d.ord); order.wrong=null; } else { order.mistakes++; order.wrong=d.ord; }
    if(order.placed.length===labels.length){ quest().drill=true; if(!order.mistakes) unlock("order"); award(order.mistakes?10:20); } render(); return; }
  switch(t.id){
    case "add": { const id="d"+Date.now(); state.scripts.push({id,type:"drug",name:"",sections:[]}); state.cur=id; editing=true; save(); render(); document.getElementById("ename").focus(); break; }
    case "edit": editing=true; confirmDel=false; render(); break;
    case "cancel": editing=false; if(!s.sections.length&&!s.name){ state.scripts=state.scripts.filter(x=>x!==s); state.cur=state.scripts[0].id; save(); } render(); break;
    case "done": s.name=document.getElementById("ename").value.trim()||"Untitled"; s.type=document.getElementById("eflow").checked?"flow":"drug"; s.sections=parseEdit(document.getElementById("etext").value); s.drafts={}; editing=false; revealed.clear(); lastCheck=null; quiz=null; order=null; save(); render(); break;
    case "del": confirmDel=true; render(); break;
    case "delno": confirmDel=false; render(); break;
    case "delyes": state.scripts=state.scripts.filter(x=>x.id!==state.cur); state.cur=state.scripts[0].id; editing=false; confirmDel=false; quiz=null; order=null; save(); render(); break;
    case "shuffle": fadeSeed++; revealed.clear(); render(); break;
    case "mic": listening?stopMic():startMic(); break;
    case "calib": calibrate(); break;
    case "check": check(); break;
    case "aigrade": aiGrade(); break;
    case "aistop": aiCtl&&aiCtl.abort(); break;
    case "clear": stopMic(); if(s.drafts) delete s.drafts[reciteSec]; lastCheck=null; save(); render(); break;
    case "qshow": quiz.show=true; render(); break;
    case "qnext": quiz.deck.shift(); quiz.pick=null; quiz.done++; render(); break;
    case "qcram": buildQuiz(true); render(); break;
    case "oagain": order=null; render(); break;
    case "mstart": startMock(); break;
    case "mstop": finishMock(); break;
    case "mnew": mock=null; render(); break;
    case "mcurve": { const pool=CURVES.filter(c=>!c.only||c.only===mock.sid); let c; do{ c=pool[Math.floor(Math.random()*pool.length)]; }while(pool.length>1&&mock.curve===c); mock.curve=c; render(); break; }
    case "rwsave": state.reward={text:document.getElementById("rwtext").value.trim(), goal:+document.getElementById("rwgoal").value, won:false}; checkBadges(); save(); toast(state.reward.text?"Reward set":"Reward cleared"); render(); break;
    case "reset": confirmReset=true; render(); break;
    case "resetno": confirmReset=false; render(); break;
    case "resetyes": Object.assign(state,{cards:{},days:[],mocks:[],best:{},xp:0,badges:{},reviews:0,whichRight:0,quest:null,level:{}}); state.reward.won=false; confirmReset=false; quiz=null; save(); render(); break;
  }
});
document.addEventListener("keydown", e=>{ if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("blank")){ e.preventDefault(); e.target.click(); }});
document.addEventListener("change", e=>{
  const id=e.target.id;
  if(id==="rsec"){ stopMic(); reciteSec=e.target.value; render(); }
  if(id==="qall"){ quizAll=e.target.checked; quiz=null; render(); }
  if(id==="page"||id==="phoh"){ const a=parseInt(document.getElementById("page").value,10); state.patient={age:a>0&&a<120?a:45, hoh:document.getElementById("phoh").checked}; save(); if(!listening) render(); }
  if(e.target.dataset.chk!==undefined&&mock){ mock.checks[+e.target.dataset.chk]=e.target.checked; if(mock.done){ syncMock(); render(); } }
});
document.addEventListener("input", e=>{ if(e.target.id==="rec"){ const s=cur(); s.drafts=s.drafts||{}; s.drafts[reciteSec]=e.target.value; save(); } });

// first render happens after the exam scripts load
// light up Claude grading when the viewer supports it
if(window.claude&&window.claude.use) window.claude.use("sample").then(fn=>{ sample=fn||null; if(sample&&state.section==="exam"&&typeof renderExam==="function") renderExam(); if(sample&&state.section==="e1"&&typeof renderE1==="function") renderE1(); if(sample&&mode==="recite"&&lastCheck){ const r=document.querySelector("#result .card"); if(r&&!document.getElementById("aigrade")) r.insertAdjacentHTML("beforeend",`<div class="row"><button class="primary" id="aigrade">Get Claude's feedback</button></div>`); } }).catch(()=>{});
