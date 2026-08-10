# Automation rules represented in the demo

## Queue triage

Flag an unassigned ticket when it has no recorded follow-up and indicates a work stoppage or security risk. Ignore routine volume, scheduled maintenance, and work already assigned or actively scheduled.

## New-hire watch

For each upcoming starter, correlate an account request and a hardware request. Flag a missing or unassigned request, with same-day starts treated as critical.

## Monday readiness brief

Summarize onboarding risk, work-stoppage and security triage, total/unassigned/stale counts, and human communications requiring attention.

## Stale-ticket policy

At approximately 23 days in `Awaiting user`, prepare a warning. At approximately 30 days, prepare a closure candidate only if the ticket remains inactive. Exclude termination and intentionally deferred work. The demo remains dry-run only.
