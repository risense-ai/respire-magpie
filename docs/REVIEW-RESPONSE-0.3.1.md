# Magpie PR 553 review repair report

## v0.3.4 follow-up to review 5722498530

The reviewer accepted the fresh per-request identity check and display name, and independently reported 4187 passing community tests, 9 skipped, 0 failures at 10184ce. Two remaining blockers concerned repeated policy text and the ineffective injectRules option.

- Every newly observed turn still calls recall and reads the complete Runtime policy. A policy hash is persisted with each turn; the full rules/policy block is supplied on the first turn and whenever the policy changes. Unchanged policy remains in its original historical position. Per-turn blocks carry memories and actual read receipts. No mandatory read or automatic process-diary requirement is removed.
- injectRules is removed from the manifest, validated options, configuration examples and checks. Stale configuration keys are ignored, as other unknown keys are; they cannot disable mandatory policy reads.
- Failed recall/policy reads report failure through the host without adding an unsaved message to the latest turn. Successfully restored earlier prefixes remain intact.
- The community registry entry follows its neighbours' multi-line formatting.

The existing checks now exercise five consecutive turns, host resets, policy changes, unchanged follow-up and policy reversion across Chat, Responses, Anthropic and Gemini. They verify one copy of unchanged policy, a new copy only on change, one actual recall/prompt per new turn, and byte-identical historical prefixes. Node and the Bun-discovered adapter pass locally on Windows. CI and live npm acceptance will be recorded separately after execution; these local fixtures are not live deployment evidence.

