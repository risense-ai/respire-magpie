# npm installation and live acceptance: 0.3.4

Verification date: 2026-10-31. This report distinguishes published artifacts, isolated fixtures, real native-host execution and the final main-gateway configuration. The user authorized npm replacement, real test writes, repairs and enabling automatic reads/writes on the main gateway.

## Repair and release evidence

- Upstream runtime tag v0.3.4: 0be29f2027d10bfdc6fb0952292ff1be6de241b2.
- Community PR 553 head: ca4aece0f52ec02b1584d9533bca5bd21f0d080d.
- [Final three-OS preflight](https://github.com/risense-ai/respire-magpie/actions/runs/41197576586): PASS on Windows/Linux/macOS, Node 24 and Bun 1.3.6.
- [Release verification, GitHub Release and npm OIDC publication](https://github.com/risense-ai/respire-magpie/actions/runs/41197720730): PASS.
- [Final-head supplemental community validation](https://github.com/risense-ai/respire-magpie/actions/runs/41197648000): 4193 pass, 3 skip, 0 fail, 4196 tests across 328 files. Root shape and package dry-run pass. This upstream-hosted run does not substitute for community workflow approval.
- [Initial preflight failure](https://github.com/risense-ai/respire-magpie/actions/runs/41197398772): Windows Bun mkdir EPERM during existing lock contention checks. The exact-path/syscall repair uses the existing deadline before ownership; sole-owner verification is unchanged. Linux/macOS passed that candidate. No unchanged failing candidate was released.

Every new turn still reads the complete policy. Identical rules/policy are injected once per conversation and again only on change. The ineffective injectRules setting is removed; failures leave the latest turn unchanged instead of adding transient history. Existing four-protocol checks cover five-turn growth, resets, changes/reversion and byte-identical prefixes. Old cached blocks are retained rather than silently rewriting existing histories.

## Live procedure

An independent instance of the actual installed Magpie executable uses a separate XDG configuration/cache and loopback port. It installs the public npm package through Magpie's own plugin command. A credential-free provider forwards through the already configured local gateway; no provider credentials are read or copied. The existing Respire Runtime/account are reused without lifecycle changes. Capture remains off.

Loopback observers forward real requests, without replacing Runtime/model responses. They record command names/statuses, policy hashes/byte counts, policy-block counts, selected IDs and read receipts, not full private policies, histories or credentials. The model-side observer checks that the exact policy returned by the real Runtime occurs in the actual forwarded request. Native-host records and encrypted worker receipts provide separate evidence for completion and write/readback.

The planned probes are: explicit benign test fact plus process diary; an ordinary follow-up without a new long-term fact; and a fresh request recalling the fact without including its expected values. Real results and final main-gateway state are recorded below only after execution.

## Observed results and failed acceptance

Public latest became 0.3.4 after registry propagation. Magpie's installer installed @rsrsai/magpie@latest in the independent configuration; 27 package/runtime/asset files matched v0.3.4 Git blobs byte-for-byte. A separate public npm install and audit signatures verified one registry signature and one provenance attestation.

- J: explicit benign test fact was stored under the requested existing parent/project, along with a process diary. The worker completed with both returned IDs read back; an independent read confirmed the fact and parent.
- K: an ordinary follow-up, with no new long-term fact, completed with a process diary write/readback.
- L: **FAIL**. The fresh conversation answered not found, although the fact existed. The selected record's causal chain was 12,268 bytes; adding it exceeded the 12,000-byte memory allowance and the implementation dropped the entire matching record. This is a plugin injection-budget bug, not proof that the Runtime failed to store the fact. Its completed archival receipt does not make the foreground answer correct.

Every real foreground turn had a recall/policy read receipt; the two-turn conversation retained one policy block. Stored durable turn blocks contain the exact complete real Runtime policy (44,429 bytes), verified against a separate real prompt result. The forwarding observer confirmed exact complete text for the first two requests; its whole-string check did not match on the fresh request, so exact forwarded equality for that request is not claimed.

The actual Runtime aggregates trivial writes into a shared daily source. Consequently, the old show-by-ID check exposes the day's other entries and proves only that the aggregate exists; it is insufficient proof of this turn's diary. A bounded fragment verification repair is being investigated. The main gateway has not yet been switched or enabled. This report deliberately does not call 0.3.4 live acceptance complete.

## Limits

Completion notifications arrive after the answer; before-send persistence remains unavailable. Fixtures cover four adapters, while this live procedure uses Chat Completions. Native desktop rendering, exhaustive crash/account-switch/load recovery and community approval/merge are not implied by these results. The configured generation service receives turn/tool evidence and related memory and consumes quota.
