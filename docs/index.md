# Codex-Managed Application Workflow

> CV submitted through a personal Codex workflow after human approval, with
> automated discovery, retrieval-guided CV tailoring, browser submission and
> manual outreach tracking. See projects for details.

This site documents the engineering system behind that line: Codex discovers
relevant roles, manages an active job queue, shows a pre-work brief before
spending effort on a role, tailors the LaTeX CV only after that gate, reuses a
private answer bank, retrieves only targeted historical context, prepares the
browser application, and submits only after a lightweight final approval. After
terminal application outcomes, it records manual outreach opportunities so a
separate daily loop can rank people to message without slowing the application
pipeline.

## Workflow At A Glance

<div class="workflow-strip" role="img" aria-label="Codex-managed job application workflow">
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Find and queue jobs</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--user">
    <img class="workflow-step__icon" src="assets/user-icon.svg" alt="" />
    <span class="workflow-step__actor">user</span>
    <strong>Accept pre-work brief</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Tailor CV to role</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Ask and save answers</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--user">
    <img class="workflow-step__icon" src="assets/user-icon.svg" alt="" />
    <span class="workflow-step__actor">user</span>
    <strong>Approve packet</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Submit and update</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Rank outreach</strong>
  </div>
</div>

## Why It Exists

The objective is to make job applications faster without making them less
truthful. The workflow helps:

- tailor a LaTeX CV to a specific job description;
- use external job-discovery integrations to find relevant roles;
- maintain an active queue of ready, maybe and blocked opportunities;
- use a local retrieval index to fetch relevant historical notes without loading
  the whole archive;
- avoid wasting CV/form work on roles that fail location, work-mode,
  sponsorship or compensation preferences;
- preserve evidence-backed claims;
- reuse progressively accumulated private application data for forms;
- track job-specific reasoning and fit analysis;
- compile and preview the final PDF locally;
- complete and submit application forms with a human-in-the-loop approval
  boundary.
- keep the final submit approval short when the earlier pre-work gate already
  accepted the role.
- track which submitted or closed roles deserve manual LinkedIn outreach and
  draft ranked messages in a separate daily routine.

## Current Scope

The current implementation supports:

- a Git-backed LaTeX CV synchronized with Overleaf;
- local PDF compilation through TinyTeX;
- a persistent Markdown job queue and mutable search preferences;
- per-job CV tailoring from the base CV, reusable evidence inventory and job
  requirements after a pre-work acceptance gate;
- structured profile inventory, private application profile, reusable answer
  bank and application notes;
- a local memory layer with `current-state.md`, SQLite FTS, LanceDB semantic
  fallback and stable company aliases;
- external job-discovery integrations, currently including Trackly;
- browser-assisted application submission;
- a central manual outreach log with ranked daily message drafting;
- explicit human approval before any submission.

It is not intended to fabricate claims, hide gaps, or submit applications
without review.

## Start Here

If you want to understand the system quickly, read the pages in this order:

1. [Workflow](workflow.md)
2. [Architecture](architecture.md)
3. [Memory](memory.md)
4. [Guardrails](guardrails.md)
5. [Future Work](future-work.md)

!!! tip "Reading mode"
    The workflow page explains the operational path. The architecture page
    explains the file and tool boundaries. The memory page explains targeted
    retrieval. The guardrails page explains what Codex is allowed to do, and
    where human approval becomes mandatory.
