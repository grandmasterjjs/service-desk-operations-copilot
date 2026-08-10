"use client";

import { useMemo, useState } from "react";

type Incident = {
  id: string;
  title: string;
  requester: string;
  priority: "P1" | "P2" | "P3" | "P4";
  ageHours: number;
  state: "New" | "Awaiting user" | "In progress";
  risk: "Work stoppage" | "Security" | "Onboarding" | "Routine";
  detail: string;
};

const incidents: Incident[] = [
  { id: "INC-SYN-1042", title: "Laptop will not boot after update", requester: "Maya Patel", priority: "P2", ageHours: 33, state: "New", risk: "Work stoppage", detail: "User cannot access dispatch tools. No owner or follow-up is recorded." },
  { id: "INC-SYN-1047", title: "New starter: hardware request missing", requester: "Jordan Kim", priority: "P2", ageHours: 18, state: "New", risk: "Onboarding", detail: "Account request exists. Matching hardware request is missing for a start date tomorrow." },
  { id: "INC-SYN-1051", title: "Suspicious sign-in notification", requester: "Security Operations", priority: "P2", ageHours: 7, state: "New", risk: "Security", detail: "User-reported sign-in alert has no recorded acknowledgement." },
  { id: "INC-SYN-1056", title: "Microsoft 365 license request", requester: "Avery Brooks", priority: "P3", ageHours: 5, state: "New", risk: "Routine", detail: "Standard software request; no work-stoppage indicators." },
  { id: "INC-SYN-1031", title: "Monitor replacement", requester: "Casey Nguyen", priority: "P3", ageHours: 27, state: "Awaiting user", risk: "Routine", detail: "Awaiting delivery details. The policy simulator will not close this item yet." },
];

const automationRuns = [
  { name: "Queue triage", cadence: "Weekdays · 8:00 AM", result: "3 actionable risks", tone: "risk" },
  { name: "New-hire watch", cadence: "Weekdays · 8:15 AM", result: "1 missing hardware request", tone: "warning" },
  { name: "Monday readiness brief", cadence: "Mondays · 7:30 AM", result: "Ready to generate", tone: "neutral" },
  { name: "Stale-ticket policy", cadence: "Fridays · dry run", result: "0 closure candidates", tone: "neutral" },
];

