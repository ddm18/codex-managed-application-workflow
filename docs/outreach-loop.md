# Outreach Loop

The Outreach Loop is separate from the application pipeline. It runs after
applications have reached a terminal state and focuses on manual LinkedIn
outreach: who is worth contacting, why, and what Dario should write.

It never auto-sends, auto-connects, scrapes LinkedIn pages or clicks LinkedIn
buttons.

## Sequence

```plantuml
@startuml
scale 0.66
hide footbox
autonumber "<font color=white><b>#</b></font>"

actor "<color:white>Dario</color>" as U
participant "<color:white>Codex</color>\n<color:white>Outreach Loop</color>" as C #101721
database "<color:white>Shared Memory</color>" as M #101721
database "<color:white>Outreach Log</color>" as O #101721
storage "<color:white>Application Notes</color>" as N #101721
cloud "<color:white>Public Web Sources</color>" as W #0B1018
cloud "<color:white>LinkedIn</color>\n<color:white>manual only</color>" as L #0B1018

C -> M: <color:white>Read current-state and retrieval context</color>
C -> O: <color:white>Read open OPP/OUT items</color>
C -> N: <color:white>Read relevant job notes</color>
C -> W: <color:white>Find public contact signals</color>
C -> C: <color:white>Rank all sensible contacts</color>
C -> U: <color:white>Return OUT ids and message drafts</color>
U -> L: <color:white>Send manually</color>
U --> C: <color:white>scritto OUT-001, OUT-004</color>
C -> O: <color:white>Mark sent and set light follow-up</color>
C -> M: <color:white>Rebuild derived memory</color>
@enduml
```

## Inputs

The loop reads:

- `applications/current-state.md`;
- `applications/outreach-log.md`;
- relevant application folders, especially `job.md`, `fit-analysis.md` and
  `notes.md`;
- public web sources such as company pages, team pages, engineering blogs,
  talks, public profiles and search queries.

It may use retrieval to pull the right job context, but the outreach rows in
`outreach-log.md` remain the source of truth.

## Opportunity And Contact IDs

The application loop creates `OPP-*` opportunities. The outreach loop expands
those opportunities into person-level `OUT-*` contacts.

Each contact tracks:

- person name and title;
- company and likely relevance;
- source URL or search query;
- LinkedIn URL if found;
- ranking score and reason;
- draft message;
- sent date, follow-up due date and reply status.

## Ranking

The loop returns all sensible contacts, grouped by usefulness:

- `P0`: likely hiring manager, team lead or founder for a high-fit role;
- `P1`: relevant engineering or recruiting contact with strong role connection;
- `P2`: plausible but weaker contact;
- `P3`: low-confidence fallback, shown only if useful.

## Message Style

Each draft should be short and specific:

- one role/company-specific hook;
- one sentence of Dario fit;
- one thoughtful question.

The message is a draft for manual sending. Dario chooses which messages to send.

## Sent And Follow-Up Updates

After Dario writes messages manually, he can reply with ids such as:

```text
scritto OUT-001, OUT-004
```

Codex then marks only those contacts as `sent`, preserves the exact message and
sets one light follow-up date for high-priority contacts when appropriate.
