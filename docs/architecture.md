# Architecture

The system is file-first and split into two loops with a shared memory layer.
Trackly supplies live job facts, Markdown stores local decisions and work
products, and the retrieval index helps Codex find the right historical context
without loading the whole archive.

## System Shape

```plantuml
@startuml
left to right direction
scale 0.84

component "Application Loop\nsearch, gate,\nCV, submit" as APP #101721
component "Outreach Loop\nresearch, rank,\ndraft, follow up" as OUTLOOP #101721

cloud "Trackly\njob facts and status" as TRACKLY
storage "Active Queue\njob-queue.md" as QUEUE
storage "Profile + Answer Bank\nprofile-inventory.md\napplication-profile.md" as PROFILE
storage "Application Archive\napplications/<job>/" as ARCHIVE
storage "Outreach Log\noutreach-log.md" as OUTLOG
storage "LaTeX CV Source\ncv-overleaf/" as CV
database "Derived Memory\ncurrent-state.md\nSQLite FTS + LanceDB" as MEMORY
component "TinyTeX / XeLaTeX\nPDF build" as TEX
component "Browser / ATS\napproved submission" as BROWSER
cloud "LinkedIn\nmanual only" as LINKEDIN
cloud "Public MkDocs Site" as DOCS

TRACKLY --> APP
QUEUE --> APP
PROFILE --> APP
APP --> ARCHIVE
APP --> CV
CV --> TEX
TEX --> APP
APP --> BROWSER
APP --> OUTLOG

OUTLOG --> OUTLOOP
ARCHIVE --> OUTLOOP
OUTLOOP --> LINKEDIN

QUEUE --> MEMORY
PROFILE --> MEMORY
ARCHIVE --> MEMORY
OUTLOG --> MEMORY
MEMORY --> APP
MEMORY --> OUTLOOP

APP --> DOCS
OUTLOOP --> DOCS
@enduml
```
{: .architecture-diagram }

## Component Boundaries

| Component | Boundary |
| --- | --- |
| Application Loop | Owns job discovery, pre-work brief, CV tailoring, application preparation, approval and terminal job updates. |
| Outreach Loop | Owns contact research, ranking, message drafts, sent status and follow-up status. |
| Shared Memory | Derived context map read by both loops; not authoritative. |
| Trackly | Authoritative for live job-posting facts and external status. |
| Markdown | Authoritative for local decisions, CV work, outreach state and workflow notes. |
| Browser / ATS | Used only after pre-work approval; final submit requires explicit approval. |
| LinkedIn | Manual surface only; Codex may draft and track, not send or connect. |

## Data Flow

Application path:

```text
Trackly/search
  -> active queue
  -> pre-work brief
  -> accepted job package
  -> CV strategy and form preparation
  -> final approval
  -> browser/ATS submission
  -> Trackly + local folder update
  -> submitted CV summary
  -> optional OPP-* outreach hook
  -> memory rebuild
```

Outreach path:

```text
outreach-log.md OPP-* opportunities
  -> relevant job notes and memory context
  -> public contact research
  -> ranked OUT-* contacts
  -> message drafts
  -> Dario sends manually
  -> sent/reply/follow-up state
  -> memory rebuild
```

## Design Principles

- Keep the application critical path fast.
- Keep outreach out of the application loop.
- Keep the base CV concise and credible.
- Store broader evidence outside the CV.
- Keep claims evidence-backed and NDA-safe.
- Use automation for preparation and approved execution, not for unreviewed
  submission or networking.
- Keep memory derived and targeted: authoritative facts stay in Trackly and
  Markdown, while SQLite/LanceDB only help find the right sections to read.
