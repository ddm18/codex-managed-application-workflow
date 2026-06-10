# Implementation Reference

This page is the operational reference for files, scripts and skills. It is not
the best first page for understanding the system; start with the two loop pages
and use this page when running or maintaining the workflow.

## Canonical Files

| File | Purpose |
| --- | --- |
| `applications/current-state.md` | Generated compact state read first by both loops. |
| `applications/job-queue.md` | Active application worklist. |
| `applications/search-preferences.md` | Role, location, ranking and hard-no rules. |
| `applications/profile-inventory.md` | Reusable evidence for CV and positioning. |
| `applications/application-profile.md` | Private answer bank and form guardrails. |
| `applications/outreach-log.md` | Outreach opportunities, contacts, drafts and status. |
| `applications/company-aliases.yml` | Canonical company identity map. |
| `applications/<job>/job.md` | Local job snapshot. |
| `applications/<job>/fit-analysis.md` | Fit analysis and tailoring strategy. |
| `applications/<job>/notes.md` | Local decisions, ATS notes, outreach hook and submitted CV summary. |

## Generated Memory Artifacts

```text
applications/
  current-state.md
  company-aliases.yml
  retrieval/
    chunks.sqlite
    vector-cache.sqlite
    lancedb/
```

The index is derived. If it is stale or broken, the workflow can continue using
Trackly, queue files, preferences and targeted file reads.

`vector-cache.sqlite` stores reusable local embeddings keyed by the text that is
actually embedded: company, role, document type, heading path and chunk text.
This lets rebuilds reuse unchanged vectors while still refreshing vectors when
metadata changes affect semantic retrieval.

## Scripts

| Script | Purpose |
| --- | --- |
| `scripts/workflow-memory.sh ensure` | Rebuild memory only when missing or stale. |
| `scripts/workflow-memory.sh build` | Rebuild current-state, aliases, SQLite FTS and LanceDB. |
| `scripts/workflow-memory.sh query "<query>" --limit 8 --semantic fallback` | Retrieve a compact set of relevant memory chunks. |
| `scripts/new-application-package.sh` | Create a job package after the pre-work gate. |
| `scripts/prepare-application.sh` | Prepare/build an application package. |
| `scripts/build-cv-pdf.sh` | Compile CV PDF through TinyTeX/XeLaTeX. |
| `scripts/preview-cv-pdf.sh` | Preview a generated CV PDF. |
| `scripts/add-submitted-cv-summary.py` | Add or refresh `## Submitted CV Summary` in job notes. |

## Skills

| Skill | Use |
| --- | --- |
| `job-application-loop` | Search, queue, brief, tailor CVs, prepare forms and submit after approval. |
| `linkedin-outreach-loop` | Review outreach opportunities, rank contacts, draft messages and record manual sending. |
| `workflow-memory-retrieval` | Read-only retrieval analyst for compact context packs. |

## Index Scope

Indexed by default:

- root workflow files: `job-queue.md`, `search-preferences.md`,
  `application-profile.md`, `profile-inventory.md`, `outreach-log.md`;
- application folder files: `job.md`, `fit-analysis.md`, `notes.md`.

Excluded by default:

- CV PDFs;
- LaTeX source copied into application folders;
- LaTeX build logs and auxiliary files;
- screenshots and form images;
- generated submission packets and application-form drafts.

## Embedding Procedure

Semantic retrieval is derived and rebuildable:

1. Markdown sections are chunked into stable local chunks.
2. SQLite FTS is rebuilt deterministically for exact lookup.
3. The embedding cache reuses vectors for unchanged embedded text.
4. FastEmbed creates vectors only for changed chunks.
5. LanceDB deletes stale rows, adds changed rows and keeps unchanged rows.

The chunk identity and embedding cache key are intentionally separate. Chunk
identity follows the local source section; the embedding key follows the text
and metadata sent to the embedding model.
