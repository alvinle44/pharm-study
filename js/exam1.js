// ===== PHAR 131 Exam 1 section =====
// Tabs and the practice-exam blueprint are built from the content files, so adding a topic = adding a data file.
const E1_SHORT = {vaxA:"Vaccines: science & admin", vaxB:"Vaccines: big 7 & schedules", bp:"Blood pressure", adh:"Adherence & forms", ppcp:"PPCP", ins:"Insulin"};
const E1_TABS = [["home","Overview"], ...E1_DATA.map(t=>[t.id, t.tab||E1_SHORT[t.id]||t.name]), ["exam","Practice exam"]];
const E1_BLUEPRINT = (()=>{ // split 55 questions by each topic's weight (largest remainder)
  const N=55, tot=E1_DATA.reduce((a,t)=>a+(t.weight||1),0)||1, raw=E1_DATA.map(t=>[t.id,N*(t.weight||1)/tot]);
  const out=Object.fromEntries(raw.map(([id,v])=>[id,Math.floor(v)])); let left=N-Object.values(out).reduce((a,b)=>a+b,0);
  raw.sort((a,b)=>(b[1]%1)-(a[1]%1)).forEach(([id])=>{ if(left>0){ out[id]++; left--; } }); return out; })();
const CDC_KIDS = "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age.html";
const CDC_ADULT = "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html";
let e1q=null, e1c=null, e1x=null, e1genBusy=false;
const E1_CAUSES=[["know","Didn't know it","Make it a flashcard habit: re-read that guide section, then retry tomorrow."],["misread","Misread the stem","Read the last line of the stem first; circle age, pregnancy, meds, NOT/EXCEPT/FIRST."],["sata","Select-all over/under-picked","Judge every option as its own true/false statement; don't guess how many are right."],["sched","Schedule reading","Table 1 → catch-up/minimum intervals → Notes. Check AGE first, then the Notes for that vaccine."],["calc","Calculation/units","Write the units on every line; re-check the unit the question asks for."],["changed","Changed right → wrong","Only change an answer for a concrete reason you can name (a missed fact or qualifier)."]];
const E1_PLAN=[["Day 12","Diagnostic: full timed practice exam. Tag every miss in the error log."],["Day 11","Vaccine science, live vs non-live, spacing rules: cards + 25 mixed Qs."],["Day 10","CDC schedule reading: Table 1 → minimum intervals → Notes on 10 cases (Big 7 tab)."],["Day 9","Screening questions (what a YES means), contraindications, administration technique."],["Day 8","Big 7 vaccines: indications, doses, who gets what. Interleaved set + cards."],["Day 7","Blood pressure (lecture + lab errors) and adherence & health-care forms."],["Day 6","PPCP collect/assess + drug therapy problems; insulin basics."],["Day 5","Full timed practice exam #2, then 60–90 min error-log review."],["Day 4","Fix your top 2 error causes; schedule cases again."],["Day 3","Smart mixed set ×2 across all topics; cards from misses only."],["Day 2","Full timed practice exam #3 (exact length/time)."],["Day 1","Light cards (30–45 min), re-read error log and schedule legend/Notes. Sleep."]];
function e1s(){ state.e1=state.e1||{tab:"home", tool:"guide", qs:{}, exams:[], gen:{}, star:false, cram:false}; return state.e1; }
const e1topic = id => E1_DATA.find(t=>t.id===id);
// Stable IDs: progress is keyed by a hash of the question/card text (or an explicit "id" field),
// so adding, removing or reordering content never scrambles saved progress.
function e1Hash(str){ let h=5381; for(let i=0;i<str.length;i++) h=((h<<5)+h+str.charCodeAt(i))|0; return (h>>>0).toString(36); }
function e1Qs(id){ const t=e1topic(id); const base=t.mcq.map((q,i)=>({...q, key:id+"|"+(q.id||e1Hash(q.q)), topic:id})); const g=(e1s().gen[id]||[]).map((q,i)=>({...q, key:id+"|g"+q.gid, topic:id, ai:1})); return base.concat(g); }
function e1Cards(id){ return e1topic(id).cards.map(([f,b,s,simple])=>({key:"e1|"+id+"|"+e1Hash(f), f, b, s, simple})); }
function e1Mastery(id){
  const cs=e1Cards(id), cst=cs.reduce((a,c)=>a+cardStrength(c.key),0)/Math.max(1,cs.length);
  const qs=e1Qs(id), st=e1s().qs, right=qs.filter(q=>st[q.key]&&st[q.key].last).length;
  return Math.round((cst*0.5 + right/Math.max(1,qs.length)*0.5)*100);
}
function e1Overall(){ let w=0,s=0; E1_DATA.forEach(t=>{ w+=t.weight; s+=t.weight*e1Mastery(t.id); }); return w?Math.round(s/w):0; }

// prepare a question for display: shuffle options (single/multi), shuffle order items
function e1Prep(q){
  if(q.type==="order"){ let sh; do{ sh=shuffle(q.o.map((_,i)=>i)); }while(q.o.length>1 && sh.every((v,i)=>v===i)); return {...q, sh, built:[]}; }
  if(q.type==="single"||q.type==="multi"){ if(q.o.some(o=>/\b(both|neither)\b.*\b[A-F]\b|\b[A-F] and [A-F]\b/.test(o))) return {...q, sel:[]};
    const idx=shuffle(q.o.map((_,i)=>i)); return {...q, o:idx.map(i=>q.o[i]), a:q.a.map(a=>idx.indexOf(a)), sel:[]}; }
  return {...q, val:""};
}
function e1Correct(q){
  if(q.type==="single") return q.sel.length===1 && q.sel[0]===q.a[0];
  if(q.type==="multi") return q.sel.length===q.a.length && q.a.every(a=>q.sel.includes(a));
  if(q.type==="order") return q.built.length===q.o.length && q.built.every((v,i)=>v===i);
  const v=parseFloat(q.val); return !isNaN(v) && Math.abs(v-q.n)<=(q.tol||0)+1e-9;
}
function e1Answered(q){ return q.type==="order"? q.built.length===q.o.length : q.type==="fill"? q.val!=="" : q.sel.length>0; }
function e1KeyText(q){
  if(q.type==="single"||q.type==="multi") return q.a.map(i=>"ABCDEF"[i]+". "+q.o[i]).join(" · ");
  if(q.type==="order") return q.o.map((o,i)=>(i+1)+". "+o).join(" → ");
  return q.n+(q.unit?" "+q.unit:"");
}
const TYPE_LABEL={single:"Choose one",multi:"Select ALL that apply",order:"Put in the correct order",fill:"Enter a number"};

