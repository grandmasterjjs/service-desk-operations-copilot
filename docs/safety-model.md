# Safety model

The demo intentionally models a safer modern design than a direct chatbot-to-ticketing connection.

1. The data adapter is read-only by default.
2. Rules and AI analysis can identify, explain, and draft an action, but cannot take one alone.
3. A named reviewer approves an action before any write adapter could run.
4. Each approved action creates an audit record containing the source incidents, proposed action, reviewer, and time.
5. Destructive flows such as stale-ticket closure start as dry runs and require a separate approval path.

In a real deployment, credentials belong in an approved secret store, service accounts are least-privilege and assignment-group scoped, and notification destinations are tested before enabling scheduled jobs.
