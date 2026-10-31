# npm and native-host acceptance: 0.3.6

Verification date: 2026-10-31. The 0.3.5 candidate at 92ec700339f14e19aa91b846b0b9d679a320515d / contribution b87d18b1f927486b30094f4ecafaa2a92de8e0ce passed preflight but failed its repeated release gate on macOS Node owner-open EINVAL. Its tag is retained unpublished. 0.3.6 removes the incorrect Bun-only guard, retaining exact-path/syscall/deadline and ownership checks; concurrently committed English model-facing prompts are preserved. This report follows the [failed 0.3.4 live acceptance](NPM-LIVE-0.3.4.md); it does not replace or erase that failure.

## Changes and existing checks

Matching complete records now remain available when their causal chains exceed the memory allowance. The omission notice distinguishes host reading from text actually supplied to the answering agent. Full policy still reads every new turn and is injected once per conversation, then again only on change.

Trivial writes carry a neutral turn source marker. Aggregate daily write output is removed before model disclosure. Known current-turn diary show uses bounded diary-search and diary-fragment, with exact full-body, source/version and Unicode-range/overlap checks. The model receives only this turn's body and complete locators. Incomplete, unsupported, stale or oversized verification is unconfirmed; there is no whole-diary fallback or automatic write replay. A new write cannot overwrite an unverified diary; partial IDs are rejected before show. Raw capture uses the same verifier and can remain unconfirmed when its full body exceeds the bounded fragment allowance.

The existing checks now include a shared daily ID containing unrelated content, aggregate write-output privacy, overlapping Unicode fragments, source-only incomplete readback, write/readback ordering and short-versus-over-budget raw capture. No new test file or dependency was added. Node and the Bun-discovered adapter pass locally, as does the community package adapter.

- [Final three-OS preflight](https://github.com/risense-ai/respire-magpie/actions/runs/41201290156): Windows/Linux/macOS, Node 24 and Bun 1.3.6, PASS for the 0.3.5 candidate; superseded by its later failed release gate.
- [0.3.5 repeated release verification](https://github.com/risense-ai/respire-magpie/actions/runs/41201489206): failed on macOS owner-open EINVAL; no npm publication or release assets.
- [Supplemental community validation at the 0.3.5 contribution head](https://github.com/risense-ai/respire-magpie/actions/runs/41201381216): PASS; does not replace community workflow approval.

A local earlier run exposed Windows EBUSY/unlink on the exact legacy PID-file lock path. The narrow repair waits within the existing deadline and re-probes ownership. A later raw-capture fixture initially created its control before its job timestamp and correctly expired; the fixture now uses one acceptance timestamp, without relaxing production lease checks. Both failures are retained in the repair history.

## Real Runtime candidate probes

Before publication, the new helper wrote a short process diary through the existing unlocked Runtime and exactly read it back using two overlapping versioned fragments. Only the current written body and locators were returned; no whole-source show was used. A separate read-only hook probe against the real Runtime included the previously lost test fact and explicitly marked its oversized chain omitted. These are real protocol observations of the candidate, not acceptance of an installed npm package.

## npm/native-host acceptance

Pending at this report checkpoint. The intended acceptance uses Magpie's own npm installer in a separate XDG configuration/cache, the existing Runtime and a credential-free forwarding provider through the existing gateway/model. Loopback observers forward actual responses and record only safe request/receipt metadata. Normal and independent recall turns must return the previously stored test values and exact actual record ID, without including expected values in the user question. An ordinary follow-up must write and exactly verify its own process diary without creating a new long-term conclusion.

The user explicitly authorized enabling automatic reads/writes for all eligible main-gateway conversations after isolated acceptance. The final main-gateway state and actual smoke result will be recorded only after execution.

## Remaining boundaries

The completion notification runs after the answer. Before-send persistence remains unsupported. The live model procedure uses Chat Completions; four-adapter fixture success is not live all-protocol acceptance. Native desktop rendering, exhaustive crash/account-switch/load qualification and community approval/merge remain separate. Previously accepted work can continue within its five-minute control lease; an accepted write cannot be revoked. Mixing legacy PID-file writers still inherits their check/unlink race. Large raw-capture bodies can exceed the bounded fragment verification capability and must not be represented as successfully verified.
