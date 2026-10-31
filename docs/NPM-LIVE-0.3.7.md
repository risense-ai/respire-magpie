# Source-marker readback follow-up: 0.3.7

On 2026-10-31, the PR monitor's process diary write returned a valid ID, but 0.3.6 readback rejected its Runtime result with diary-output-too-large. A read-only inspection observed hybrid semantic_ready=true and 4,033 Unicode characters in details despite max_chars=4000. The matching source and unrelated semantic matches were both present. Lexical lookup of the identical opaque turn hash returned one matching source in 1,017 characters.

The candidate uses lexical lookup specifically to locate its own write marker. Historical tool queries still default to hybrid. Both paths enforce their actual details JSON budget; no cap was widened. Source ID, source version, Unicode ranges, overlap consistency and complete original written body must still match before success. No whole-day show or automatic write retry is introduced. General Runtime hybrid budget correctness is not claimed fixed by this client change.

The known diary was recovered through a read-only call using its actual recorded written body and marker: two versioned fragments verified, zero writes during recovery. Its private receipt now distinguishes the original failed automatic readback from subsequent read-only verification. It was not republished or reinserted.

Existing Node and Bun checks pass locally. The fixture reproduces over-budget semantic source results and checks exact-mode success, unchanged ordinary hybrid defaults and over-budget history rejection. Publication, installation and native acceptance are pending at this candidate checkpoint. Successful earlier 0.3.6 checks remain historical evidence, not proof of this revision's deployment.

## Published result and retained acceptance failure

Three-OS CI 41206179272 and Release/OIDC 41206446612 passed; public latest became 0.3.7. Registry signature and attestation each verified once. Exact community e833295 compatibility 41206441916 passed with 4193 pass, 3 skip, 0 fail.

The isolated native recall answered the existing fact correctly. Its exact lexical lookup stayed within budget (1992 characters; fragment 2476), but archival was unconfirmed. The test reused identical 0.3.6 messages, hence the same deterministic source hash. The daily source contained two different diaries with that marker. The verifier selected the first, older candidate; its fragments did not contain the new written body. This is an observed false-negative readback, not a missing-write claim. The isolated driver stopped without replaying the write or running later probes.

The separately marked main ordinary turn did complete its diary in five logical calls. Main npm 0.3.7 was enabled, with all original options and the other three plugin records preserved. These successful checks do not override the isolated failure. The next candidate must examine the bounded matching candidates for the exact full body and use independently marked acceptance inputs.

Local command setup failures were also corrected: the first community Bun invocation pointed TEMP at a nonexistent nested directory; the root checker was then accidentally invoked under Node although it requires Bun. Corrected Bun invocations passed. Neither failure required production code changes.
