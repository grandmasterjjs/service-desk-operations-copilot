# Service Desk Operations Copilot

A AI-assisted Service Desk operations prototype. It demonstrates how a support leader can turn ticket data into queue-risk signals, onboarding safeguards, readiness reporting, and human-approved actions.

## What it demonstrates

- Queue triage that elevates work stoppages, security concerns, and onboarding gaps over raw volume.
- A grounded analyst surface that answers against the records in the demo.
- Human approval before any proposed ticket action.
- Scheduled-operation designs for triage, onboarding monitoring, standup reporting, and stale-ticket hygiene.
- A security model that starts read-only and keeps destructive actions in dry-run mode.

## What it is not

This is not a copy of an employer system, nor does it contain production data, credentials, integrations, original prompts, or original source. All records are synthetic.

## Local run

```bash
npm run dev
```

Then open the local address shown in the terminal.

## Validation

```bash
npm test
```

## Documentation

- [Original project context](docs/original-project-context.md)
- [Safety model](docs/safety-model.md)
- [Automation rules](docs/automation-rules.md)

## Technology

TypeScript, React, Next.js-compatible Vinext, and CSS. The public version intentionally has no live ServiceNow dependency.
