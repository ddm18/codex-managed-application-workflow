# Workflow

## 1. Job Intake

The process starts from a job posting, usually found through Trackly or opened
directly in the browser. The role is captured in an application folder together
with the job description, fit analysis and notes.

Typical folder shape:

```text
applications/
  company-role-date/
    job.md
    fit-analysis.md
    cv-tailoring-plan.md
    notes.md
```

## 2. Evidence Lookup

Codex reads the reusable profile inventory before proposing CV changes. The
inventory stores skills, projects, work evidence, preferences and guardrails
that may not all belong in the base CV.

This separates two concerns:

- the CV remains concise and role-specific;
- the profile inventory remains broad and reusable.

## 3. CV Tailoring

Codex edits the LaTeX source directly, usually in small scoped changes:

- reorder projects for the role;
- emphasize the strongest relevant evidence;
- remove lower-priority skills;
- adjust wording to keep claims accurate;
- avoid exceeding one page.

The current base CV emphasizes data/platform/backend evidence, with the NYC
Urban Mobility Data Platform as the flagship public project.

## 4. Review Loop

The CV can be reviewed through multiple simulated CV-reader perspectives:

- high-end consulting;
- serious product company;
- big-tech or FAANG-style screening;
- data/platform scaleup.

The goal is not to optimize for one generic recruiter, but to understand how
the same evidence reads under different hiring biases.

## 5. Local Compile And Preview

The LaTeX CV is compiled locally with TinyTeX. The generated PDF is checked for
page count and previewed before use.

```bash
cd cv-overleaf/techResume-main
xelatex -interaction=nonstopmode -halt-on-error resume.tex
```

## 6. Application Preparation

Application forms can be prepared with Codex using the browser, but submission
is a separate step.

Codex may help map fields, prepare answers, attach the CV and identify required
information. It must not submit the application unless Dario explicitly
approves that final action.