// renders the interactive body of one question; done = answer revealed
function e1QHTML(q, done, showWhy){
  let body="";
  if(q.type==="single"||q.type==="multi"){
    body=`<div class="opts xopts">${q.o.map((o,i)=>{ const on=q.sel.includes(i); let cls=on?"chosen":""; if(done){ cls=q.a.includes(i)?"right":(on?"wrong":""); }
      return `<button data-e1o="${i}" class="${cls}" ${done?"disabled":""} aria-pressed="${on}"><span class="lbl">${q.type==="multi"?(on?"☑":"☐"):"ABCDEF"[i]}</span> ${md(o)}</button>`; }).join("")}</div>`;
  } else if(q.type==="order"){
    body=`<div class="placed">${q.built.map(i=>`<div>${md(q.o[i])}</div>`).join("")}</div>
      ${done?"":`<div class="chips">${q.sh.filter(i=>!q.built.includes(i)).map(i=>`<button data-e1b="${i}">${md(q.o[i])}</button>`).join("")}</div>${q.built.length?`<div class="row left"><button class="ghost" id="e1undo">Undo last</button></div>`:""}`}`;
  } else {
    body=`<div class="ctrl"><input type="number" id="e1fill" inputmode="decimal" step="any" value="${esc(q.val)}" ${done?"disabled":""} style="width:9em"><span>${esc(q.unit||"")}</span></div>`;
  }
  const ok=done&&e1Correct(q);
  return `<span class="lbl">${TYPE_LABEL[q.type]}</span>${body}
    ${done&&showWhy?`<div class="note ${ok?"ok":""}"><b>${ok?"Correct.":"Not quite."}</b> ${ok?"":"<br>Answer: "+md(e1KeyText(q))+"<br>"}${md(q.w||"")}${q.src?`<div class="hint" style="margin-top:4px">Source: ${esc(q.src)}</div>`:""}${q.type==="multi"?`<div class="hint" style="margin-top:4px">Scored all-or-nothing (the safe assumption for NAPLEX-style select-all).</div>`:""}${e1SimpleBtn("q",q.key)}</div>${ok?"":e1CauseChips(q.key)}`:""}`;
}

// ---------- shell ----------
function renderE1(){
  const x=e1s(), card=document.getElementById("card"), ov=e1Overall();
  const due=E1_DATA.reduce((a,t)=>a+e1Cards(t.id).filter(c=>isDue(c.key)).length,0);
  document.getElementById("stats").innerHTML=(state.game?`<span class="pill o">Lv ${levelInfo().lvl}</span>`:"")+`<span class="pill ${due?"w":"g"}">${due} cards due</span><span class="pill a">${streak()}-day streak</span>`;
  const inTopic=!["home","exam"].includes(x.tab);
  document.getElementById("e1bar").innerHTML=`
    <div class="overall"><span class="lbl">Exam 1 ready</span>${bar(ov)}<span class="num">${ov}%</span></div>
    <nav class="drugs" aria-label="Exam 1 topics">${E1_TABS.map(([k,l])=>`<button class="drug" data-e1t="${k}" aria-pressed="${x.tab===k}">${esc(l)}${E1_DATA.find(t=>t.id===k)?` <span class="num">${e1Mastery(k)}%</span>`:""}</button>`).join("")}</nav>
    ${inTopic?`<div class="modes e1tools" role="group" aria-label="Study tool">${[["guide","Study guide"],["cards","Flashcards"],["quiz","Practice Qs"]].map(([k,l])=>`<button data-e1m="${k}" aria-pressed="${x.tool===k}">${l}</button>`).join("")}</div>`:""}`;
  const pressed=document.querySelector('#e1bar .drugs [aria-pressed="true"]'); if(pressed) pressed.scrollIntoView({block:"nearest",inline:"center"});
  if(x.tab==="home") return e1Home(card);
  if(x.tab==="exam") return e1Exam(card);
  ({guide:e1Guide, cards:e1CardsView, quiz:e1Quiz})[x.tool](card, e1topic(x.tab));
}

