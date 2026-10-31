# Magpie PR 553 review repair report

This responds to the review of community head 40fec72. It is an upstream engineering report, not a claim that community CI has approved this package. The community package links upstream reports rather than shipping copies as its own evidence.

The first repair candidate, v0.3.1, failed Windows CI with a transient EPERM while removing an empty lock directory under concurrent access. Its tag is retained and no release assets were published. The follow-up candidate is v0.3.2, with bounded Windows cleanup retries. It also corrects a separate empty-recall bug: hiding display hints must not discard the complete engine policy. The existing checks now cover empty recall with hints off across all four adapters.

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

## Local verification

Windows; Node 26.13.0; host Bun 1.4.4. The existing checks pass under Node and via the Bun-discovered test adapter. A separate empty-PATH run of the adapter passed after removing its external-node dependency.

The checks now include real cross-process lock contention, known-dead legacy/new lock recovery, live contention, notification failure after verified storage, 512 completed jobs versus active capacity, evidence/receipt expiry without resetting the retention clock, retained unknown-write markers, stale/changed controls, stopping before the next generation after disable, exact durable history restoration and neutral User-Agent headers. Four-protocol, policy ordering, diary/readback, encryption and unknown-write no-retry checks remain.

An initial **full community suite** run on Windows reported **4100 pass, 28 skip, 56 fail and 2 errors** across 328 files. One failure was this package's now-fixed external-node/PATH dependency; the adapter subsequently passed without PATH. Other failures were reported in other packages and were not individually diagnosed or modified here. The final full community suite is **not claimed green**; community CI still needs its actual execution/approval. A successful upstream package CI is separate evidence.

## Live acceptance and privacy

A native local gateway request using the existing real model returned the required short reply. Its detached archival stored and read back the process diary and completed with **5 restricted calls**. This validates the revised locks/control lease in the ordinary-turn path; it is not a live reboot, days-long retention or exhaustive concurrency qualification.

Temporary enabling applies to the entire local gateway. Another live session also passed through it during the probe. The original disabled state/options were restored, the private test control lease was revoked, and the unrelated raw copy in this project's verification state was removed. That session's engine memories were not modified. No unrelated session content or IDs are published in this report.

## Still not fulfilled

The engine's strict before-send persistence requirement still needs an appropriate host callback or a client-owned loop: the current notification is after reply completion. Native desktop rendering, live all-protocol sessions, exhaustive crash/power-loss/account-switch recovery, npm first publication and marketplace approval remain outside the proven result. See the [feature matrix](FEATURES.md) and [0.3.0 correction report](TEST-REPORT-0.3.0.md).
