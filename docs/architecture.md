# Architecture

The workflow is intentionally file-first. Most state lives in Markdown or LaTeX,
so future Codex sessions can inspect and continue the process.

## Main Components

| Component | Purpose |
| --- | --- |
| `cv-overleaf/` | Git-backed LaTeX CV source, compatible with Overleaf. |
| `applications/profile-inventory.md` | Reusable evidence inventory for skills, projects and positioning. |
| `applications/application-profile.md` | Private reusable application-form information, personal details and form guardrails. |
| `applications/<job>/` | Job-specific notes, fit analysis and tailoring plans. |
| `codex-managed-application-workflow/` | Public-style documentation of the workflow itself. |

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
