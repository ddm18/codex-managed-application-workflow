# Architecture

The workflow is intentionally file-first. Most state lives in Markdown or
LaTeX, so future Codex sessions can inspect and continue the process without
needing a hidden application database.

## System Shape

<div class="architecture-map" role="img" aria-label="Codex-managed application workflow architecture">
  <div class="architecture-column">
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#jobs"></use></svg>
      <strong>External Job Integrations</strong>
      <span>Role discovery and job metadata</span>
    </div>
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#data"></use></svg>
      <strong>Profile + Private Application Data</strong>
      <span>Evidence, preferences and reusable form data</span>
    </div>
  </div>

  <span class="architecture-arrow" aria-hidden="true"></span>

  <div class="architecture-node architecture-node--codex">
    <img class="architecture-node__icon architecture-node__icon--image" src="../assets/codex-app-icon.png" alt="" />
    <strong>Codex Orchestrator</strong>
    <span>Coordinates edits, previews, browser actions and approvals</span>
  </div>

  <span class="architecture-arrow" aria-hidden="true"></span>

  <div class="architecture-column architecture-column--wide">
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#workspace"></use></svg>
      <strong>Job Workspace</strong>
      <span>Job notes, fit analysis and tailoring plan</span>
    </div>
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#latex"></use></svg>
      <strong>LaTeX CV Source</strong>
      <span>Git-backed CV source compatible with Overleaf</span>
    </div>
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#pdf"></use></svg>
      <strong>TinyTeX PDF Preview</strong>
      <span>Local compile and visual check</span>
    </div>
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#browser"></use></svg>
      <strong>Browser / ATS</strong>
      <span>Form filling and approved submission</span>
    </div>
    <div class="architecture-node">
      <svg class="architecture-node__icon" aria-hidden="true"><use href="../assets/architecture-icons.svg#docs"></use></svg>
      <strong>Public MkDocs Site</strong>
      <span>Inspectable workflow documentation</span>
    </div>
  </div>
</div>

## Main Components

| Component | Purpose |
| --- | --- |
| `cv-overleaf/` | Git-backed LaTeX CV source, compatible with Overleaf. |
| `applications/profile-inventory.md` | Reusable evidence inventory for skills, projects and positioning. |
| `applications/application-profile.md` | Private reusable application-form information, personal details and form guardrails. |
| `applications/<job>/` | Job-specific notes, fit analysis and tailoring plans. |
| `codex-managed-application-workflow/` | Public documentation of the workflow itself. |

## External Services And Tools

| Tool | Role |
| --- | --- |
| Overleaf | Remote LaTeX editing and PDF rendering when needed. |
| GitHub | Versioned CV/project repositories. |
| TinyTeX | Local LaTeX compilation and PDF preview. |
| Trackly | External job discovery integration, saved jobs and job metadata. |
| Codex | File editing, review loops, Codex-executed applications, browser-assisted submission and workflow orchestration. |
| Browser | Form inspection, form filling and human-approved application submission. |

## Data Flow

```text
external job integrations
  -> relevant job posting
  -> application folder
  -> fit analysis
  -> profile evidence lookup
  -> private application data lookup
  -> LaTeX CV edits
  -> local compile and preview
  -> browser application flow
  -> human approval
  -> Codex-executed submission
```

## Design Principles

- Keep the base CV concise and credible.
- Store broader evidence outside the CV.
- Prefer role-specific variants over one bloated resume.
- Keep claims evidence-backed and NDA-safe.
- Use automation for application execution, not for unreviewed submission.
- Make the workflow inspectable by future Codex sessions.
