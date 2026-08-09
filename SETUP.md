# Setup Checklist

Steps to run through when starting a new project from this template.

## 1. Find-and-replace placeholders

Repo names use hyphens, not spaces (e.g. `restaurant-page`, not `Restaurant Page`).

**`package.json`**

- [ ] `name` — the repo name
- [ ] `description` — what the project is
- [ ] `repository.url` — `git+https://github.com/kondratkoj/<repo-name>.git`
- [ ] `bugs.url` — `https://github.com/kondratkoj/<repo-name>/issues`
- [ ] `homepage` — `https://github.com/kondratkoj/<repo-name>/readme`

**`src/template.html`**

- [ ] `<title>` — the page title shown in the browser tab

## 2. Install dependencies

```bash
npm install
```

This installs the exact locked versions from `package-lock.json`. Don't run `npm update` here — inherit the known-good toolchain and start building.

## 3. Develop

```bash
npm start
```

Opens a dev server with live reload at `http://localhost:8080/`.

## 4. Deploy to GitHub Pages

```bash
npm run deploy
```

Runs the production build and pushes `dist/` to the `gh-pages` branch (`predeploy` builds automatically first).

Then, one time per repo, on GitHub:
**Settings → Pages → Source: "Deploy from a branch" → Branch: `gh-pages`, folder `/(root)` → Save.**

Live at `https://kondratkoj.github.io/<repo-name>/`. Re-run `npm run deploy` after any change.

## Maintaining the template itself

Update dependencies on the _template_ deliberately, not per-project:

```bash
npm outdated     # see what's behind
npm update       # bump within allowed ranges
npm start        # confirm dev works
npm run build    # confirm build works
```

Commit the updated `package-lock.json` so new projects inherit the tested versions. Major-version jumps (e.g. Webpack 5 → 6) need manual bumping and a test build.
