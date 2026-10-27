# S.goto Lab Official Website — Production Hosting & Incident Rollback Procedure

**Target Hostname (Proposed):** `lab.shagoto.me`  
**Status:** Pre-deployment — Infrastructure and DNS mapping unverified pending founder activation.  
**Recommended Primary Hosting Architecture:** Cloudflare Pages (Direct Git Integration or Static Asset Upload via Wrangler)  
**Alternative Evaluated:** Cloudflare Workers Static Assets (`wrangler.jsonc` assets binding)

---

## 1. Hosting Architecture Evaluation & Recommendation

### Evaluation Matrix

| Criterion | Cloudflare Pages (Recommended) | Cloudflare Workers Static Assets |
| :--- | :--- | :--- |
| **Static SSG Alignment** | Native static hosting. Serves pre-rendered Astro `dist/` directly from global edge. | Requires Worker runtime configuration (`wrangler.jsonc`) to bind static assets directory. |
| **Rollback Capability** | **Instant Dashboard Rollback:** Every deployment produces an immutable deployment record with unique hash and instant 1-click edge rollback. | Rollback requires deploying a previous Worker script or asset manifest. |
| **Free-Tier Limits** | 500 builds/month, unlimited static requests, unlimited bandwidth, 20,000 files/deployment. | 100,000 requests/day free tier (Workers invocation cap applies to requests). |
| **Complexity** | Zero runtime code, zero serverless functions, zero edge worker maintenance. | Requires maintaining worker script or routing rules. |
| **Custom Domain Mapping** | Built-in CNAME/Apex mapping for `lab.shagoto.me` with automatic SSL/TLS certificate management. | Custom domain routing via Workers route mapping. |

### Architectural Recommendation
**Cloudflare Pages** is strongly recommended as the primary production hosting target for S.goto Lab. It precisely matches the Astro static architecture (`output: "static"`), eliminates runtime worker overhead, avoids daily Worker request quota constraints, and provides native, immutable deployment rollbacks.

*Note on Status:* `lab.shagoto.me` is a proposed hostname. Actual DNS records and Cloudflare Pages project binding are **not yet provisioned or verified**. Production deployment and DNS changes are strictly blocked pending founder authorization.

---

## 2. Release Identification & Versioning Standards

1. **Deterministic Builds:** Every production candidate build is generated strictly from clean Git commits.
2. **Tagging Distinctions:**
   - **Annotated Git Tags (`git tag -a`):** Used for standard engineering release candidate tracking (records author, date, message, and commit SHA).
   - **Cryptographically Signed Tags (`git tag -s`):** Requires founder GPG/SSH private signing keys. Only used when authorized and executed directly by the founder.
3. **Deployment Audit Record:** For every deployment, record:
   - Git Commit SHA (e.g., `git rev-parse HEAD`)
   - Release Tag (e.g., `v0.1.0-rc1`)
   - Cloudflare Pages Deployment ID (displayed in Cloudflare dashboard upon upload/build)
   - Asset manifest hash / bundle size (~115 KB)

---

## 3. Incident Rollback Protocol (Cloudflare Pages)

In the event of an unexpected runtime defect, layout regression, or security issue on the live site, execute immediate edge mitigation before performing local source reconciliation.

### Step 1: Immediate Edge Rollback via Cloudflare Dashboard (Primary)
*Cloudflare Pages does not have an official `wrangler pages rollback` CLI command. Edge rollbacks are performed via the Cloudflare Dashboard:*

1. Authenticate to the **Cloudflare Dashboard** (`dash.cloudflare.com`).
2. Navigate to **Workers & Pages > Overview > `s-goto-lab-site`** (or configured Pages project name).
3. Select the **Deployments** tab.
4. Review the deployment history to locate the **last known-good deployment** (identifiable by deployment timestamp, git commit SHA, or release tag).
5. Click the overflow menu `...` adjacent to the known-good deployment and choose **Rollback to this deployment** (or **Manage Deployment > Activate**).
6. Confirm the rollback modal.
7. **Propagation Time:** Cloudflare updates global edge routing to the historical deployment asset bundle. Edge propagation typically completes across Cloudflare points of presence within a few minutes, subject to client DNS and edge cache TTLs.

### Step 2: Emergency CLI Redundancy (Alternative Re-deployment)
If dashboard access is constrained, roll back by re-deploying the known-good local build artifact using Wrangler:

```bash
# 1. Checkout the known-good release commit or annotated tag
git checkout <KNOWN_GOOD_TAG_OR_COMMIT>

# 2. Build the known-good static artifact cleanly
npm ci
npm run build

# 3. Deploy the verified artifact directly to Cloudflare Pages project
# (Requires CLOUDFLARE_API_TOKEN with Cloudflare Pages Edit permissions)
npx wrangler pages deploy dist --project-name=s-goto-lab-site --commit-dirty=false
```

---

## 4. Post-Rollback Verification & Triage

Immediately following the edge rollback (within 5–10 minutes), verify live recovery:

1. **HTTP Status & Headers:**
   ```bash
   curl -I https://lab.shagoto.me/
   # Verify HTTP/2 200, X-Content-Type-Options: nosniff, Strict-Transport-Security: max-age=31536000
   ```
2. **Approved Public Routes:**
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/` -> 200
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/capabilities` -> 200
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/about` -> 200
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/contact` -> 200
3. **Negative Route Boundary:**
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/brand-study` -> 404
   - `curl -s -o /dev/null -w "%{http_code}\n" https://lab.shagoto.me/work` -> 404
4. **Visual & Interaction Check:** Verify Candidate 1 wordmark and Filament rendering on both mobile and desktop viewports.

---

## 5. Source Tree Reconciliation (Post-Incident)

**CRITICAL SAFEGUARD:** Do **NOT** execute blanket or automatic `git revert` commands on local `main` immediately following an edge rollback. 

- First, conduct an incident triage to isolate the exact root cause of the regression.
- If the regression was caused by a faulty code commit:
  1. Create a dedicated incident branch (`fix/incident-<date>-<brief-slug>`).
  2. Perform a targeted revert (`git revert <OFFENDING_COMMIT_SHA>`) or surgical fix.
  3. Run the comprehensive test suite (`npm test`, `npm run check`, `npx playwright test`).
  4. Review diff with the founder before merging into `main`.
- Document the incident, affected commit, rollback deployment ID, and resolution in `CHECKPOINT_STATUS.md`.

---

## 6. Access Control & Secrets Governance

- **Zero Stored Credentials:** Never commit `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, or email routing credentials to source code.
- **Environment Separation:** Local preview uses `.env` (gitignored). CI/CD uses encrypted repository secrets.
- **Production Gate:** Production deployment keys must be held strictly by the founder. Antigravity operates in a local engineering capacity and does not possess live deployment credentials.

