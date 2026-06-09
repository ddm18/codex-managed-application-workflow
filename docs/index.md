# LLM-Assisted Application Workflow

> CV submitted through a personal LLM-assisted workflow after human approval,
> with automated discovery, RAG-guided CV tailoring, browser submission and
> manual outreach tracking. See projects for details.

This site documents a two-loop system for job search work:

- an **Application Loop** that discovers roles, gates work early, tailors the
  CV, prepares applications and submits only after approval;
- an **Outreach Loop** that runs separately after applications, ranks sensible
  people to message and tracks manual LinkedIn follow-up.

Both loops share the same local Markdown memory and the same approval boundary.
The point is leverage without pretending the system is autonomous: Codex can
prepare and execute approved work, but applications and networking remain
human-controlled.

## System Map

```plantuml
@startuml
left to right direction
scale 0.76

actor "Dario" as U
component "Application Loop\nsearch, gate, CV,\nsubmit, update" as APP #101721
component "Outreach Loop\nresearch, rank,\ndraft, follow up" as OUT #101721
database "Shared Memory\ncurrent state, queue,\nprofile, outreach log,\nSQLite + RAG" as MEM #171923
cloud "Trackly\njob facts and status" as TRACKLY #0B1018
storage "LaTeX CV\nsource + PDF" as CV #151923
cloud "LinkedIn\nmanual sending only" as LINKEDIN #0B1018

U --> APP : approves roles\nand submissions
U --> OUT : chooses who\nto message
APP --> MEM : reads/writes\njob state
OUT --> MEM : reads/writes\noutreach state
APP --> TRACKLY : searches and\nupdates jobs
APP --> CV : tailors and\nbuilds PDF
OUT --> LINKEDIN : prepares manual\nmessage targets
MEM --> APP : compact state +\ntargeted context
MEM --> OUT : open opportunities +\nfollow-up context
@enduml
```

## The Two Loops

| Loop | Purpose | Main Output |
| --- | --- | --- |
| [Application Loop](application-loop.md) | Find relevant jobs, decide whether each is worth work, tailor the CV, prepare the application and submit only after approval. | Submitted or closed applications, notes, submitted CV summaries and outreach opportunities. |
| [Outreach Loop](outreach-loop.md) | Review worked applications, find relevant people, rank contacts, draft short LinkedIn messages and track manual follow-up. | Ranked `OUT-*` contacts, message drafts, sent/reply/follow-up status. |

## Shared Layers

| Layer | What It Does |
| --- | --- |
| [Memory](memory.md) | Separates always-read context from conditional RAG retrieval. |
| [Architecture](architecture.md) | Shows the file, tool and data boundaries behind the two loops. |
| [Guardrails](guardrails.md) | Defines approval, truthfulness, privacy and LinkedIn boundaries. |
| [Implementation Reference](implementation-reference.md) | Lists canonical files, generated artifacts, scripts and skills. |

## Current Scope

The current implementation supports:

- a Git-backed LaTeX CV synchronized with Overleaf;
- local PDF compilation through TinyTeX/XeLaTeX;
- Trackly-assisted job discovery and status updates;
- a persistent Markdown queue, search preferences and application archive;
- RAG-guided retrieval over curated Markdown memory;
- browser-assisted application submission after approval;
- a central manual outreach log with daily ranked message drafting.

It is not intended to fabricate claims, hide gaps, submit applications without
review, auto-send LinkedIn messages or turn networking into spam automation.

## Start Here

Read these pages in order:

1. [Application Loop](application-loop.md)
2. [Outreach Loop](outreach-loop.md)
3. [Memory](memory.md)
4. [Guardrails](guardrails.md)
5. [Implementation Reference](implementation-reference.md)