function e1Home(card){
  const x=e1s(), hist=(x.exams||[]).slice(-5).reverse(), errs=x.errs||{}, plan=x.plan||{};
  const cc={}; Object.values(errs).forEach(e=>cc[e.c]=(cc[e.c]||0)+1); const top=Object.entries(cc).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const dueN=E1_DATA.flatMap(t=>e1Qs(t.id)).filter(q=>e1IsDue(q.key)).length, ch=x.changes;
  card.innerHTML=`<div class="rx"><h2>PHAR 131 · Exam 1</h2></div>
    <div class="note"><b>Format:</b> 50–60 questions, NAPLEX/CPJE style, <b>no going back</b>. <b>Vaccines ≈ 40%</b>, so give vaccines ~40% of your study time. The CDC pediatric schedule is attached on the exam.</div>
    <div class="row left"><button class="primary" data-e1mix="smart">Smart mixed set (20)${dueN?` · ${dueN} due`:""}</button><button data-e1t="exam">Practice exam →</button></div>
    <div class="prog">${E1_DATA.map(t=>{ const m=e1Mastery(t.id), qs=e1Qs(t.id), st=x.qs; const done=qs.filter(q=>st[q.key]).length;
      return `<div class="prow"><div class="top"><b>${esc(t.name)}</b><span class="num">${m}%</span></div>${bar(m)}<div class="sub"><span>~${t.weight}% of exam</span><span>${done}/${qs.length} questions tried</span><span>${t.cards.length} cards</span></div></div>`; }).join("")}</div>

    <details class="gsec" ${top.length?"open":""}><summary><b>Error log</b> <span class="pill ${top.length?"b":"a"}">${Object.keys(errs).length} tagged</span></summary>
      ${top.length?`<div class="los">${top.map(([k,n])=>{ const c=E1_CAUSES.find(z=>z[0]===k); return `<div class="lo"><div style="min-width:0"><b>${esc(c[1])}</b> <span class="pill b">${n}</span><div class="hint">${esc(c[2])}</div></div></div>`; }).join("")}</div>
        <div class="row left"><button data-e1mix="errlog">Retry error-log questions</button><button class="ghost" id="e1clrerr">Clear log</button></div>`
      :`<p class="hint">When you miss a question, tag <i>why</i> (didn't know it, misread, select-all, schedule reading, calculation, changed right→wrong). Your top causes show up here with a fix for each.</p>`}
      ${ch&&(ch.wr+ch.rw)?`<p class="hint">Your second-look changes so far: <b>${ch.wr} wrong→right</b> vs ${ch.rw} right→wrong.</p>`:""}</details>

    <details class="gsec"><summary><b>Test-day strategy (no going back)</b></summary><ol class="plan">
      <li><b>Read the question line first</b> (the last sentence), then the case. Know if it asks "most appropriate", "contraindicated", "NOT/EXCEPT", "first step" or "select all".</li>
      <li><b>Predict before reading the options</b> when you can (e.g., "live vaccine → not in pregnancy").</li>
      <li><b>One deliberate second look inside the question</b> before you lock it: re-check age, weight, pregnancy, immunosuppressants, dates of prior doses. Change only for a concrete reason. In studies, answer changes went wrong→right about twice as often as right→wrong; the "stick with your first instinct" rule is a myth. The practice exam's second-look step trains this.</li>
      <li><b>Next is final.</b> Don't carry worry from the last question into the next one.</li>
      <li><b>Pace with checkpoints:</b> ~72–80 sec per question. With 60 Qs in 75 min: Q20 by ~25 min, Q40 by ~50 min. Don't spend 4 minutes on one item.</li>
      <li><b>Never leave a blank.</b> Guess and move on.</li>
      <li><b>Select-all-that-apply:</b> treat each option as its own true/false statement. Don't assume how many are right (could be 1 or all). Assume <b>no partial credit</b>, so only pick what you can justify.</li>
      <li><b>Ask your instructor:</b> the time limit, whether select-all gets partial credit, and whether a calculator is provided.</li></ol></details>

    <details class="gsec"><summary><b>12-day plan</b> <span class="pill a">${Object.values(plan).filter(Boolean).length}/12 done</span></summary>
      <p class="hint">~2–3 h/day. Short on time? Merge Days 12–8 into 2 days. Three full timed exams (Days 12, 5, 2).</p>
      <div class="checks">${E1_PLAN.map(([d,t])=>`<label><input type="checkbox" data-e1plan="${d}" ${plan[d]?"checked":""}><span><b>${d}:</b> ${esc(t)}</span></label>`).join("")}</div></details>

    <details class="gsec"><summary><b>High-yield extras</b> <span class="lbl">from CDC / AMA / ADA sources, not your slides</span></summary>
      <p class="hint">If anything here disagrees with your lecture slides, go with the slides for this exam.</p>
      <ul class="gpts">
        <li><b>Reading the CDC child schedule:</b> Table 1 (by age) → Table 2 catch-up (minimum ages & intervals) → Table 3 (medical indications) → <b>Notes</b> → Appendix (contraindications). "Recommendations must be read with the notes." Read the color legend on <i>your</i> attachment every time; colors change between editions.</li>
        <li><b>How it's tested:</b> "Child is X months, doses on dates A and B — what's due today / earliest next dose?" Use minimum intervals and the Notes (e.g., rotavirus maximum ages), not just the routine-age bar. Don't mix up <i>minimum</i> and <i>recommended</i> intervals. Nirsevimab is an RSV antibody, not a vaccine.</li>
        <li><b>2026 caveat:</b> CDC revised the childhood schedule in Jan 2026 and parts are tied up in court. <b>Answer from the attachment your instructor gives you</b>, not from the news.</li>
        <li><b>Live vaccines:</b> MMR, varicella, MMRV, LAIV (FluMist), yellow fever, oral rotavirus, oral typhoid, dengue. Of the Big 7, only LAIV is live; Shingrix is <b>not</b> live. Two live injectable/intranasal vaccines not given the same day need <b>≥28 days</b> apart, and the 4-day grace period does <b>not</b> apply to that rule.</li>
        <li><b>Screening "yes" = ask more questions</b>, not an automatic no. Egg allergy of any severity is not a contraindication to any flu vaccine. Fainting history is not a contraindication (observe 15 min).</li>
        <li><b>IM technique (CDC):</b> 90°, 22–25 G, no aspiration. Adult deltoid: &lt;60 kg ⅝" · 60–70 kg 1" · women 70–90 / men 70–118 kg 1–1.5" · above that 1.5". SC: 45°, ⅝", upper-outer triceps.</li>
        <li><b>BP direction rules:</b> cuff too small → falsely <b>high</b>; too large → falsely <b>low</b>; arm below heart → high; above heart → low. The direction is tested more than the exact mmHg.</li>
        <li><b>PPCP step trap:</b> measuring BP / reviewing records = <b>Collect</b>; identifying "due for a vaccine" or "uncontrolled BP" = <b>Assess</b>; choosing the vaccine = <b>Plan</b>; giving and documenting = <b>Implement</b>. Due for a vaccine = DTP "needs additional drug therapy".</li>
        <li><b>Insulin pens:</b> hold times differ by brand in the package inserts (e.g., Lantus 10 sec, NovoLog ≥6 sec, Humalog 5 sec). <b>Your slides say 5 seconds — use that on this exam.</b> Hypoglycemia: &lt;70 → 15 g carbs, recheck in 15 min.</li>
      </ul></details>

    <div class="row left"><a class="btnlink" href="${CDC_KIDS}" target="_blank" rel="noopener">CDC child & adolescent schedule ↗</a><a class="btnlink" href="${CDC_ADULT}" target="_blank" rel="noopener">CDC adult schedule ↗</a></div>
    ${hist.length?`<div class="hist"><span class="lbl">Recent practice exams</span>${hist.map(h=>`<div>${h.date} · <b>${h.r}/${h.n}</b> (${Math.round(h.r/h.n*100)}%) · ${h.min} min</div>`).join("")}</div>`:""}`;
}

function e1Guide(card,t){
  const x=e1s(), so=x.star;
  card.innerHTML=`<div class="rx"><h2>${esc(t.name)}</h2><label class="toggle"><input type="checkbox" id="e1star" ${so?"checked":""}> ★ emphasized only</label></div>
    <p class="hint">★ = emphasized on the slides or in the student notes. <i>Note</i> = handwritten/typed annotation. Sources: ${esc(t.sources.join(", "))}</p>
    ${t.guide.map((s,si)=>{ const pts=s.pts.filter(p=>!so||p.s); if(!pts.length) return "";
      return `<details class="gsec" ${so||si===0?"open":""}><summary><b>${esc(s.t)}</b> ${s.src?`<span class="lbl">${esc(s.src)}</span>`:""}</summary>
      <ul class="gpts">${s.pts.map((p,pi)=>(!so||p.s)?`<li class="${p.s?"st":""}">${p.s?'<span class="star">★</span> ':""}${md(p.x)}${p.simple?` <button type="button" class="e1gx" data-e1simple="g~${t.id}|${si}|${pi}" aria-label="Explain this simply" title="Explain simply">💡</button>`:""}${p.note?`<div class="mynote">Note: ${esc(p.note)}</div>`:""}</li>`:"").join("")}</ul></details>`; }).join("")}
    <div class="row"><button class="primary" data-e1m="quiz">Practice questions →</button></div>`;
}

function e1CardsView(card,t){
  const x=e1s(); let pool=e1Cards(t.id); if(x.star) pool=pool.filter(c=>c.s);
  const sig=t.id+"|"+x.star+"|"+x.cram;
  if(!e1c||e1c.sig!==sig) e1c={sig, deck:shuffle(pool.filter(c=>x.cram||isDue(c.key))), done:0, again:0, show:false};
  const q=e1c, head=`<div class="rx"><h2>${esc(t.name)} · cards</h2><span class="pill a">${pool.length} cards</span></div>
    <div class="row left"><label class="toggle"><input type="checkbox" id="e1star" ${x.star?"checked":""}> ★ only</label><label class="toggle"><input type="checkbox" id="e1cram" ${x.cram?"checked":""}> Include cards not due</label></div>`;
  if(!q.deck.length){ card.innerHTML=head+`<div class="done"><span class="big">${q.done?"Done":"Nothing due"}</span><p class="hint">${q.done?q.done+" reviewed.":"Tick 'Include cards not due' to cram."}</p></div>`; return; }
  const c=q.deck[0];
  card.innerHTML=head+`<div class="row left"><span class="pill g">${q.done} done</span><span class="pill b">${q.again} again</span><span class="pill w">${q.deck.length} left</span></div>
    <div class="flash"><span class="from">${c.s?'<span class="star">★</span> emphasized':esc(t.name)}</span><span class="q xq">${md(c.f)}</span>${q.show?`<div class="ans">${md(c.b)}${e1SimpleBtn("c",c.key)}</div>`:""}</div>
    ${q.show?`<div class="grades"><button class="again" data-e1g="0">Again<br><small>${ivl(c.key,0)}</small></button><button class="hard" data-e1g="3">Hard<br><small>${ivl(c.key,3)}</small></button><button class="good" data-e1g="4">Good<br><small>${ivl(c.key,4)}</small></button><button class="easy" data-e1g="5">Easy<br><small>${ivl(c.key,5)}</small></button></div>`
      :`<div class="row"><button class="primary" id="e1show">Show answer</button></div>`}`;
}

// ---------- topic practice (instant feedback) ----------
function e1StartQuiz(id, filter){
  const st=e1s().qs; let pool=e1Qs(id);
  if(filter==="missed") pool=pool.filter(q=>st[q.key]&&!st[q.key].last);
  else if(filter==="new") pool=pool.filter(q=>!st[q.key]);
  else if(filter&&filter!=="all") pool=pool.filter(q=>q.type===filter);
  e1q={id, filter, list:shuffle(pool).map(e1Prep), i:0, done:false, right:0, wrong:[]};
}
function e1Quiz(card,t){
  const x=e1s();
  if(!e1q||e1q.id!==t.id){
    const qs=e1Qs(t.id), st=x.qs, missed=qs.filter(q=>st[q.key]&&!st[q.key].last).length, fresh=qs.filter(q=>!st[q.key]).length;
    const types=["single","multi","order","fill"].map(k=>[k,qs.filter(q=>q.type===k).length]).filter(([,n])=>n);
    card.innerHTML=`<div class="rx"><h2>${esc(t.name)} · practice</h2><span class="pill a">${qs.length} questions</span></div>
      <p class="hint">Instant feedback with explanations. For no-feedback, no-going-back practice, use the Practice exam tab.</p>
      <div class="qsets"><button data-e1q="all">All ${qs.length} (shuffled)</button>${fresh?`<button data-e1q="new">Not tried yet (${fresh})</button>`:""}${missed?`<button class="primary" data-e1q="missed">Retry missed (${missed})</button>`:""}
        ${types.map(([k,n])=>`<button data-e1q="${k}">${TYPE_LABEL[k]} (${n})</button>`).join("")}</div>
      ${sample?`<div class="gen"><b>Generate more with Claude</b><p class="hint">Writes 5 new NAPLEX-style questions from this tab's study guide.</p><div class="ctrl"><select id="e1gsec">${t.guide.map((s,i)=>`<option value="${i}">${esc(s.t)}</option>`).join("")}</select><button class="primary" id="e1gen" ${e1genBusy?"disabled":""}>${e1genBusy?"Writing…":"Generate 5"}</button></div><div id="e1genout"></div></div>`:""}`;
    return;
  }
  const z=e1q;
  if(z.i>=z.list.length){
    card.innerHTML=`<div class="rx"><h2>${esc(t.name)} · results</h2></div><div class="done"><span class="big">${z.right}/${z.list.length}</span>
      ${z.wrong.length?`<div class="weak"><span class="lbl">Review</span>${z.wrong.map(q=>`<div class="rev"><b>${md(q.q)}</b><div>✓ ${md(e1KeyText(q))}</div><div class="hint">${md(q.w||"")}</div>${e1SimpleBtn("q",q.key)}</div>`).join("")}</div>`:""}
      <div class="row"><button id="e1back">Back</button>${z.wrong.length?`<button class="primary" data-e1q="missed">Retry missed</button>`:""}</div></div>`;
    return;
  }
  const q=z.list[z.i];
  card.innerHTML=`<div class="rx"><h2>${esc(t.name)}</h2><span class="pill a">${z.i+1}/${z.list.length}</span></div>${bar(z.i/z.list.length*100,"thin")}
    <div class="flash"><span class="from">${q.ai?"Claude-generated · ":""}${esc(q.src||"")}</span><span class="q e1stem">${md(q.q)}</span></div>
    ${e1QHTML(q, z.done, true)}
    <div class="row"><button class="ghost" id="e1end">End</button>${z.done?`<button class="primary" id="e1next">Next →</button>`:`<button class="primary" id="e1submit" ${e1Answered(q)?"":"disabled"}>Submit</button>`}</div>`;
}
function e1Record(q, ok){ const st=e1s().qs, s=st[q.key]||{r:0,w:0}; ok?s.r++:s.w++; s.last=ok?1:0;
  if(!ok){ s.ivl=1; s.due=midnight()+864e5; } else { s.ivl = s.ivl ? Math.min(30, Math.max(3, Math.round(s.ivl*2.5))) : 7; s.due=midnight()+s.ivl*864e5; }
  st[q.key]=s; }
const e1IsDue = k => { const s=e1s().qs[k]; return s && s.due && s.due<=Date.now(); };
function e1Smart(n){ // interleaved, blueprint-weighted: due reviews first, then untried, then the rest
  const st=e1s().qs, out=[];
  Object.entries(E1_BLUEPRINT).forEach(([id,w])=>{ const k=Math.max(1,Math.round(n*w/55)); const qs=shuffle(e1Qs(id));
    const due=qs.filter(q=>e1IsDue(q.key)), fresh=qs.filter(q=>!st[q.key]), rest=qs.filter(q=>st[q.key]&&!e1IsDue(q.key));
    out.push(...due.concat(fresh,rest).slice(0,k)); });
  return shuffle(out).slice(0,n);
}
function e1CauseChips(key){ const c=(e1s().errs||{})[key]; return `<div class="causes"><span class="lbl">Why did you miss it?</span><div class="chips">${E1_CAUSES.map(([k,l])=>`<button data-e1cause="${key}~${k}" aria-pressed="${c&&c.c===k}">${l}</button>`).join("")}</div></div>`; }

// ---------- practice exam (no feedback, no going back) ----------
function e1BuildExam(kind){
  const st=e1s().qs; let list=[];
  const pick=(id,n)=>{ const qs=shuffle(e1Qs(id)); const fresh=qs.filter(q=>!st[q.key]||!st[q.key].last); return fresh.concat(qs.filter(q=>!fresh.includes(q))).slice(0,n); };
  if(kind==="full") Object.entries(E1_BLUEPRINT).forEach(([id,n])=>list.push(...pick(id,n)));
  else if(kind==="half") Object.entries(E1_BLUEPRINT).forEach(([id,n])=>list.push(...pick(id,Math.ceil(n/2))));
  else if(kind==="vax") { list.push(...pick("vaxA",13), ...pick("vaxB",12)); }
  else if(kind==="smart") list=e1Smart(20);
  else if(kind==="errlog"){ const errs=e1s().errs||{}; const all=E1_DATA.flatMap(t=>e1Qs(t.id)); list=shuffle(all.filter(q=>errs[q.key])).slice(0,30); }
  else if(kind==="weak"){ const all=E1_DATA.flatMap(t=>e1Qs(t.id)); list=shuffle(all.filter(q=>st[q.key]&&!st[q.key].last)).slice(0,30); }
  return shuffle(list).map(e1Prep);
}
function e1Exam(card){
  const x=e1s();
  if(!e1x){
    const weak=E1_DATA.flatMap(t=>e1Qs(t.id)).filter(q=>x.qs[q.key]&&!x.qs[q.key].last).length;
    if(e1q&&e1q.id==="mix") return e1Quiz(card,{id:"mix",name:e1q.label||"Mixed review",guide:[]});
    const dueN=E1_DATA.flatMap(t=>e1Qs(t.id)).filter(q=>e1IsDue(q.key)).length, errN=Object.keys(x.errs||{}).length;
    card.innerHTML=`<div class="rx"><h2>Practice</h2></div>
      <h3>Mixed practice (instant feedback)</h3>
      <p class="hint">Topics mixed together, weighted like the exam. Missed questions come back the next day, then at longer and longer gaps.</p>
      <div class="qsets"><button data-e1mix="smart"><b>Smart mixed set</b><br><span class="hint">20 Qs · ${dueN} due for review</span></button>${errN?`<button data-e1mix="errlog"><b>Error log</b><br><span class="hint">${errN} tagged misses</span></button>`:""}</div>
      <h3>Practice exam (test conditions)</h3>
      <p class="hint">Like the real thing: <b>no feedback until the end and no going back</b>. Questions are drawn to match the exam weighting (vaccines ≈ 40%), favoring ones you haven't got right yet.</p>
      <div class="qsets"><button data-e1x="full"><b>Full exam</b><br><span class="hint">55 questions · ~66 min</span></button><button data-e1x="half"><b>Half exam</b><br><span class="hint">29 questions · ~35 min</span></button><button data-e1x="vax"><b>Vaccines only</b><br><span class="hint">25 questions</span></button>${weak?`<button data-e1x="weak"><b>Weak spots</b><br><span class="hint">up to 30 you've missed</span></button>`:""}</div>
      <label class="toggle"><input type="checkbox" id="e1timed" ${x.timed!==false?"checked":""}> Timed (72 seconds per question)</label>
      <label class="toggle"><input type="checkbox" id="e1look" ${x.look!==false?"checked":""}> Second-look step before locking each answer</label>`;
    return;
  }
  const z=e1x;
  if(z.i>=z.list.length){ return e1ExamResults(card); }
  const q=z.list[z.i], left=z.timed? Math.max(0, Math.round((z.end-Date.now())/1000)) : null;
  const target=Math.floor((Date.now()-z.t0)/72000), pace=z.i-target;
  card.innerHTML=`<div class="rx"><h2>Question ${z.i+1} of ${z.list.length}</h2>${z.timed?`<span class="pill ${left<300?"b":"a"}" id="e1clock">${fmt(left)}</span>`:""}</div>${bar(z.i/z.list.length*100,"thin")}
    ${z.timed?`<div class="hint" id="e1pace">${pace>=0?"On pace":"Behind pace by "+(-pace)+" question"+(pace<-1?"s":"")+" — move on from anything you can't crack"}</div>`:""}
    <div class="flash"><span class="q e1stem">${md(q.q)}</span></div>
    ${e1QHTML(q,false,false)}
    ${q.look?`<div class="note look"><b>Second look.</b> Re-read the question line and qualifiers (age, pregnancy, meds, NOT/EXCEPT/FIRST). Change only for a reason you can name.
      <div class="row left" style="margin-top:8px"><span class="lbl">How sure?</span>${["Guess","Unsure","Sure"].map((l,i)=>`<button data-e1conf="${i+1}" aria-pressed="${q.conf===i+1}">${l}</button>`).join("")}</div></div>`
      :`<p class="hint">No going back — once you lock an answer, it's final.</p>`}
    <div class="row"><button class="ghost" id="e1xquit">End exam</button><button class="primary" id="e1xsubmit" ${e1Answered(q)?"":"disabled"}>${q.look||!z.look?(z.i===z.list.length-1?"Lock & finish":"Lock & next →"):"Submit"}</button></div>`;
}
function e1ExamResults(card){
  const z=e1x; if(z.timerId){ clearInterval(z.timerId); z.timerId=null; }
  const ans=z.list.slice(0,z.i), r=ans.filter(q=>q.ok).length;
  if(!z.saved){ z.saved=1; const x=e1s(); x.exams=(x.exams||[]).concat({date:dayStr(), r, n:ans.length, min:Math.round((Date.now()-z.t0)/60000)}).slice(-30); markDay(); award(r*3); save(); }
  const by={}; ans.forEach(q=>{ by[q.topic]=by[q.topic]||[0,0]; by[q.topic][1]++; if(q.ok) by[q.topic][0]++; });
  const wrong=ans.filter(q=>!q.ok), pct=ans.length?Math.round(r/ans.length*100):0;
  const ch={wr:0,rw:0,ww:0}; ans.forEach(q=>{ if(q.changed){ if(!q.firstOk&&q.ok) ch.wr++; else if(q.firstOk&&!q.ok) ch.rw++; else if(!q.firstOk&&!q.ok) ch.ww++; } });
  const conf=[1,2,3].map(c=>{ const g=ans.filter(q=>q.conf===c); return [c,g.filter(q=>q.ok).length,g.length]; }).filter(c=>c[2]);
  if(!z.savedMeta){ z.savedMeta=1; const x=e1s(); x.changes=x.changes||{wr:0,rw:0,ww:0}; ["wr","rw","ww"].forEach(k=>x.changes[k]+=ch[k]); save(); }
  card.innerHTML=`<div class="rx"><h2>Exam results</h2></div>
    <div class="score"><span class="big">${r}/${ans.length}</span><span class="pill ${pct>=70?"g":"b"}">${pct}%</span><span class="lbl">${Math.round((Date.now()-z.t0)/60000)} min</span></div>
    <div class="prog">${Object.entries(by).map(([id,[a,n]])=>`<div class="prow"><div class="top"><b>${esc(e1topic(id).name)}</b><span class="num">${a}/${n}</span></div>${bar(a/n*100)}</div>`).join("")}</div>
    ${ch.wr+ch.rw+ch.ww?`<div class="note">During second looks you changed ${ch.wr+ch.rw+ch.ww} answer(s): <b>${ch.wr} wrong→right</b>, ${ch.rw} right→wrong, ${ch.ww} wrong→wrong.</div>`:""}
    ${conf.length?`<div class="hint">Accuracy by confidence: ${conf.map(([c,a,n])=>`${["","Guess","Unsure","Sure"][c]} ${a}/${n}`).join(" · ")}${conf.find(c=>c[0]===3&&c[2]&&c[1]/c[2]<0.8)?" — some 'Sure' answers were wrong; read those explanations closely.":""}</div>`:""}
    ${wrong.length?`<h3>Review what you missed (${wrong.length})</h3><p class="hint">Tag why you missed each one. The Overview tab tracks your top causes, and the Error log set lets you retry them.</p>${wrong.map(q=>`<div class="rev"><b>${md(q.q)}</b><div class="hint">${esc(e1topic(q.topic).name)}</div><div>Your answer: ${md(e1YourText(q))}</div><div>✓ ${md(e1KeyText(q))}</div><div class="hint">${md(q.w||"")}</div>${e1SimpleBtn("q",q.key)}${e1CauseChips(q.key)}</div>`).join("")}`:"<p>Perfect score.</p>"}
    <div class="row"><button id="e1xnew">New exam</button><button class="primary" data-e1t="home">Back to overview</button></div>`;
}
function e1YourText(q){
  if(q.type==="single"||q.type==="multi") return q.sel.map(i=>"ABCDEF"[i]+". "+q.o[i]).join(" · ")||"(none)";
  if(q.type==="order") return q.built.map(i=>q.o[i]).join(" → ");
  return q.val+(q.unit?" "+q.unit:"");
}

async function e1Generate(){
  if(!sample||e1genBusy) return;
  const x=e1s(), t=e1topic(x.tab), si=+document.getElementById("e1gsec").value, sec=t.guide[si];
  const content=sec.pts.map(p=>"- "+p.x.replace(/\*\*/g,"")+(p.note?" (student note: "+p.note+")":"")).join("\n");
  const prompt=`Write 5 NAPLEX/CPJE-style exam questions for a PharmD course exam (topic: ${t.name}). Use ONLY facts in this study-guide section; do not add outside facts. Prefer short patient-case stems. Mix: mostly one-best-answer, plus 1–2 "select all that apply". 4–5 options each, plausible distractors, no "all/none of the above".

SECTION: ${sec.t}
${content}

Reply with only a JSON array like:
[{"type":"single","q":"stem","o":["A","B","C","D"],"a":[2],"w":"why the answer is right and why the main distractor is wrong"},{"type":"multi","q":"… (Select all that apply.)","o":["A","B","C","D","E"],"a":[0,3],"w":"…"}]`;
  e1genBusy=true; renderE1();
  try{
    const r=await sample.json(prompt,{cache:false});
    const ok=(Array.isArray(r)?r:[]).filter(g=>g&&typeof g.q==="string"&&Array.isArray(g.o)&&g.o.length>=3&&Array.isArray(g.a)&&g.a.length&&g.a.every(i=>Number.isInteger(i)&&i>=0&&i<g.o.length))
      .map((g,i)=>({type:g.type==="multi"||g.a.length>1?"multi":"single", q:String(g.q), o:g.o.map(String), a:g.type==="multi"||g.a.length>1?g.a:[g.a[0]], w:String(g.w||""), src:"Claude-generated from: "+sec.t, gid:Date.now()+"_"+i}));
    x.gen[t.id]=(x.gen[t.id]||[]).concat(ok).slice(-100); save(); e1genBusy=false;
    if(ok.length){ e1q={id:t.id, list:ok.map((q,i)=>e1Prep({...q, key:t.id+"|g"+q.gid, topic:t.id, ai:1})), i:0, done:false, right:0, wrong:[]}; toast(ok.length+" new questions"); }
    renderE1();
  }catch(e){ e1genBusy=false; renderE1(); const o=document.getElementById("e1genout"); if(o) o.innerHTML=`<p class="hint">${e&&e.code==="not_granted"?"Claude access wasn't allowed.":"Couldn't generate questions. Try again."}</p>`; if(e&&["not_granted","sampling_disabled"].includes(e.code)) sample=null; }
}

// ---------- explain simply + ask ChatGPT ----------
function e1SimpleBtn(kind,key){ return `<div class="row left e1simrow"><button type="button" class="ghost e1simbtn" data-e1simple="${kind}~${esc(key)}">💡 Explain simply</button></div>`; }
function e1FindItem(ref){
  const i=ref.indexOf("~"), kind=ref.slice(0,i), key=ref.slice(i+1);
  if(kind==="g"){ const [id,si,pi]=key.split("|"), t=e1topic(id), sec=t&&t.guide[+si], p=sec&&sec.pts[+pi]; return p?{kind, t, sec, p}:null; }
  for(const t of E1_DATA){
    if(kind==="c"){ const c=e1Cards(t.id).find(c=>c.key===key); if(c) return {kind, t, c}; }
    else { const q=e1Qs(t.id).find(q=>q.key===key); if(q) return {kind, t, q}; }
  }
  return null;
}
const e1Plain = s => String(s||"").replace(/\*\*/g,"").replace(/\s+/g," ").trim();
function e1GptPrompt(it){
  let body;
  if(it.kind==="g") body=`Study guide section: ${e1Plain(it.sec.t)}\nPoint from my lecture notes: ${e1Plain(it.p.x)}`+(it.p.note?`\nMy handwritten note: ${e1Plain(it.p.note)}`:"");
  else if(it.kind==="c") body=`Flashcard question: ${e1Plain(it.c.f)}\nAnswer from my lecture: ${e1Plain(it.c.b)}`;
  else { const q=it.q;
    const ans = q.type==="order" ? q.o.map((o,i)=>(i+1)+". "+e1Plain(o)).join("  ") : q.type==="fill" ? q.n+(q.unit?" "+q.unit:"") : q.a.map(i=>e1Plain(q.o[i])).join("; ");
    body=`Exam question: ${e1Plain(q.q)}\n`+(q.type==="single"||q.type==="multi"?`Options: ${q.o.map(e1Plain).join(" | ")}\n`:"")+`Correct answer${q.type==="multi"?"s":""} (per my lecture): ${ans}\nMy lecture's explanation: ${e1Plain(q.w)}`; }
  let p=`I'm a pharmacy (PharmD) student studying for an exam on "${it.t.name}". Explain this to me in very simple, everyday words with a real-life example, then give me a quick memory trick. Stick to my lecture's answer below even if newer guidelines differ (you can mention the difference in one line at the end).\n\n${body}`;
  return p.length>3500 ? p.slice(0,3500)+"…" : p;
}
function e1AskGPT(it){
  const prompt=e1GptPrompt(it), url="https://chatgpt.com/?q="+encodeURIComponent(prompt);
  try{ navigator.clipboard && navigator.clipboard.writeText(prompt).catch(()=>{}); }catch(e){}
  const wide = window.matchMedia("(min-width: 900px) and (pointer: fine)").matches;
  let w=null;
  if(wide){
    const W=Math.max(420, Math.round(screen.availWidth*0.36)), H=screen.availHeight;
    const L=(screen.availLeft||0)+screen.availWidth-W, T=screen.availTop||0;
    w=window.open(url, "pharmChatGPT", `popup=yes,width=${W},height=${H},left=${L},top=${T}`);
    if(w){ try{ w.focus(); }catch(e){} toast("Opened ChatGPT on the side · question also copied"); }
    else toast("Popup blocked: allow popups for this site, or paste — the question is copied");
  } else {
    w=window.open(url, "_blank");
    toast("Question copied — if ChatGPT opens empty, tap the box and paste");
  }
}
let e1SimCur=null;
function e1OpenSimple(ref){
  const it=e1FindItem(ref); if(!it) return toast("Couldn't find that item");
  e1SimCur=it;
  const text = it.kind==="g" ? it.p.simple : it.kind==="c" ? it.c.simple : it.q.simple;
  const title = it.kind==="g" ? it.p.x : it.kind==="c" ? it.c.f : it.q.q;
  let m=document.getElementById("e1sim");
  if(!m){ m=document.createElement("div"); m.id="e1sim"; m.setAttribute("role","dialog"); m.setAttribute("aria-modal","true"); document.body.appendChild(m);
    m.addEventListener("click", e=>{ if(e.target===m||e.target.closest("[data-simclose]")){ m.hidden=true; document.body.classList.remove("e1simopen"); }
      if(e.target.closest("[data-simgpt]")&&e1SimCur) e1AskGPT(e1SimCur); });
    document.addEventListener("keydown", e=>{ if(e.key==="Escape"&&!m.hidden){ m.hidden=true; document.body.classList.remove("e1simopen"); } }); }
  m.innerHTML=`<div class="e1simbox card"><div class="rx"><h2>💡 Explained simply</h2><button type="button" class="ghost" data-simclose aria-label="Close">✕</button></div>
    <div class="e1simq">${md(title.length>220?title.slice(0,220)+"…":title)}</div>
    ${text?`<div class="e1simtxt">${md(text).replace(/<b>(In plain English:|Example:|Remember:)<\/b>/g,'</p><p><b>$1</b>').replace(/^<\/p>/,"")}</div>`:`<p class="hint">No built-in explanation for this one yet — ask ChatGPT below.</p>`}
    <div class="row"><button type="button" class="primary" data-simgpt>Still confused? Ask ChatGPT ↗</button><button type="button" class="ghost" data-simclose>Close</button></div>
    <p class="hint">ChatGPT opens with this question already filled in (uses your own ChatGPT account). It's also copied, so you can paste it if the box is empty.</p></div>`;
  m.hidden=false; document.body.classList.add("e1simopen");
}
(function(){ const st=document.createElement("style"); st.textContent=`
#e1sim{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center;padding:12px}
#e1sim[hidden]{display:none!important}
#e1sim .e1simbox{width:min(560px,100%);max-height:85vh;overflow:auto;margin:0;border-radius:16px;overflow-wrap:anywhere}
@media (min-width:700px){#e1sim{align-items:center}}
#e1sim .e1simq{font-size:.9em;opacity:.75;margin:4px 0 10px;padding-bottom:8px;border-bottom:1px solid rgba(127,127,127,.25)}
#e1sim .e1simtxt{line-height:1.55}
#e1sim .e1simtxt p{margin:0 0 10px}
body.e1simopen{overflow:hidden}
.e1simrow{margin-top:8px}
#toast{z-index:1001}
.gpts .e1gx{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:26px;padding:0 6px;margin-left:4px;border-radius:99px;font-size:14px;line-height:1;vertical-align:middle;border:1px solid rgba(127,127,127,.35);background:transparent;cursor:pointer}
.gpts .e1gx:hover{background:rgba(127,127,127,.12)}`; document.head.appendChild(st); })();

// ---------- events ----------
function e1Cur(){ if(e1q&&e1q.id==="mix"&&e1s().tab==="exam") return e1q.list[e1q.i]; return e1s().tab==="exam" ? (e1x&&e1x.list[e1x.i]) : (e1q&&e1q.list[e1q.i]); }
document.addEventListener("click", e=>{
  const t=e.target.closest("button"); if(!t||state.section!=="e1") return;
  const d=t.dataset, x=e1s();
  if(d.e1simple){ e1OpenSimple(d.e1simple); return; }
  if(d.e1t){ if(x.tab==="exam"&&e1x&&e1x.i<e1x.list.length&&d.e1t!=="exam"){ /* leaving an exam abandons it */ if(e1x.timerId) clearInterval(e1x.timerId); e1x=null; } x.tab=d.e1t; e1q=null; e1c=null; save(); renderE1(); window.scrollTo(0,0); return; }
  if(d.e1m){ x.tool=d.e1m; e1q=null; e1c=null; save(); renderE1(); return; }
  if(d.e1q){ e1StartQuiz(x.tab, d.e1q); renderE1(); return; }
  if(d.e1g!==undefined){ const c=e1c.deck.shift(); if(+d.e1g===0){ e1c.again++; e1c.deck.splice(Math.min(3,e1c.deck.length),0,c);} else e1c.done++; e1c.show=false; grade(c.key,+d.e1g); renderE1(); return; }
  if(d.e1o!==undefined){ const q=e1Cur(); if(!q) return; const i=+d.e1o; if(q.type==="single") q.sel=[i]; else q.sel=q.sel.includes(i)?q.sel.filter(v=>v!==i):q.sel.concat(i); renderE1(); return; }
  if(d.e1b!==undefined){ const q=e1Cur(); if(q) q.built.push(+d.e1b); renderE1(); return; }
  if(d.e1cause){ const [k,c]=d.e1cause.split("~"); x.errs=x.errs||{}; if(x.errs[k]&&x.errs[k].c===c) delete x.errs[k]; else x.errs[k]={c, d:dayStr()}; save(); t.parentElement.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed", b===t&&!!x.errs[k])); return; }
  if(d.e1conf){ const q=e1Cur(); if(q){ q.conf=+d.e1conf; renderE1(); } return; }
  if(d.e1mix){ const list=e1BuildExam(d.e1mix); if(!list.length) return toast("Nothing in that set yet"); x.tab="exam"; e1q={id:"mix", label:d.e1mix==="errlog"?"Error log":"Smart mixed set", list, i:0, done:false, right:0, wrong:[]}; renderE1(); window.scrollTo(0,0); return; }
  if(d.e1plan){ x.plan=x.plan||{}; x.plan[d.e1plan]=!x.plan[d.e1plan]; save(); renderE1(); return; }
  if(d.e1x){ const timed=document.getElementById("e1timed").checked; x.timed=timed; const list=e1BuildExam(d.e1x); if(!list.length) return toast("No questions for that set yet");
    const look=document.getElementById("e1look").checked; x.look=look;
    e1x={list, i:0, t0:Date.now(), timed, look, end:Date.now()+list.length*72000};
    if(timed) e1x.timerId=setInterval(()=>{ if(!e1x||state.section!=="e1"||e1s().tab!=="exam") return; const left=Math.round((e1x.end-Date.now())/1000); const el=document.getElementById("e1clock"); if(el){ el.textContent=fmt(Math.max(0,left)); el.className="pill "+(left<300?"b":"a"); } const pe=document.getElementById("e1pace"); if(pe){ const pace=e1x.i-Math.floor((Date.now()-e1x.t0)/72000); pe.textContent=pace>=0?"On pace":"Behind pace by "+(-pace)+" question"+(pace<-1?"s":"")+" — move on from anything you can't crack"; } if(left<=0){ clearInterval(e1x.timerId); e1x.timerId=null; toast("Time's up"); e1x.list=e1x.list.slice(0,e1x.i); renderE1(); } },1000);
    save(); renderE1(); window.scrollTo(0,0); return; }
  switch(t.id){
    case "e1show": e1c.show=true; renderE1(); break;
    case "e1undo": { const q=e1Cur(); if(q) q.built.pop(); renderE1(); break; }
    case "e1submit": { const q=e1Cur(); if(!q||!e1Answered(q)) return; const ok=e1Correct(q); e1Record(q,ok); e1q.done=true; if(ok) e1q.right++; else e1q.wrong.push(q); award(ok?4:1); renderE1(); break; }
    case "e1next": e1q.i++; e1q.done=false; renderE1(); break;
    case "e1end": e1q.list=e1q.list.slice(0,e1q.i+(e1q.done?1:0)); e1q.i=e1q.list.length; renderE1(); break;
    case "e1back": e1q=null; renderE1(); break;
    case "e1clrerr": x.errs={}; save(); renderE1(); break;
    case "e1xsubmit": { const q=e1Cur(); if(!q||!e1Answered(q)) return;
      if(e1x.look&&!q.look){ q.look=true; q.firstOk=e1Correct(q); q.snap=JSON.stringify([q.sel,q.built,q.val]); renderE1(); break; }
      if(!e1x.look) q.firstOk=e1Correct(q);
      q.ok=e1Correct(q); q.changed=!!q.snap&&q.snap!==JSON.stringify([q.sel,q.built,q.val]); e1Record(q,q.ok); e1x.i++; save(); renderE1(); window.scrollTo(0,0); break; }
    case "e1xquit": e1x.list=e1x.list.slice(0,e1x.i); renderE1(); break;
    case "e1xnew": e1x=null; renderE1(); break;
    case "e1gen": e1Generate(); break;
  }
});
document.addEventListener("input", e=>{ if(state.section!=="e1"||e.target.id!=="e1fill") return; const q=e1Cur(); if(q){ q.val=e.target.value; const b=document.getElementById("e1submit")||document.getElementById("e1xsubmit"); if(b) b.disabled=q.val===""; } });
document.addEventListener("change", e=>{ if(state.section!=="e1") return; const x=e1s();
  if(e.target.id==="e1star"){ x.star=e.target.checked; e1c=null; save(); renderE1(); }
  if(e.target.dataset&&e.target.dataset.e1plan){ x.plan=x.plan||{}; x.plan[e.target.dataset.e1plan]=e.target.checked; save(); }
  if(e.target.id==="e1cram"){ x.cram=e.target.checked; e1c=null; save(); renderE1(); } });
render();
