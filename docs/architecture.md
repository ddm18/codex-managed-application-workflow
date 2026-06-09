# Architecture

The system is split into two loops with a shared memory layer. The architecture
view shows responsibilities and boundaries; concrete file names live in the
Implementation Reference.

## System Shape

```plantuml
@startuml
left to right direction
scale 0.78

package "Codex Orchestration" as CODEX #0E141D {
  component "Application Loop" as APP #101721
  component "Outreach Loop" as OUTLOOP #101721
}

package "Local Persistence" as LOCAL #172036 {
  storage "Local Records" as RECORDS #111A26
  storage "CV Workspace" as CV #111A26
}

package "Derived Memory" as MEMORY_LAYER #201016 {
  database "Compact State" as STATE #171923
  database "Exact Search" as EXACT #171923
  database "RAG Fallback" as RAG #171923
}

cloud "Trackly" as TRACKLY
component "Browser / ATS" as BROWSER
component "PDF Builder" as TEX
cloud "LinkedIn" as LINKEDIN

TRACKLY --> APP
APP --> RECORDS
APP --> CV
CV --> TEX
TEX --> APP
APP --> BROWSER

RECORDS --> MEMORY_LAYER
MEMORY_LAYER --> APP

OUTLOOP --> RECORDS
MEMORY_LAYER --> OUTLOOP
OUTLOOP --> LINKEDIN
@enduml
```
{: .architecture-diagram }

## Component Boundaries

| Component | Boundary |
| --- | --- |
| Application Loop | Owns job discovery, pre-work brief, CV tailoring, application preparation, approval and terminal job updates. |
| Outreach Loop | Owns contact research, ranking, message drafts, sent status and follow-up status. |
| Local Persistence | Stores human-readable operational state, notes, evidence and CV source. |
| Derived Memory | Provides compact state, exact search and RAG fallback; not authoritative. |
| Trackly | Authoritative for live job-posting facts and external status. |
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
outreach opportunities
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