function priorityClass(priority: Incident["priority"]) {
  return priority === "P1" || priority === "P2" ? "priority high" : "priority";
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(incidents[0].id);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All risk types");
  const [proposal, setProposal] = useState("Assign to Desktop Support and add a factual work note.");
  const [approved, setApproved] = useState(false);
  const [analystQuestion, setAnalystQuestion] = useState("How many unassigned tickets require attention?");

  const selected = incidents.find((incident) => incident.id === selectedId) ?? incidents[0];
  const filtered = useMemo(() => incidents.filter((incident) => {
    const matchesFilter = filter === "All risk types" || incident.risk === filter;
    const term = query.toLowerCase();
    const matchesSearch = !term || [incident.id, incident.title, incident.requester].join(" ").toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  }), [filter, query]);

  const analystResponse = analystQuestion.toLowerCase().includes("unassigned")
    ? "Four synthetic incidents are unassigned. Three meet the escalation threshold: one work stoppage, one security item, and one incomplete onboarding request."
    : "The analyst is grounded only in the synthetic incident data included with this demo. Ask about risk, onboarding, stale tickets, or queue counts.";

  return (
    <main>
      <header className="topbar">
        <div className="brand"><span className="brand-mark">SD</span><span>Service Desk Operations Copilot</span></div>
        <div className="topbar-right"><span className="demo-chip">Synthetic demo</span><span className="live-dot">Human approval required</span></div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">AI-assisted service delivery · portfolio reconstruction</p>
          <h1>Find what the queue is hiding.</h1>
          <p className="hero-copy">A public-safe reconstruction of a ServiceNow operations prototype: identify real risk, propose the next action, and leave the final decision with a human.</p>
        </div>
        <div className="safety-card"><span className="safety-icon">✓</span><div><strong>Safe by design</strong><p>Read-only data · synthetic records · approvals before writes</p></div></div>
      </section>

      <section className="metrics" aria-label="Queue summary">
        <article><span>Unassigned queue</span><strong>4</strong><small>synthetic incidents</small></article>
        <article><span>Actionable risk</span><strong className="red">3</strong><small>needs human attention</small></article>
        <article><span>Onboarding gaps</span><strong className="amber">1</strong><small>hardware request missing</small></article>
        <article><span>Stale candidates</span><strong>0</strong><small>dry run only</small></article>
      </section>

      <section className="workspace">
        <div className="panel queue-panel">
          <div className="panel-heading"><div><p className="eyebrow">Operations view</p><h2>Unassigned queue</h2></div><span className="count">{filtered.length} shown</span></div>
          <div className="filters"><input aria-label="Search synthetic incidents" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search incident or requester" /><select aria-label="Filter by risk type" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All risk types</option><option>Work stoppage</option><option>Security</option><option>Onboarding</option><option>Routine</option></select></div>
          <div className="incident-list">
            {filtered.map((incident) => <button key={incident.id} className={`incident ${incident.id === selectedId ? "selected" : ""}`} onClick={() => { setSelectedId(incident.id); setApproved(false); }}><div className="incident-row"><span className={priorityClass(incident.priority)}>{incident.priority}</span><strong>{incident.id}</strong><span className={`risk ${incident.risk.toLowerCase().replace(" ", "-")}`}>{incident.risk}</span></div><b>{incident.title}</b><small>{incident.requester} · {incident.ageHours}h old · {incident.state}</small></button>)}
          </div>
        </div>

        <aside className="panel detail-panel">
          <div className="panel-heading"><div><p className="eyebrow">Review before action</p><h2>{selected.id}</h2></div><span className={priorityClass(selected.priority)}>{selected.priority}</span></div>
          <h3>{selected.title}</h3><p className="detail-copy">{selected.detail}</p>
          <div className="signal"><span>Escalation signal</span><strong>{selected.risk}</strong><p>Rule-based flag with source context. AI can explain or draft; it cannot write unaided.</p></div>
          <label htmlFor="proposal">Proposed action</label><textarea id="proposal" value={proposal} onChange={(event) => setProposal(event.target.value)} />
          <button className={`approve ${approved ? "approved" : ""}`} onClick={() => setApproved(true)}>{approved ? "Approved — audit entry created" : "Approve proposed action"}</button>
          <p className="audit-copy">Demo behavior only. Production integrations remain disabled by default.</p>
        </aside>
      </section>

      <section className="lower-grid">
        <article className="panel analyst-panel"><div className="panel-heading"><div><p className="eyebrow">Grounded analyst</p><h2>Ask the queue</h2></div><span className="read-only">Read-only</span></div><label htmlFor="analyst-question">Question</label><div className="ask-row"><input id="analyst-question" value={analystQuestion} onChange={(event) => setAnalystQuestion(event.target.value)} /><button onClick={() => setAnalystQuestion(analystQuestion)}>Analyze</button></div><div className="answer"><span>Answer</span><p>{analystResponse}</p><small>Evidence: {incidents.filter((incident) => incident.risk !== "Routine").map((incident) => incident.id).join(" · ")}</small></div></article>
        <article className="panel automations-panel"><div className="panel-heading"><div><p className="eyebrow">Scheduled operations</p><h2>Automation simulations</h2></div><span className="count">4 jobs</span></div><div className="automation-list">{automationRuns.map((run) => <div className="automation" key={run.name}><div><strong>{run.name}</strong><small>{run.cadence}</small></div><span className={`run ${run.tone}`}>{run.result}</span></div>)}</div></article>
      </section>

      <section className="proof"><div><p className="eyebrow">What this demonstrates</p><h2>Operational intelligence with guardrails.</h2></div><div className="proof-items"><span>Queue triage</span><span>Onboarding correlation</span><span>Dry-run policy design</span><span>Auditable approval</span></div></section>
      <footer>Clean-room portfolio reconstruction · No employer data, credentials, or production integrations included.</footer>
    </main>
  );
}
