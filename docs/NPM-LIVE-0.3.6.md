# npm and native-host acceptance: 0.3.6

**Result: PASS for the scoped npm/native Chat acceptance.** Public latest is 0.3.6. Runtime artifact: b24114143ef55e8e89b6d945d8478250447d5ff2; exact community contribution: 7aba754db7c67c0dcf884793d84a82437e3f18ed. Main-gateway npm installation is enabled with the user's explicit authorization for eligible conversations. PR 553 is still open and awaiting review; this is not community installation/merge acceptance.

Verification date: 2026-10-31. The 0.3.5 candidate at 92ec700339f14e19aa91b846b0b9d679a320515d / contribution b87d18b1f927486b30094f4ecafaa2a92de8e0ce passed preflight but failed its repeated release gate on macOS Node owner-open EINVAL. Its tag is retained unpublished. 0.3.6 removes the incorrect Bun-only guard, retaining exact-path/syscall/deadline and ownership checks; concurrently committed English model-facing prompts are preserved. This report follows the [failed 0.3.4 live acceptance](NPM-LIVE-0.3.4.md); it does not replace or erase that failure.

## Changes and existing checks

Matching complete records now remain available when their causal chains exceed the memory allowance. The omission notice distinguishes host reading from text actually supplied to the answering agent. Full policy still reads every new turn and is injected once per conversation, then again only on change.

Trivial writes carry a neutral turn source marker. Aggregate daily write output is removed before model disclosure. Known current-turn diary show uses bounded diary-search and diary-fragment, with exact full-body, source/version and Unicode-range/overlap checks. The model receives only this turn's body and complete locators. Incomplete, unsupported, stale or oversized verification is unconfirmed; there is no whole-diary fallback or automatic write replay. A new write cannot overwrite an unverified diary; partial IDs are rejected before show. Raw capture uses the same verifier and can remain unconfirmed when its full body exceeds the bounded fragment allowance.

The existing checks now include a shared daily ID containing unrelated content, aggregate write-output privacy, overlapping Unicode fragments, source-only incomplete readback, write/readback ordering and short-versus-over-budget raw capture. No new test file or dependency was added. Node and the Bun-discovered adapter pass locally, as does the community package adapter.

