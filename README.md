# Codex-Managed Application Workflow Docs

MkDocs documentation for the Codex-managed CV and job-application workflow,
including the local memory/retrieval layer used to keep long-running job-search
context targeted.

## Local Environment

Use the project-local virtual environment. Do not rely on the system Python.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r docs/requirements.txt
```

## Build

```bash
.venv/bin/mkdocs build
```

The generated site is written to `site/`, which is intentionally ignored by
git.

## Preview

```bash
.venv/bin/mkdocs serve
```

Open the printed localhost URL in the browser.
