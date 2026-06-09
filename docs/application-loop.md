# Application Loop

The Application Loop is the fast path for job-search execution. It finds and
queues roles, asks for a pre-work decision before expensive work, tailors the CV
only after that gate, prepares application forms and submits only after final
approval.

The loop stays focused on applications. After a terminal outcome, it records
whether outreach is worth doing, then leaves contact research and message
drafting to the separate Outreach Loop.

## Sequence

```plantuml
@startuml
scale 0.62
hide footbox
autonumber "<font color=white><b>#</b></font>"

actor "<color:white>Dario</color>" as U
participant "<color:white>Codex</color>\n<color:white>Application Loop</color>" as C #101721
participant "<color:white>Trackly</color>" as T #101721
participant "<color:white>Queue + Preferences</color>" as Q #101721
database "<color:white>Shared Memory</color>" as M #101721
participant "<color:white>Profile + CV Evidence</color>" as P #101721
participant "<color:white>Browser / ATS</color>" as B #101721
database "<color:white>Outreach Log</color>" as O #101721

C -> M: <color:white>Read current-state</color>
C -> Q: <color:white>Read active queue and preferences</color>
C -> T: <color:white>Search / refresh job facts</color>
C -> U: <color:white>Show pre-work brief</color>
U --> C: <color:white>Accept, skip or wait</color>

alt Accepted
  C -> P: <color:white>Create job package and tailor CV</color>
  C -> M: <color:white>Retrieve historical context only if useful</color>
  C -> B: <color:white>Inspect/fill application flow</color>
  C -> U: <color:white>Request final submit approval</color>
  U --> C: <color:white>Approve or revise</color>
  C -> B: <color:white>Submit after approval</color>
  C -> T: <color:white>Update status</color>
  C -> Q: <color:white>Remove from active queue</color>
  C -> O: <color:white>Record outreach opportunity if useful</color>
  C -> M: <color:white>Rebuild derived memory</color>
else Skipped or waiting
  C -> Q: <color:white>Update local queue decision</color>
  C -> M: <color:white>Rebuild if state changed</color>
end
@enduml
```

## 1. Search And Queue

The process starts from search preferences and Trackly job discovery. Roles
enter the active Markdown queue first, not an application folder.

```text
applications/
  current-state.md
  job-queue.md
  search-preferences.md
```

The loop reads `current-state.md`, `job-queue.md` and `search-preferences.md`
directly. It does not reconstruct the active queue from vector search.

## 2. Pre-Work Gate

Before creating a job package, Codex shows a compact brief:

- company and product;
- role scope;
- location, work mode and sponsorship implications;
- compensation when known;
- fit and risks;
- same-company history when relevant;
- recommendation: apply, wait, skip or replace focus.

This gate comes before CV tailoring, ATS inspection, application form filling or
submission packet work.

## 3. Job Package

When the pre-work gate is accepted, Codex creates a job workspace:

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

That folder becomes the local archive for the worked application.

## 4. CV Strategy

Base profile evidence is read directly from:

- `applications/profile-inventory.md`;
- `applications/application-profile.md`.

Retrieval is conditional. Codex queries historical memory only when prior
applications can improve the decision: similar fit analyses, submitted CV
summaries, known ATS lessons, same-company history or narrative risks.

## 5. Build And Submit

The LaTeX CV is compiled locally with TinyTeX/XeLaTeX:

```bash
scripts/build-cv-pdf.sh <application-folder>/cv-source <application-folder>/cv.pdf
scripts/preview-cv-pdf.sh <application-folder>/cv.pdf
```

Codex may inspect and fill application forms after the pre-work gate. It may
click final submit/apply/confirm only after explicit approval for that job.

## 6. Terminal State

After submission, skip or abandonment, the loop updates Trackly and local files,
then removes the job from the active queue. For submitted jobs, Codex writes a
`## Submitted CV Summary` in `notes.md`; that summary is indexed for future CV
strategy, not the PDF or LaTeX build output.

Before moving on, the loop records a lightweight outreach hook when useful:

- one `OPP-*` opportunity row in `outreach-log.md`;
- one `## Outreach` section in the job's `notes.md`;
- no contact research and no message drafting.
