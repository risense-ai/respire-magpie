# Correct public CLI installation entry: 0.3.10

The user corrected the public CLI package to [rsrs-cli](https://www.npmjs.com/package/rsrs-cli). Public npm verified name rsrs-cli, version 1.0.19 and repository risense-ai/respire-cli. The installed local rsrs launcher also points into rsrs-cli. The earlier draft spelling rsrsai-cli returned 404 and was not published as an installation command.

All current upstream/community installation instructions now use `npm install -g rsrs-cli`. Settings, READMEs and PR568 point to the current npm page and CLI GitHub. The obsolete installation entry and outdated npm-guide link are removed from current instructions. 0.3.9 remains an immutable failed onboarding candidate; its stale instructions are superseded, not silently reported as correct. Hook/worker/readback code remains identical to 0.3.8.

A requested npm deprecation was attempted using the authenticated owner account. npm returned EOTP; the notices printed before that error do not prove registry mutation. Chrome completion and public readback are required before reporting it deprecated. Deprecation is distinct from destructive unpublishing or an automatic redirect. No package was unpublished, transferred or republished by this correction.

The main plugin record was unexpectedly absent when the 0.3.9 upgrade started; the installer stopped before changes. The existing three provider records were preserved. User clarification was requested before restoring any potentially intentional removal. Do not report the main gateway as currently enabled from earlier 0.3.8 evidence.

## Completed correction and user-confirmed scope

The user confirmed the main plugin was intentionally removed and must remain removed for now. This overrides the earlier permission to keep it enabled. No main installation was restored. A separate isolated Magpie profile was used for all subsequent page checks.

Three-OS preflight [41209081530](https://github.com/risense-ai/respire-magpie/actions/runs/41209081530), repeated Release/OIDC [41209389261](https://github.com/risense-ai/respire-magpie/actions/runs/41209389261) and exact community 507db048 compatibility [41209322240](https://github.com/risense-ai/respire-magpie/actions/runs/41209322240) passed. Public plugin latest=0.3.10. Independent npm installation verified one registry signature and one attestation. Magpie's own isolated installation matched all **33 packaged files** against raw v0.3.10 blobs.

The actual installed page in Magpie web through IAB showed the first-use heading, `npm install -g rsrs-cli`, CLI GitHub/Releases and Runtime-guide links, and the status check before configuration. The plugin icon/name rendered. No page options were saved and no account, Runtime or main-provider configuration was changed. Private screenshot: .verification/npm-live/setup0310.png. Native desktop-window rendering was not tested. Hook/worker code did not change after 0.3.8's scoped real read/store checks; that live suite was not repeated solely for static onboarding text.

Public registry inspection found all 71 legacy core versions already deprecated with the generic warning. Updating the warning through a noninteractive CLI initially failed EOTP; Chrome's deprecate form had no custom-message field. Under the user's two-stalled-attempt rule, GPT-6-astra xhigh checked official npm CLI source and identified its TTY-only web MFA path. The normal interactive command produced a browser challenge, the user completed Chrome MFA, and the CLI exited zero. Fresh public readback verified **71/71 versions** now carry the same migration message: install rsrs-cli, its npm URL, and the clarification that the core is retained only as an internal dependency. No OTP or credential was collected in chat.

The new public package still depends on its exact-version internal core, so the dependency was not unpublished. npm deprecation supplies a page/install warning, not an automatic rename or redirect. No migration wrapper, new token, trust change or permission expansion was introduced. PR568 carries the onboarding correction and diary fixes; its community review/merge remains independent of upstream publication.
