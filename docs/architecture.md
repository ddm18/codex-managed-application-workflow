# Architecture

The workflow is intentionally file-first. Most state lives in Markdown or LaTeX,
so future Codex sessions can inspect and continue the process.

## Main Components

| Component | Purpose |
| --- | --- |
| `cv-overleaf/` | Git-backed LaTeX CV source, compatible with Overleaf. |
| `applications/profile-inventory.md` | Reusable evidence inventory for skills, projects and positioning. |
| `applications/application-profile.md` | Reusable application-form information and form guardrails. |
| `applications/<job>/` | Job-specific notes, fit analysis and tailoring plans. |
| `codex-managed-application-workflow/` | Public-style documentation of the workflow itself. |

## External Services And Tools

| Tool | Role |
| --- | --- |
| Overleaf | Remote LaTeX editing and PDF rendering when needed. |
| GitHub | Versioned CV/project repositories. |
| TinyTeX | Local LaTeX compilation and PDF preview. |
| Trackly | Job discovery, saved jobs and job metadata. |
| Codex | File editing, review loops, application preparation and workflow orchestration. |
| Browser | Form inspection and human-approved application preparation. |

## Data Flow

```text
job posting
  -> application folder
  -> fit analysis
  -> profile evidence lookup
  -> LaTeX CV edits
  -> local compile and preview
  -> browser form preparation
  -> human approval
  -> submission
```

## Design Principles

- Keep the base CV concise and credible.
- Store broader evidence outside the CV.
- Prefer role-specific variants over one bloated resume.
- Keep claims evidence-backed and NDA-safe.
- Use automation for preparation, not for unreviewed submission.
- Make the workflow inspectable by future Codex sessions.
