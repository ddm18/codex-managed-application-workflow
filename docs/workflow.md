# Workflow

The workflow treats job applications as a persistent queue-driven pipeline:
discover and rank roles, show a short pre-work brief before spending effort on
any job, tailor the CV only after that gate, ask for missing data one question
at a time, save reusable answers, prepare a submission packet, then submit only
after final approval.

## Execution Sequence

```plantuml
@startuml
scale 0.58
hide footbox
autonumber "<font color=white><b>#</b></font>"

actor "<color:white>user</color>" as U
participant "<img:https://raw.githubusercontent.com/ddm18/codex-managed-application-workflow/main/docs/assets/codex-app-icon.png{scale=0.42}>\n<color:white>Codex</color>" as C #101721
participant "<color:white>Job Queue</color>\n<color:white>and Preferences</color>" as Q #101721
participant "<color:white>Profile / CV</color>\n<color:white>Evidence Stores</color>" as S #101721
participant "<color:white>Browser / ATS</color>\n<color:white>Application Flow</color>" as B #101721

C -> Q: <color:white>Search/refill ready queue</color>
C -> U: <color:white>Show pre-work brief</color>\n<color:white>company, role, location, risks</color>
U --> C: <color:white>Accept or skip before CV work</color>
C -> S: <color:white>Create job workspace</color>\n<color:white>and tailor CV to role</color>
C -> S: <color:white>Ask one missing question</color>\n<color:white>and save reusable answer</color>
C -> C: <color:white>Compile PDF and inspect preview</color>
C -> B: <color:white>Prepare submission packet</color>\n<color:white>and fill application flow</color>
C -> U: <color:white>Request final submission approval</color>
U --> C: <color:white>Approve or request revision</color>

alt Approved
  C -> B: <color:white>Submit application</color>
  C -> Q: <color:white>Update Trackly/folder</color>\n<color:white>and remove from queue</color>
else Revision requested
  C -> C: <color:white>Revise CV, answers</color>\n<color:white>or attachments</color>
end
@enduml
```

## 1. Search And Queue

The process starts from search preferences and external job-discovery
integrations such as Trackly. Roles first enter an active Markdown queue, not an
application folder. The queue distinguishes ready, maybe and blocked work so
future Codex sessions can continue without rediscovering state.

The loop refills when fewer than three jobs are ready, keeps a soft cap around
five ready jobs, and still saves unusually strong roles found in the same search
batch. Jobs stay lightweight until the user accepts a short pre-work brief.
That brief is mandatory before package creation, CV tailoring or ATS/form work,
even if a job is already marked ready.

Active queue shape:

```text
applications/
  job-queue.md
  search-preferences.md
```

## 2. Pre-Work Gate

Before creating a job package, Codex summarizes:

- what the company does;
- what the role entails;
- location, work mode and sponsorship implications;
- compensation when known;
- why the role fits the user's positioning;
- risks or reasons to skip.

If the role is outside preferences, such as UK remote with sponsorship, Poland
relocation, weak compensation or a pure full-remote setup, this gate happens
before any CV or form work. The user can reject the role and the loop moves on.

## 3. Job Package

When the pre-work gate is accepted, Codex creates a job workspace. That folder
becomes the archive for worked applications.

```text
applications/
  company-role-date/
    job.md
    fit-analysis.md
    cv-tailoring-plan.md
    notes.md
    application-form-draft.md
    submission-checklist.md
    cv-source/
    cv.pdf
```

## 4. Evidence And Application Data Lookup

Codex reads the reusable profile inventory before proposing CV changes. The
inventory stores skills, projects, work evidence, preferences and guardrails
that may not all belong in the base CV.

Codex can also read a private local Markdown application profile. That file is
an answer bank for personal details, recurring form answers, work-authorization
notes and consent rules. Missing data is gathered one question at a time; after
the user answers, reusable information is saved and reused for future drafts
unless the current form changes the meaning or the data is sensitive.

This separates three concerns:

- the CV remains concise and role-specific;
- the profile inventory remains broad and reusable;
- recurring personal/form data is stored privately instead of being rediscovered
  for every application.

## 5. CV Tailoring

Codex edits the LaTeX source directly, usually in small scoped changes:

- reorder projects for the role;
- emphasize the strongest relevant evidence;
- remove lower-priority skills;
- adjust wording to keep claims accurate;
- avoid exceeding one page.

The current base CV emphasizes data/platform/backend evidence, with the NYC
Urban Mobility Data Platform as the flagship public project.

This per-job tailoring is part of the current workflow. Future reusable CV
tracks are only starting points for recurring role families, not a replacement
for tailoring each application to the actual job request.

## 6. Review Loop

The CV can be reviewed through multiple simulated CV-reader perspectives:

- high-end consulting;
- serious product company;
- big-tech or FAANG-style screening;
- data/platform scaleup.

The goal is not to optimize for one generic recruiter, but to understand how
the same evidence reads under different hiring biases.

## 7. Local Compile And Preview

The LaTeX CV is compiled locally with TinyTeX. The generated PDF is checked for
page count and previewed before use. The local workspace uses a small wrapper
script around XeLaTeX so future sessions do not fall back to incompatible
tooling.

```bash
scripts/build-cv-pdf.sh <application-folder>/cv-source <application-folder>/cv.pdf
scripts/preview-cv-pdf.sh <application-folder>/cv.pdf
```

Tectonic is intentionally not used for this CV template on the current machine:
the local TinyTeX/XeLaTeX path matches the Overleaf rendering more reliably,
including FontAwesome icons and `pdfx` metadata.

## 8. Application And Queue Exit

Application forms can be completed with Codex using the browser after the
pre-work gate has passed. The final submission can also be executed through the
Codex-managed workflow. Submission is still a separate approval step after the
CV, form data and attachments have been reviewed.

Before approval, Codex prepares a submission packet: target role, CV path, main
tailoring changes, sensitive form answers, risks/gaps and the exact submit
channel. It must not click final submit/apply/confirm unless the user explicitly
approves that specific job. After submission or skip, Codex updates Trackly and
the application folder, then removes the job from the active queue.
