# 自动同步 Magpie 官方商店

独立 npm 发布和社区商店是两条分发链。社区仓库保存完整插件副本，因此新版仍需社区 PR；自动化负责提交和更新，维护者负责审核合并。

## 触发与范围

`.github/workflows/community-sync.yml` 在正式稳定版的 Release 工作流全部成功后触发。它核对标签、源提交、Release 门禁和公开 npm 版本，再比较社区 main 的版本。预发布不进入稳定商店；已同步的版本直接结束，不重复创建 PR。无论新建还是更新已有 PR，若只有 package.json 的版本号变化，都跳过社区全量检查、推送与 PR 写入；只有实际运行文件、资源或包配置变化才提交新 PR，避免占用维护者和社区 CI 资源。

同步只修改 `packages/respire-memory`：发布的运行模块、页面、许可证与现有检查来自同一标签；社区包名、仓库地址、检查命令和专用 README 保留。仅在干净工作树中同步，拒绝降级、越界路径和符号链接。完整社区现有测试、根检查及打包检查通过后，才允许推送。

校验任务没有跨仓库写凭据。推送任务使用另一台干净 runner，从相同提交重新生成已检查的改动，不执行社区测试代码，也不运行 Git hooks。

机器人分支使用 `respire-sync-v<version>`。有一张未合并的机器人 PR 时，后续版本更新这张 PR；即使先前已推送成功但正文更新失败，也继续核对并更新同一张 PR，避免因文件已相同而跳过恢复；合并后，下次从官方最新 main 新建分支与 PR。遇到冲突或手工关闭的同版本 PR 会停止，不强推、不重新打开已关闭 PR、不自动批准或合并。

## 一次性授权

在 `risense-ai/respire-magpie` 的 Actions repository secrets 保存 `MAGPIE_COMMUNITY_TOKEN`。

当前流程使用 `luodaoyi` 账号的专用 classic PAT，只选 `public_repo`，建议 30 天到期。不选包含私有仓库的 `repo`、`workflow` 或管理权限。这个 scope 仍覆盖该账号有权限的公共仓库，不能限制到单个 fork；凭据只应直接存入上述 Actions secret，不发聊天、不提交文件，也不复用本机已有登录令牌。到期后需由所有者更新 secret。

原因是默认 `GITHUB_TOKEN` 只限当前仓库，而 [GitHub 目前列出的细粒度令牌限制](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens-limitations)包括向非成员的公共仓库贡献。仅在自己的 fork 安装 GitHub App，并不能假定它能向未安装该 App 的社区仓库创建 PR。

令牌用于向 `luodaoyi/plugins` 推送机器人分支，并向 `magpie-community/plugins` 创建或更新 PR。更新仅通过 REST PATCH 发送标题和文件正文，避免 `gh pr edit` 的额外 GraphQL 查询要求 `read:org`；不因此扩大令牌权限。它不赋予官方合并权。已有 npm OIDC 配置不变。

## 演练与故障

Actions → Sync Magpie community → Run workflow：填写已发布的稳定标签并保留 `dry_run=true`。演练不推送、不写 PR；若社区版本已相同，则只报告无需同步。去掉 dry run 可重跑已发布版本的同步。

验证更新已有 PR 时，手动选择 `validation=true`。目标固定为自有 `luodaoyi/plugins` 的 `respire-sync-validation-base` 分支，必须已有一张托管测试 PR，否则停止。它复用正式流程的查找、检查、推送和 PR 更新步骤；不会向官方仓库发送测试 PR。正式 Release 触发不启用此开关。测试结束后关闭自有 PR，不合并测试标记。

npm 上传成功后还会进行公开可用前的扫描，[官方说明通常约 5 分钟，高峰可能 15 分钟以上](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/)。流程只对 registry 的 404/503 等待两次，分别等待 5 分钟和 10 分钟，累计最多 15 分钟；仍不可用则失败，待确认公开可用后只重跑同步，不重跑 Release 或重复 publish。令牌过期、权限不足、冲突、检查失败或官方审批都不会被绕过。普通 token 无法推送上游新增 workflow 时，应人工核对 fork 同步与权限，不自动扩大 scope。

该流程不安装、更新或修改任何本机 Magpie 插件。自动 PR 创建成功、官方合并和商店 dist 更新是三个独立状态。

## 实际验收（2026-10-31）

