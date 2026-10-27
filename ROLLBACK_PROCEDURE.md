# S.goto Lab Official Website — Production Rollback Procedure

This document specifies the mandatory rollback strategy and step-by-step verification protocol for `lab.shagoto.me`.

---

## 1. Rollback Principles

1. **Deterministic Immutability:** Every release build is produced from an annotated, signed Git tag (e.g., `v0.1.0-release`).
2. **Instant Host Rollback:** Cloudflare Pages / Workers Static Assets maintains historic deployment artifacts keyed by deployment hash. Reverting in the Cloudflare dashboard or via Wrangler requires zero rebuild time.
3. **Zero Data Loss:** S.goto Lab is a static-first site without an attached database in v1. A rollback affects only static assets, eliminating data migration or corruption risks.

---

## 2. Immediate Rollback Execution (Time to Recovery: < 60 Seconds)

### Option A: Cloudflare Dashboard (Primary / Fastest)
1. Navigate to **Cloudflare Dashboard > Workers & Pages > `s-goto-lab-site`**.
2. Select the **Deployments** tab.
3. Locate the previous known-good deployment (e.g., the commit prior to regression).
4. Click the three dots `...` next to the known-good deployment and select **Rollback to this deployment**.
5. Confirm the action. Cloudflare routes edge traffic to the previous asset bundle within ~15 seconds globally.

### Option B: Wrangler CLI (Alternative)
```bash
# List previous deployments
npx wrangler pages deployment list --project-name=s-goto-lab-site

# Roll back to the specific deployment ID
npx wrangler pages rollback --project-name=s-goto-lab-site --deployment-id=<KNOWN_GOOD_DEPLOYMENT_ID>
```

---

## 3. Local Git Repository Alignment

After executing the edge rollback, align the local `main` branch:

```bash
# 1. Identify the bad commit hash
git log -3 --oneline

# 2. Revert the problematic commit atomically
git revert <BAD_COMMIT_HASH> --no-edit

# 3. Verify clean test suite
npm test
npm run check
npx playwright test

# 4. Tag the emergency rollback release
git tag -a "v0.1.0-rollback-1" -m "emergency rollback: revert regression from commit <BAD_COMMIT_HASH>"
```

---

## 4. Post-Rollback Verification Checklist

Within 5 minutes of triggering a rollback, verify live status:

- [ ] **HTTP / HTTPS Status:** `curl -I https://lab.shagoto.me/` returns `HTTP/2 200`.
- [ ] **Canonical URL:** `<link rel="canonical" href="https://lab.shagoto.me/">`.
- [ ] **Filament & Identity:** Home page renders clean invariant Filament (5 incoming -> 1 node -> 1 resolved line).
- [ ] **Leak Boundary:** Confirmed zero references to `serialnow`, `phantom`, or internal paths.
- [ ] **Navigation Flow:** All approved routes (`/capabilities`, `/about`, `/contact`) resolve with `200`.
- [ ] **No Work Route:** `https://lab.shagoto.me/work` returns clean 404 page.
