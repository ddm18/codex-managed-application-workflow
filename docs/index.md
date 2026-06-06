# Codex-Managed Application Workflow

!!! abstract "What this site is for"
    This documentation describes a human-approved workflow that discovers
    relevant roles, reorganizes a role-specific LaTeX CV, prepares application
    data, and submits applications through Codex only after explicit approval.

> CV submitted through a personal Codex workflow after human approval, with
> automated job discovery, CV reorganization and application submission.

The workflow is designed as an engineering system rather than a generic resume
generator. It keeps profile evidence, private reusable application-form data,
job context, CV source files, application notes, local PDF previews and
submission guardrails in one repeatable process.

## Workflow At A Glance

```mermaid
flowchart LR
  A["<span class='wf-node wf-node--codex'>Find interesting jobs</span>"] --> B["<span class='wf-node wf-node--codex'>Tailor CV to role</span>"]
  B --> C["<span class='wf-node wf-node--codex'>Prepare application</span>"]
  C --> D["<span class='wf-node wf-node--user'>Review and approve</span>"]
  D --> E["<span class='wf-node wf-node--codex'>Submit application</span>"]

  class A,B,C,E codexAction
  class D userAction
  classDef codexAction fill:#101721,stroke:#33e6ff,color:#f5f7fa;
  classDef userAction fill:#201016,stroke:#e21d3f,color:#f5f7fa;
```

## Why It Exists

The objective is to make job applications faster without making them less
truthful. The workflow helps:

- tailor a LaTeX CV to a specific job description;
- use external job-discovery integrations to find relevant roles;
- preserve evidence-backed claims;
- reuse progressively accumulated private application data for forms;
- track job-specific reasoning and fit analysis;
- compile and preview the final PDF locally;
- complete and submit application forms with a human-in-the-loop approval
  boundary.

## Current Scope

The current implementation supports:

- a Git-backed LaTeX CV synchronized with Overleaf;
- local PDF compilation through TinyTeX;
- structured profile inventory, private application profile and application
  notes;
- external job-discovery integrations, currently including Trackly;
- browser-assisted application submission;
- explicit human approval before any submission.

It is not intended to fabricate claims, hide gaps, or submit applications
without review.

## Start Here

If you want to understand the system quickly, read the pages in this order:

1. [Workflow](workflow.md)
2. [Architecture](architecture.md)
3. [Guardrails](guardrails.md)
4. [Future Work](future-work.md)

!!! tip "Reading mode"
    The workflow page explains the operational path. The architecture page
    explains the file and tool boundaries. The guardrails page explains what
    Codex is allowed to do, and where human approval becomes mandatory.
