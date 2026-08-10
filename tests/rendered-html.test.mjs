import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("documents the public-safe and approval-gated product contract", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Synthetic demo/);
  assert.match(page, /Human approval required/);
  assert.match(page, /Approve proposed action/);
  assert.match(page, /Production integrations remain disabled by default/);
  assert.match(page, /Queue triage/);
  assert.match(page, /New-hire watch/);
  assert.match(page, /Stale-ticket policy/);
});

test("keeps the demo records explicitly synthetic", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /INC-SYN-1042/);
  assert.match(page, /No employer data, credentials, or production integrations included/);
});