- `v0.3.11` 对应 `dac6c651702eede7bb67249e60ab2af68bcb1c57`。[Release 41213969253](https://github.com/risense-ai/respire-magpie/actions/runs/41213969253) 的三系统检查、GitHub Release 和 npm OIDC 发布全部成功。下载的 Release 包 SHA256 为 `f7c2dd1199e1cd5e9372134374129fad7e969f8f59934bc14d28af7e7c6bf659`，与发布清单一致。
- [首次自动同步 41214133925](https://github.com/risense-ai/respire-magpie/actions/runs/41214133925) 被 npm 可用性门禁拦住，没有推送。npm 上传成功于 15:17:19 UTC，但公开元数据记录的发布时间为 15:19:57.366 UTC，相差约 158 秒；不能把上传成功当成已经可安装。按 Astra xhigh 诊断修正等待策略后，只重跑同步，没有重复发布。
- [真实同步 41214634324](https://github.com/risense-ai/respire-magpie/actions/runs/41214634324) 成功：现有社区测试 4418 通过、3 跳过、0 失败，根检查及打包检查通过；由 Actions 推送 `18d03ec455292d0b16465540d141e4828b2a4231` 并自动创建 [官方 PR #570](https://github.com/magpie-community/plugins/pull/570)。该 PR 仅修改社区包版本号，运行文件与已收录的 0.3.10 一致。令牌实际用于跨仓库推送和创建 PR，未读取或记录其值。
- 用户要求验证后关闭只有版本号变化的 PR，因此 #570 已于 15:30:23 UTC 关闭，未合并；复用验证运行 `41214952478` 已取消，该轮没有完成更新验收；后续自有仓库的验证见下节。后续加入版本号单独变化时的跳过判断，本地直接执行工作流内的判断代码，验证仅版本号跳过、真实包配置变化保留、现有 PR 继续更新三个分支通过。
- 本地 `actionlint` 与 `git diff --check` 通过。同步副本实际运行现有检查，并验证脏工作树被拒绝；相同版本的只读云端演练 [41213327335](https://github.com/risense-ai/respire-magpie/actions/runs/41213327335) 成功且不创建 PR。已关闭 PR 的过滤使用真实 OPEN 与 MERGED 样本核对。

这次未修改或重新验收用户的本机插件，也没有自动批准或合并官方 PR。人工关闭、冲突、令牌到期与超过等待上限的扫描仍会使流程停止；不能据本次通过声称这些失败都已经在云端制造并验证。

## 自有仓库更新已有 PR 的验收（2026-10-31）

用户明确要求不再向 Magpie 官方提交测试 PR，因此测试只在自有 [luodaoyi/plugins PR #1](https://github.com/luodaoyi/plugins/pull/1) 进行。专用基线分支从官方已收录的 0.3.10 提交 `f7e0dcb` 建立；初始测试提交 `f005e0a` 仅在社区 README 添加保留标记，不改运行代码，不合并回正式分支。

[首轮 41215848210](https://github.com/risense-ai/respire-magpie/actions/runs/41215848210) 通过现有社区检查（4366 通过、3 跳过、0 失败）、根检查和打包检查，并向同一张 PR 推送 `a2d2467abc52648a76ced0f94d6cac105bdb4ee2`，把版本改为 0.3.11。但随后 `gh pr edit` 的额外 GraphQL 组织字段查询要求 `read:org`，运行失败；当时标题和正文仍旧。该失败暴露了仅验证新建 PR 没有覆盖的路径，未增加令牌权限来解决。

修复提交 `a257776` 改用 REST PATCH，仅发送标题和文件正文；同时让已有 PR 在文件已同步时仍进入更新步骤，恢复“推送成功、正文更新失败”的部分完成状态。本地直接执行工作流中的判断代码，验证有 PR 且无文件差异时继续恢复，无 PR 且无差异时跳过；`actionlint`、diff 检查和[该代码提交的三系统 CI 41216207288](https://github.com/risense-ai/respire-magpie/actions/runs/41216207288) 均通过。

[恢复运行 41216207675](https://github.com/risense-ai/respire-magpie/actions/runs/41216207675) 的 prepare 与 publish 全部成功，继续使用同一张 PR 和原 `public_repo` 令牌。通过 GitHub API 独立读取正文、提交比较和远端文件，断言全部通过：

- PR 编号始终为 1，该基线与分支仅有这一张 PR；没有重复创建。
- 相比初始测试提交恰好多一个提交，仅修改 `packages/respire-memory/package.json`，远端版本为 0.3.11，社区包名保持不变。
- 标题已变为 `chore(respire-memory): sync 0.3.11`，正文包含正式标签和本次成功运行链接。
- README 中的自有测试标记保留；恢复运行保持 `a2d2467`，没有空提交或强推。

验收后于 15:46:52 UTC 关闭自有 PR #1，未合并。远端前后状态与断言证据保存在忽略目录 `.verification/community0311/owned-pr-before.json` 和 `owned-pr-update-evidence.json`。此前官方 #570 仍作为已关闭的历史验证，不再用于测试；本次没有向官方仓库创建、更新或重新打开测试 PR。此次证明同一工作流在自有仓库更新已有 PR 以及部分完成恢复，不代表官方审核或合并已经发生。

## 验证分支清理与后续规则

按用户要求，已核对关闭状态与提交 SHA，再删除 `luodaoyi/plugins` 的三个验证分支：`respire-sync-v0.3.10`、`respire-sync-v0.3.11`、`respire-sync-validation-base`。远端精确查询确认三个引用均已不存在；本地两个仓库没有对应分支或跟踪引用。正式贡献分支、标签、本报告和本地验收证据均保留，删除前的引用记录保存在 `.verification/community0311/removed-validation-refs.json`。

纯版本号变化的跳过规则同时适用于新建和更新已有 PR：不运行社区全量检查，不推送纯版本号提交，也不写官方 PR。真实文件或包配置变化仍可同步；文件已完全一致但 PR 正文尚未完成的恢复仍可执行，不增加提交。直接执行实际工作流判断代码的六项断言均通过，覆盖这三种情况各自有无已有 PR的分支；`actionlint` 和 diff 检查通过。断言结果保存在 `.verification/community0311/final-gate-assertions.json`。本轮没有重新创建验证分支或官方测试 PR。
