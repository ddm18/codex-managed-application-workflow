# Codex-Managed Application Workflow

This documentation describes the workflow used to reorganize a role-specific CV
and prepare job applications through Codex, with explicit human approval before
any submission.

> This CV was reorganized for this role and submitted through a Codex-managed
> workflow, with human approval before submission.

The workflow is designed as an engineering system rather than a generic resume
generator. It keeps profile evidence, job context, CV source files, application
notes, local PDF previews and submission guardrails in one repeatable process.

## Purpose

The objective is to make job applications faster without making them less
truthful. The workflow helps:

- tailor a LaTeX CV to a specific job description;
- preserve evidence-backed claims;
- track job-specific reasoning and fit analysis;
- compile and preview the final PDF locally;
- prepare application forms with a human-in-the-loop approval boundary.

## Current Scope

The current implementation supports:

- a Git-backed LaTeX CV synchronized with Overleaf;
- local PDF compilation through TinyTeX;
- structured profile inventory and application notes;
- Trackly-assisted job discovery and job metadata;
- browser-assisted form preparation;
- explicit human approval before any submission.

It is not intended to fabricate claims, hide gaps, or submit applications
without review.
