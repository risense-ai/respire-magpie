# Source-marker readback follow-up: 0.3.7

On 2026-10-31, the PR monitor's process diary write returned a valid ID, but 0.3.6 readback rejected its Runtime result with diary-output-too-large. A read-only inspection observed hybrid semantic_ready=true and 4,033 Unicode characters in details despite max_chars=4000. The matching source and unrelated semantic matches were both present. Lexical lookup of the identical opaque turn hash returned one matching source in 1,017 characters.

The candidate uses lexical lookup specifically to locate its own write marker. Historical tool queries still default to hybrid. Both paths enforce their actual details JSON budget; no cap was widened. Source ID, source version, Unicode ranges, overlap consistency and complete original written body must still match before success. No whole-day show or automatic write retry is introduced. General Runtime hybrid budget correctness is not claimed fixed by this client change.

The known diary was recovered through a read-only call using its actual recorded written body and marker: two versioned fragments verified, zero writes during recovery. Its private receipt now distinguishes the original failed automatic readback from subsequent read-only verification. It was not republished or reinserted.

Existing Node and Bun checks pass locally. The fixture reproduces over-budget semantic source results and checks exact-mode success, unchanged ordinary hybrid defaults and over-budget history rejection. Publication, installation and native acceptance are pending at this candidate checkpoint. Successful earlier 0.3.6 checks remain historical evidence, not proof of this revision's deployment.