- [Final three-OS preflight](https://github.com/risense-ai/respire-magpie/actions/runs/41201290156): Windows/Linux/macOS, Node 24 and Bun 1.3.6, PASS for the 0.3.5 candidate; superseded by its later failed release gate.
- [0.3.5 repeated release verification](https://github.com/risense-ai/respire-magpie/actions/runs/41201489206): failed on macOS owner-open EINVAL; no npm publication or release assets.
- [Supplemental community validation at the 0.3.5 contribution head](https://github.com/risense-ai/respire-magpie/actions/runs/41201381216): PASS; does not replace community workflow approval.

Final 0.3.6 evidence supersedes those candidates:

- [Three-OS preflight at b241141](https://github.com/risense-ai/respire-magpie/actions/runs/41202128290): PASS, Windows/Linux/macOS, Node 24 and Bun 1.3.6.
- [Repeated release verification, GitHub Release and npm OIDC](https://github.com/risense-ai/respire-magpie/actions/runs/41202277989): all PASS. Provenance [transparency entry](https://search.sigstore.dev/?logIndex=3614005576).
- [Exact contribution 7aba754 full community validation](https://github.com/risense-ai/respire-magpie/actions/runs/41202129801): 4193 pass, 3 skip, 0 fail; 4196 tests/328 files. Root checks and package dry-run pass. This does not replace maintainer approval of community CI.

A local earlier run exposed Windows EBUSY/unlink on the exact legacy PID-file lock path. The narrow repair waits within the existing deadline and re-probes ownership. A later raw-capture fixture initially created its control before its job timestamp and correctly expired; the fixture now uses one acceptance timestamp, without relaxing production lease checks. Both failures are retained in the repair history.

## Real Runtime candidate probes

Before publication, the new helper wrote a short process diary through the existing unlocked Runtime and exactly read it back using two overlapping versioned fragments. Only the current written body and locators were returned; no whole-source show was used. A separate read-only hook probe against the real Runtime included the previously lost test fact and explicitly marked its oversized chain omitted. These are real protocol observations of the candidate, not acceptance of an installed npm package.

## npm/native-host acceptance

Magpie's own installer updated the public npm package in a separate XDG configuration/cache. The existing Runtime and a credential-free forwarding provider reused the existing local gateway/model, workbuddy-ai/deepseek-v4.1-flash. No private provider credentials were read/copied, no Runtime/account lifecycle change was performed, and raw capture stayed off. Loopback observers forwarded actual responses and saved safe request/receipt metadata rather than private policy/history content.

A separate public npm install followed by npm audit signatures verified **one registry signature and one provenance attestation**. All **29** packaged files in both the isolated native installation and final main installation matched raw v0.3.6 Git blobs byte-for-byte.

| Real native probe | Observed result |
| --- | --- |
| R: independent recall | Returned the previously stored test colour, number and exact actual record ID; the question did not include expected values. Automatic process diary completed with exact fragment readback, 6 logical restricted calls |
| S: ordinary follow-up | Returned 收到。; no new long-term fact was written. This turn's process diary completed with exact fragment readback, 5 logical restricted calls |
| T: fresh conversation | Independently returned the same correct values and actual ID; its own process diary completed with exact fragment readback, 8 logical restricted calls |
| Complete policy/read gate | All three forwarded foreground requests contained the exact complete real Runtime policy, **44,429 bytes**, SHA-256 bb406353ee294e2793c08c50396aeadca89d7a62aab656e260392d9615ed5fc9. Each new turn had actual recall/prompt reads. The two-turn R/S history contained one full policy block, not two |
| Background policy | All 15 observed archival model requests carried the same complete policy in the actual startup/tool payload |
| Diary disclosure/readback | No whole daily-source show occurred. All three jobs used bounded search/fragment reads, verified the exact full written body and source/version/Unicode ranges, and passed only the current body and full locators to the model. The observed bodies were 184, 120 and 186 Unicode characters, with two locators each |

The main installation then replaced the old local-directory record with **@rsrsai/magpie@latest**, resolved to 0.3.6, and was enabled. Original options were preserved except removal of dead injectRules; the other three plugin records were unchanged. A direct main-gateway request returned HTTP 200 and 验收收到。; its automatic diary completed with exact fragment verification, 7 logical restricted calls. The main turn's durable context also contained the exact full 44,429-byte policy returned by an independent Runtime prompt read.

Scripts, source/job IDs, locators, responses and assertions remain private in ignored .verification/npm-live under the user-migrated repository. The main gateway stays enabled as explicitly requested. Only the temporary verification native host and observers were stopped. These are maintainer observations of a private installation; public CI and provenance are independently inspectable.

## Remaining boundaries

### Actual npm UI follow-up

The installed 0.3.6 package was subsequently opened through the actual Magpie web frontend, using its temporary loopback-only UI server. In the in-app browser, the sidebar and settings-page header displayed the Respire icon and respire-memory name, and the page displayed the agent self-evolution description. The installed-package list displayed the same icon, @rsrsai/magpie v0.3.6 and its enabled state. The list uses the npm package identifier; the page/sidebar use the configured display name. No options, theme, account, gateway enablement or browser-extension settings were changed during this inspection.

The first Chrome attempt loaded the settings page but was then replaced by Magpie's page-error panel: Failed to connect to MetaMask. The captured console stack points to the MetaMask extension's chrome-extension inpage.js and Magpie's plugin-page error handler. The same page rendered normally in the in-app browser. This establishes a Chrome-extension interference case, not a successful Chrome page acceptance or a native desktop-window acceptance. The browser extensions and host error handler were not modified. Private screenshots and the error trace are retained under .verification/npm-live/icon036-*; no temporary web sign-in key is included here.

The completion notification runs after the answer. Before-send persistence remains unsupported. The live model procedure uses Chat Completions; four-adapter fixture success is not live all-protocol acceptance. Native desktop rendering, exhaustive crash/account-switch/load qualification and community approval/merge remain separate. Previously accepted work can continue within its five-minute control lease; an accepted write cannot be revoked. Mixing legacy PID-file writers still inherits their check/unlink race. Large raw-capture bodies can exceed the bounded fragment verification capability and must not be represented as successfully verified.
