# Guardrails

The workflow is designed to increase leverage without sacrificing truthfulness
or control. Codex can search, queue and brief roles freely. Expensive
application work is gated before it starts: Codex must summarize the company,
role, location/work mode, sponsorship implications and risks before creating a
package, tailoring the CV or filling forms. Final submission for each job
remains separately human-approved.

## Approval Boundary

```plantuml
@startuml
scale 0.72
start
:Inspect role inputs;
:Update active queue;

:Show pre-work brief;
if (Proceed with this role?) then (yes)
  :Tailor CV / answers;
else (no)
  :Skip / dismiss and continue queue;
  stop
endif

:Review PDF + form state;
:Prepare submission packet;

if (Next action submits data?) then (yes)
  :Ask user for explicit approval;
  if (Approved?) then (yes)
    :Submit through Codex-managed browser flow;
  else (no)
    :Revise CV, answers or attachments;
  endif
else (no)
  :Continue preparation and inspection;
endif

stop
@enduml
```
{: .guardrail-diagram }

## Claim Integrity

Every CV claim should map back to one of:

- work evidence;
- project evidence;
- education evidence;
- explicit profile notes from the user.

If a skill is not yet backed by enough evidence, it can stay in the profile
inventory but should not become a base-CV headline.

## Human Approval

There are two human gates:

- Pre-work approval: required before package creation, CV tailoring, PDF build,
  ATS inspection/fill or submission packet work for a specific job.
- Final submission approval: required before clicking submit/apply/confirm or
  using an autoapply channel for that specific job.

Codex can search, queue and brief roles without asking. It can prepare, inspect,
draft, attach and submit through the browser or an autoapply channel only after
the relevant gates have passed.

This avoids turning the workflow into an uncontrolled application bot.

## Private Application Profile

Personal details and recurring form answers live in a private local Markdown
application profile. Codex may reuse stored answers in local drafts and
application preparation. If an answer is missing, ambiguous, sensitive or
legally material, Codex asks one question, saves the answer, then resumes the
same application.

## NDA-Safe Wording

For NDA-covered work, the workflow prefers anonymous but concrete phrasing:

- enterprise client environments;
- internal/external API integrations;
- production-facing modules;
- silver/gold analytical layers;
- decision-support workflows;
- data quality controls;
- design-to-release ownership.

It avoids client names, sensitive domains, private metrics or implementation
details that should not leave the work context.

## Role-Specific Emphasis

The base CV should remain focused. Specialized skills such as agentic AI,
LangChain, Agno, LangSmith-style evaluation workflows and MCP tooling are kept
in the profile inventory until a role explicitly calls for them.

This prevents the CV from becoming a broad keyword list.

## No False Automation Claims

The workflow can state that the CV was reorganized and submitted through a
personal Codex-managed process, but it should also state that submission
required human approval.

That distinction matters.

The fixed base-CV line is:

> CV submitted through a personal Codex workflow after human approval, with
> automated job discovery, CV reorganization and application submission. See
> projects for details.

## Queue Discipline

The active queue is not a public archive or proof of submission. Worked
applications live in their own folders, and external status lives in Trackly.
After submit or skip, Codex updates those records and removes the job from the
active queue so future sessions do not reprocess it.

Jobs that fail the pre-work gate should be dismissed or moved out of the active
queue before any CV/form work happens.