The first 0.3.4 preflight [41197398772](https://github.com/risense-ai/respire-magpie/actions/runs/41197398772) passed Linux/macOS but failed the Windows Bun-discovered adapter during the existing 64-increment contention check: mkdir returned EPERM on the exact lock directory. Windows can retain a released directory in delete-pending state. Acquisition now retries that exact syscall/path within the existing deadline, before ownership; sole-owner verification and unknown-write protection are unchanged. The failed candidate is retained as evidence rather than rerun unchanged.

This responds to the review of community head 40fec72. It is an upstream engineering report, not a claim that community CI has approved this package. The community package links upstream reports rather than shipping copies as its own evidence.

The first repair candidate, v0.3.1, failed Windows CI with a transient EPERM while removing an empty lock directory under concurrent access. Its tag is retained and no release assets were published. The follow-up candidate is v0.3.2, with bounded Windows cleanup retries. It also corrects a separate empty-recall bug: hiding display hints must not discard the complete engine policy. The existing checks now cover empty recall with hints off across all four adapters.

The first v0.3.2 main-branch CI run passed macOS/Linux but exposed a separate fixture error on Windows: the final pending-write probe reused a 20-second abort signal created before 512 fsynced capacity records. RPC already has its own per-request deadline. The fixture now uses that deadline for independent calls and a fresh signal for its segmented model operation; production request deadlines are unchanged.

## Review disposition

| Point | Changes / disposition |
| --- | --- |
| 1: tests not discovered by CI | A respire-memory.test.mjs Bun adapter runs the existing behavioral checks. Checks bootstrap a fresh temporary HOME, reject a non-temporary test HOME, use os.tmpdir() and remove their state. The Bun path no longer requires an external node command. Upstream CI also runs the adapter |
| 2: completed jobs exhaust capacity; indefinite raw evidence | The 512 cap counts queued/running jobs only. Terminal raw evidence expires after 24 hours; completed receipts and ordinary turn/session caches after seven days. Compact unknown-write markers remain without old raw bodies. Cleanup is lazy on foreground maintenance/worker startup; it cannot run while the host is closed. Library memories are not deleted by local-state cleanup |
| 3: stale/live locks and false failure after successful writes | Shared PID ownership locks recover only proven-dead owners; live contention waits up to five seconds. Four real child processes compete in the checks. Unknown owners in older empty locks still require operator review. Session-notification failure is recorded separately and does not turn verified writes into an unconfirmed write |
| 4: worker per request | A host performs at most one startup recovery scan per state directory, spawning only if active work exists. Newly enqueued work wakes a worker; duplicate jobs do not. No empty worker is spawned for unconfigured archival |
| 5: hot-path writes / unbounded turn state | Controls are persisted only when the configuration signature changes or the heartbeat is due. Foreground requests no longer create a session record merely to set rulesSent. Turn/session state expires. **Account-identity TTL caching was deliberately not adopted:** without a Runtime account-revision binding, it creates a switch-account window in which old-library cache contents can be reused. Fresh account checks remain a safety boundary |
| 6: unstable history after restart/options | Earlier turns, including a current tool continuation, restore their exact block from durable records after reset. Keys include only recall-affecting options plus conversation identity. Existing older whole-options-hash records cannot safely be guessed into the new scheme; an upgrade may cause a one-time cache-prefix change |
| 7: generated host names and stale UAs | New stored provenance is neutral, and Runtime/generation UAs are neutral and version-independent. Generated policy adapters no longer name the host. Actual user/history content and the complete engine policy are not falsified or scrubbed of factual project names |
| 8: provenance repository metadata | Community repository.url points to magpie-community/plugins, with directory=packages/respire-memory. Homepage/bugs remain upstream |
| 9: default output changes | Memory/Used hints default off. **Per-turn policy reads and automatic diary archival remain enabled as the explicit product contract requested by the user.** Empty recall does not disable those requirements. Archival needs generation configuration; without it, incomplete setup is disclosed and raw turns are not queued. Turning policy off by default would contradict the requested behavior |
| 10: detached work after disable | Jobs/control leases are bounded to five minutes from acceptance, configuration signatures must match, and account/mode/control are checked before new generation/write calls. Expired work does not call the model. Disable/uninstall without another hook invocation is not an immediate notification; accepted work can continue within the bound, and an accepted write cannot be revoked |
| 11: community README / upstream reports | Community README is rewritten around its actual package, CI entry, monorepo dist/provenance and limitations. Personal paths and upstream release-workflow instructions are removed. Upstream reports are linked and explicitly labeled, not packaged as community CI evidence |
| 12: placement / name | Entry/README row moved after the existing memory-hook entries. The requested product/display name respire-memory is retained rather than renamed to Respire |

## v0.3.2 verification (historical)

- [Three-OS upstream CI at 1a080fb](https://github.com/risense-ai/respire-magpie/actions/runs/41192351640): Windows, Linux and macOS passed with Node 24 and Bun 1.3.6, including the discovered adapter and package dry-run.
- [Supplemental community compatibility run](https://github.com/risense-ai/respire-magpie/actions/runs/41192352925) checked out community contribution **df58d566b9ddca3aaced1b490035e0a26468a554** on Linux: **4193 pass, 3 skip, 0 fail**, 4196 tests across 328 files; root checks and the 22-file package dry-run passed. The package's adapter was discovered and passed within the full suite.
- These are upstream-hosted runs. Community PR CI still requires maintainer approval; this report does not replace that approval or claim the PR has merged. The failed earlier Windows runs remain visible and documented above.

### Local verification details

Windows; Node 26.13.0; host Bun 1.4.4. The existing checks pass under Node and via the Bun-discovered test adapter. A separate empty-PATH run of the adapter passed after removing its external-node dependency.

The checks now include real cross-process lock contention, known-dead legacy/new lock recovery, live contention, notification failure after verified storage, 512 completed jobs versus active capacity, evidence/receipt expiry without resetting the retention clock, retained unknown-write markers, stale/changed controls, stopping before the next generation after disable, exact durable history restoration and neutral User-Agent headers. Four-protocol, policy ordering, diary/readback, encryption and unknown-write no-retry checks remain.

An initial **full community suite** run on Windows reported **4100 pass, 28 skip, 56 fail and 2 errors** across 328 files. One failure was this package's now-fixed external-node/PATH dependency; the adapter subsequently passed without PATH. Other failures were reported in other packages and were not individually diagnosed or modified here. The final full community suite is **not claimed green**; community CI still needs its actual execution/approval. A successful upstream package CI is separate evidence.

## Live acceptance and privacy

A native local gateway request using the existing real model returned the required short reply. Its detached archival stored and read back the process diary and completed with **5 restricted calls**. This validates the revised locks/control lease in the ordinary-turn path; it is not a live reboot, days-long retention or exhaustive concurrency qualification.

Temporary enabling applies to the entire local gateway. Another live session also passed through it during the probe. The original disabled state/options were restored, the private test control lease was revoked, and the unrelated raw copy in this project's verification state was removed. That session's engine memories were not modified. No unrelated session content or IDs are published in this report.

## Follow-up found during npm publication

The v0.3.3 preflight at 4fc5411 exposed another Windows acquisition race: an owner-file open returned EPERM when empty-directory recovery removed the just-created directory before ownership was published. An earlier main-branch run at 96fd8da also failed at that path, although its separate release verification passed. The passing v0.3.2 runs above therefore did not establish absence of this intermittent failure.

The stronger check also exposed Windows scandir EPERM during a recovery probe while a competing release removed the directory. v0.3.3 retries those acquisition-only open/probe failures within the existing deadline; it never enters a critical section without verifying sole ownership. The existing eight-writer check now runs eight batches and verifies all 64 increments. Permanent failures still terminate; unknown/live owners and uncertain writes are not deleted or replayed. npm distribution first published v0.3.2 using Chrome-confirmed authentication; the next patch is used to validate the browser-configured OIDC connection.

At 7f170e2, Windows passed, while macOS Bun 1.3.6 reported EINVAL on owner-file open in the four-process contention probe. The same bounded owner-publication retry now includes that observed macOS Bun error. No failed check was skipped or replaced by a same-code rerun.

### Remaining host limits

The [v0.3.3 publication acceptance](NPM-PUBLISH-0.3.3.md) records the final passing three-OS and updated full-community runs, public npm install/signature/attestation verification, and the Chrome-configured OIDC connection showing Valid. The earlier failures above remain part of this report.

The engine's strict before-send persistence requirement still needs an appropriate host callback or a client-owned loop: the current notification is after reply completion. Native desktop rendering, live all-protocol sessions, exhaustive crash/power-loss/account-switch recovery and marketplace approval remain outside the proven result. See the [feature matrix](FEATURES.md) and [0.3.0 correction report](TEST-REPORT-0.3.0.md).
