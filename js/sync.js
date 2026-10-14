// ===== Cloud sync (Supabase) =====
// Progress always saves on the device first (works offline), then syncs to the cloud when signed in.
// The whole progress object is one JSON row per user; the newest copy wins.
(function(){
  const cfg = window.SYNC_CONFIG || {};
  if(!cfg.url || !cfg.anonKey || !window.supabase){ console.info("Sync off: fill in js/config.js"); return; }
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: true, autoRefreshToken: true } });
  let user = null, status = "off", timer = null, busy = false, lastErr = "";

  // ---- header button + panel ----
  const btn = document.createElement("button");
  btn.id = "syncbtn"; btn.className = "pill a"; btn.type = "button";
  document.querySelector("header").appendChild(btn);
  const panel = document.createElement("div");
  panel.id = "syncpanel"; panel.hidden = true; panel.className = "card";
  document.querySelector(".wrap").insertBefore(panel, document.querySelector(".wrap").children[1]);
  const setStatus = s => { status = s; btn.textContent = {off:"☁ Sign in to sync", syncing:"☁ Syncing…", ok:"☁ Synced", offline:"☁ Offline (saved on phone)", err:"☁ Sync error"}[s] || s; btn.className = "pill " + (s==="ok"?"g":s==="err"?"b":"a"); };
  btn.onclick = () => { panel.hidden = !panel.hidden; drawPanel(); };

  function drawPanel(step){
    if(user){
      panel.innerHTML = `<div class="rx"><h2>Sync</h2><button class="ghost" data-sx="close">Close</button></div>
        <p>Signed in as <b>${esc(user.email||"")}</b>. Progress saves to the cloud automatically and works on any device you sign in on.</p>
        ${lastErr?`<p class="hint">Last error: ${esc(lastErr)}</p>`:""}
        <div class="row"><button data-sx="out" class="ghost">Sign out</button><button class="primary" data-sx="now">Sync now</button></div>`;
    } else if(step==="code"){
      panel.innerHTML = `<div class="rx"><h2>Enter the code</h2><button class="ghost" data-sx="close">Close</button></div>
        <p class="hint">We emailed a 6-digit code to <b>${esc(panel.dataset.email||"")}</b>. Check spam if it's not there.</p>
        <div class="ctrl"><input type="text" id="sxcode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"><button class="primary" data-sx="verify">Sign in</button></div>
        <p class="hint" id="sxmsg"></p>`;
    } else {
      panel.innerHTML = `<div class="rx"><h2>Sign in to sync</h2><button class="ghost" data-sx="close">Close</button></div>
        <p class="hint">Back up progress to the cloud and use it on any device. No password: we email you a code.</p>
        <div class="ctrl"><input type="text" id="sxemail" inputmode="email" autocomplete="email" placeholder="you@email.com"><button class="primary" data-sx="send">Email me a code</button></div>
        <p class="hint" id="sxmsg"></p>`;
    }
  }
  panel.addEventListener("click", async e => {
    const t = e.target.closest("[data-sx]"); if(!t) return; const a = t.dataset.sx, msg = m => { const el=document.getElementById("sxmsg"); if(el) el.textContent=m; };
    if(a==="close"){ panel.hidden = true; return; }
    if(a==="send"){ const email=(document.getElementById("sxemail").value||"").trim(); if(!/\S+@\S+\.\S+/.test(email)) return msg("Enter a valid email.");
      t.disabled=true; msg("Sending…"); const { error } = await sb.auth.signInWithOtp({ email, options:{ shouldCreateUser:true } });
      t.disabled=false; if(error) return msg(error.message); panel.dataset.email=email; drawPanel("code"); return; }
    if(a==="verify"){ const token=(document.getElementById("sxcode").value||"").trim(); t.disabled=true; msg("Checking…");
      const { data, error } = await sb.auth.verifyOtp({ email: panel.dataset.email, token, type:"email" });
      t.disabled=false; if(error) return msg(error.message); user=data.user; panel.hidden=true; await pull(true); return; }
    if(a==="out"){ await sb.auth.signOut(); user=null; setStatus("off"); drawPanel(); return; }
    if(a==="now"){ await pull(false); await push(); drawPanel(); }
  });

  // ---- sync ----
  async function pull(firstSignIn){
    if(!user) return; if(!navigator.onLine) return setStatus("offline");
    setStatus("syncing");
    const { data, error } = await sb.from("progress").select("data, updated_at").eq("user_id", user.id).maybeSingle();
    if(error){ lastErr=error.message; return setStatus("err"); }
    const local = state, localTs = local._ts || 0;
    // on first sign-in on a device, the account's cloud copy wins so a fresh device can't overwrite real progress
    if(data && data.data && (firstSignIn || (data.data._ts||0) > localTs)){
      // cloud copy is newer → use it (reload so every screen re-reads it)
      try{ localStorage.setItem(KEY, JSON.stringify(data.data)); }catch(e){}
      setStatus("ok"); location.reload(); return;
    }
    if(!data || localTs > (data.data && data.data._ts || 0)) await push();
    else setStatus("ok");
    if(firstSignIn) toast("Sync is on");
  }
  async function push(){
    if(!user || busy) return; if(!navigator.onLine) return setStatus("offline");
    busy = true; setStatus("syncing");
    const { error } = await sb.from("progress").upsert({ user_id: user.id, data: state, updated_at: new Date().toISOString() });
    busy = false; if(error){ lastErr=error.message; return setStatus("err"); } lastErr=""; setStatus("ok");
  }
  // every local save schedules a cloud save a few seconds later
  window.onStateSaved = () => { if(!user) return; clearTimeout(timer); timer = setTimeout(push, 3000); };
  addEventListener("online", () => pull(false));
  document.addEventListener("visibilitychange", () => { if(document.visibilityState==="hidden"&&user){ clearTimeout(timer); push(); } if(document.visibilityState==="visible"&&user) pull(false); });

  sb.auth.getSession().then(({ data }) => { user = data.session && data.session.user || null; if(user) pull(false); else setStatus("off"); });
  setStatus("off");
})();
