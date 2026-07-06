# Publishing PowerShell Path to the web (GitHub Pages)

This makes the site available at a permanent URL you can open from your phone,
laptop, or any device. It's free. You only do the first-time setup once; after
that, every change you push republishes automatically.

## One-time setup

### 1. Create a GitHub account (skip if you have one)
Go to <https://github.com/join> and sign up (free).

### 2. Create an empty repository on GitHub
- Go to <https://github.com/new>
- **Repository name:** `powershell-learning`
- Leave it **Public** (required for free Pages).
- **Do NOT** check "Add a README", ".gitignore", or "license" — the repo already
  has these locally. You want an empty repo.
- Click **Create repository**.

### 3. Connect your local repo and push
GitHub will show a URL like `https://github.com/YOUR-USERNAME/powershell-learning.git`.
In Terminal, run (replace `YOUR-USERNAME`):

```bash
cd /Users/sidbhatia/Claud/powershell-learning
git remote add origin https://github.com/YOUR-USERNAME/powershell-learning.git
git push -u origin main
```

The first push will ask you to sign in. The easiest way is to let the browser
handle it, or create a **Personal Access Token**:
<https://github.com/settings/tokens> → "Generate new token (classic)" → check
the `repo` scope → use the token as your password when git prompts you.

### 4. Turn on GitHub Pages
- In your repo on github.com, go to **Settings → Pages**.
- Under **Build and deployment → Source**, select **GitHub Actions**.
- That's it. The included workflow (`.github/workflows/deploy.yml`) deploys the site.

### 5. Wait ~1 minute, then open your site
Your URL will be:

```
https://YOUR-USERNAME.github.io/powershell-learning/
```

Bookmark it on your phone's home screen for one-tap access. (On iOS Safari:
Share → "Add to Home Screen".)

## Making changes later
Edit files locally, then:

```bash
cd /Users/sidbhatia/Claud/powershell-learning
git add .
git commit -m "Describe your change"
git push
```

The GitHub Action redeploys automatically within a minute or two. Watch progress
under the **Actions** tab of your repo.

## Note on progress tracking
Your lesson progress is saved in each browser's local storage. That means:
- On the **same device + browser**, your progress persists between visits. 👍
- Progress does **not** automatically sync across different devices (your phone
  and laptop track separately).

If you'd like true cross-device sync later, that can be added — just ask.
