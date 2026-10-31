# Correct public CLI installation entry: 0.3.10

The user corrected the public CLI package to [rsrs-cli](https://www.npmjs.com/package/rsrs-cli). Public npm verified name rsrs-cli, version 1.0.19 and repository risense-ai/respire-cli. The installed local rsrs launcher also points into rsrs-cli. The earlier draft spelling rsrsai-cli returned 404 and was not published as an installation command.

All current upstream/community installation instructions now use `npm install -g rsrs-cli`. Settings, READMEs and PR568 point to the current npm page and CLI GitHub. The obsolete installation entry and outdated npm-guide link are removed from current instructions. 0.3.9 remains an immutable failed onboarding candidate; its stale instructions are superseded, not silently reported as correct. Hook/worker/readback code remains identical to 0.3.8.

A requested npm deprecation was attempted using the authenticated owner account. npm returned EOTP; the notices printed before that error do not prove registry mutation. Chrome completion and public readback are required before reporting it deprecated. Deprecation is distinct from destructive unpublishing or an automatic redirect. No package was unpublished, transferred or republished by this correction.

The main plugin record was unexpectedly absent when the 0.3.9 upgrade started; the installer stopped before changes. The existing three provider records were preserved. User clarification was requested before restoring any potentially intentional removal. Do not report the main gateway as currently enabled from earlier 0.3.8 evidence.
