# Repeated source-marker readback: 0.3.8

The real 0.3.7 run found two valid diary fragments with the same deterministic source marker and different bodies. Selecting only the first produced an unconfirmed write even though the actual body was present later. The earlier failed run is retained in [0.3.7 evidence](NPM-LIVE-0.3.7.md).

The verifier now examines the matching candidates returned by the existing limit-five lexical search. Each fragment response retains the 4000-character details budget, source/version/range/overlap validation and exact complete-body check. A structurally valid candidate with another body's text is skipped; malformed or over-budget responses still fail. No extra write, whole-day read, budget increase or automatic retry is added. Candidates outside the bounded result set can still leave verification unconfirmed.

The existing fixture places an older same-marker body before the current write and checks that only the exact written body reaches the model. Existing incomplete-body and no-replay checks remain. Node and Bun checks passed locally. Publication and actual npm/native acceptance are pending at this source checkpoint.
