# Pharm Study

Study app for PharmD coursework (counseling scripts, PHAR 131 Exam 1, PHAR 117).
Plain HTML/JS with no build step. It installs on a phone, works offline, and syncs progress to the cloud.

```
index.html            page + styles; lists every script to load
sw.js                 offline cache (FILES list + VERSION)
manifest.webmanifest  app name/icon for "Add to Home Screen"
js/app.js             core app (counseling scripts, XP, progress)
js/config.js          ← your Supabase URL + key go here
js/sync.js            cloud sync (sign in with an emailed code)
js/phar117*.js        PHAR 117 section
js/exam1.js           PHAR 131 Exam 1 section (tabs build from content files)
content/exam1/*.js    one file per topic: guide, flashcards, questions
docs/CONTENT-SPEC.md  format for content files
docs/supabase-setup.sql  database setup (run once)
```

---

## Part A: Put it on GitHub (about 10 min)

**1. Unzip** this folder somewhere, e.g. `~/pharm-study`.

**2. Try it on your laptop:**
```bash
cd ~/pharm-study
python3 -m http.server 8000
```
Open http://localhost:8000. Press Ctrl+C in the terminal to stop.

**3. Make an empty repo** at https://github.com/new named `pharm-study`. Leave "Add a README" unchecked.
- Free GitHub Pages needs a **public** repo. With the free GitHub Student Developer Pack (GitHub Pro) it can be private. The site URL is public either way, but nobody can find it unless you share it.

**4. Push the code:**
```bash
cd ~/pharm-study
git init
git add .
git commit -m "Pharm Study"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pharm-study.git
git push -u origin main
```

**5. Turn on the website:** in the repo, go to **Settings → Pages**. Set Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**, then **Save**.
After 1–2 minutes it's live at **https://YOUR-USERNAME.github.io/pharm-study/**

---

## Part B: Cloud progress with Supabase (about 15 min)

**6. Create the project:** go to https://supabase.com, sign in with GitHub, then **New project**.
Name it `pharm-study`, make up a database password (save it somewhere), pick region **West US**, then **Create**. Wait about 2 minutes.

**7. Create the table:** click **SQL Editor** (left sidebar) → **New query**. Paste everything from `docs/supabase-setup.sql` and click **Run**. It should say "Success".

**8. Make the login email send a code** (so sign-in works inside the iPhone home-screen app):
**Authentication → Emails** (or "Email Templates") → open the **Magic Link** template and replace its body with:
```html
<h2>Your Pharm Study code</h2>
<p style="font-size:28px;letter-spacing:4px"><b>{{ .Token }}</b></p>
```
Click **Save**. Do the same for the **Confirm signup** template.

**9. Copy your keys:** go to **Project Settings → API** (may be called "Data API" / "API Keys"). Copy:
- **Project URL** (looks like `https://abcdefgh.supabase.co`)
- **anon public** key (a long string)

Paste them into `js/config.js`:
```js
window.SYNC_CONFIG = {
  url: "https://abcdefgh.supabase.co",
  anonKey: "eyJhbGciOi..."
};
```
The anon key is safe to be public. The database rules from step 7 make sure each person can only read their own progress.

**10. Publish it:**
```bash
git add js/config.js
git commit -m "Turn on sync"
git push
```

---

## Part C: Her phone (2 min)

**11.** Open **https://YOUR-USERNAME.github.io/pharm-study/** in **Safari** → Share → **Add to Home Screen**. (Android: Chrome → ⋮ → Add to Home screen / Install app.)

**12.** Open it **from the new icon**, tap **☁ Sign in to sync** at the top, enter her email, and type in the 6-digit code from the email.
The button turns into **☁ Synced**. From then on her progress saves to the cloud automatically, and she can sign in on her laptop too.

---

## Every week: adding new material

1. Make the content file for the new topic. Give Claude the lecture files plus `docs/CONTENT-SPEC.md`, or send them to me, and save the result as `content/exam1/<topic>.js` (e.g. `asthma.js`).
2. Add one line to `index.html`, next to the other content files:
   `<script src="content/exam1/asthma.js"></script>`
3. In `sw.js`: add `"content/exam1/asthma.js",` to `FILES` and bump `VERSION` (`"v1"` → `"v2"`).
4. Test locally (`python3 -m http.server 8000`). If you don't see your change, hard-refresh (Cmd/Ctrl+Shift+R).
5. Publish:
   ```bash
   git add .
   git commit -m "Add asthma"
   git push
   ```
   Live in about a minute. Her app picks it up the next time she opens it online, and her progress stays.

**Editing existing content is safe.** Progress is tied to each question's text, so adding, removing or reordering questions doesn't scramble anything. Only the question you reword loses its history.

**Check a content file before pushing:** `node --check content/exam1/asthma.js`

**New exam (Exam 2) or a new course:** that's a code change, not just a content file. Ask Claude to "add an Exam 2 section like Exam 1" and give it `js/exam1.js` and `index.html`.

**Study-set dropdown:** the "Study set" menu at the top lists sections newest first, and the app always opens on the newest one. The list is `SECTIONS` near the top of `js/app.js`; a new section gets one line there with the date it was added.

---

## Good to know

- **Free Supabase projects pause after about a week with no use.** If she takes a long break and the button shows "Sync error", open the Supabase dashboard and click **Restore project**. Her progress is still saved on the phone in the meantime.
- **Works offline.** Progress saves on the phone first and syncs when she's back online. If two devices both change things, the most recent copy wins.
- **Login emails:** Supabase's built-in email only sends a few per hour, which is plenty for one person. If a code doesn't arrive, check spam and wait a minute before asking again.
- The **"Grade with Claude" / "Generate more"** buttons only work inside claude.ai, so they hide themselves here.
