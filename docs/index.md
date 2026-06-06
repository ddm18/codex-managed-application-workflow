# Codex-Managed Application Workflow

This documentation describes the workflow used to discover relevant roles
through external integrations, reorganize a role-specific CV, prepare the
application and submit it through Codex, with explicit human approval before
any submission.

> External job integrations find relevant roles; Codex reorganizes the CV,
> prepares the application and asks for approval before it submits.

The workflow is designed as an engineering system rather than a generic resume
generator. It keeps profile evidence, private reusable application-form data,
job context, CV source files, application notes, local PDF previews and
submission guardrails in one repeatable process.

## Purpose

The objective is to make job applications faster without making them less
truthful. The workflow helps:

- tailor a LaTeX CV to a specific job description;
- use external job-discovery integrations to find relevant roles;
- preserve evidence-backed claims;
- reuse progressively accumulated private application data for forms;
- track job-specific reasoning and fit analysis;
- compile and preview the final PDF locally;
- prepare and submit application forms with a human-in-the-loop approval
  boundary.

## Current Scope

The current implementation supports:

- a Git-backed LaTeX CV synchronized with Overleaf;
- local PDF compilation through TinyTeX;
- structured profile inventory, private application profile and application
  notes;
- external job-discovery integrations, currently including Trackly;
- browser-assisted form preparation and submission;
- explicit human approval before any submission.

It is not intended to fabricate claims, hide gaps, or submit applications
without review.
