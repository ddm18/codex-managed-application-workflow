# Codex-Managed Application Workflow

> CV submitted through a personal Codex workflow after human approval, with
> automated job discovery, CV reorganization and application submission. See
> projects for details.

This site documents the engineering system behind that line: Codex finds
relevant roles, tailors the LaTeX CV, prepares the browser application, and
submits only after explicit approval while keeping evidence, profile data, job
notes, PDF previews and guardrails in one repeatable process.

## Workflow At A Glance

<div class="workflow-strip" role="img" aria-label="Codex-managed job application workflow">
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Find interesting jobs</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Tailor CV to job</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Prepare application</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--user">
    <img class="workflow-step__icon" src="assets/user-icon.svg" alt="" />
    <span class="workflow-step__actor">user</span>
    <strong>Review and approve</strong>
  </div>
  <span class="workflow-arrow" aria-hidden="true"></span>
  <div class="workflow-step workflow-step--codex">
    <img class="workflow-step__icon" src="assets/codex-app-icon.png" alt="" />
    <span class="workflow-step__actor">Codex</span>
    <strong>Submit application</strong>
  </div>
</div>

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
- per-job CV tailoring from the base CV, reusable evidence inventory and job
  requirements;
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
