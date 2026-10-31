# 自动同步 Magpie 官方商店

独立 npm 发布和社区商店是两条分发链。社区仓库保存完整插件副本，因此新版仍需社区 PR；自动化负责提交和更新，维护者负责审核合并。

## 触发与范围

`.github/workflows/community-sync.yml` 在正式稳定版的 Release 工作流全部成功后触发。它核对标签、源提交、Release 门禁和公开 npm 版本，再比较社区 main 的版本。预发布不进入稳定商店；已同步的版本直接结束，不重复创建 PR。首次同步若只有 package.json 的版本号变化，则跳过社区全量检查、推送与建 PR；只有实际运行文件、资源或包配置变化才提交新 PR，避免占用维护者和社区 CI 资源。

同步只修改 `packages/respire-memory`：发布的运行模块、页面、许可证与现有检查来自同一标签；社区包名、仓库地址、检查命令和专用 README 保留。仅在干净工作树中同步，拒绝降级、越界路径和符号链接。完整社区现有测试、根检查及打包检查通过后，才允许推送。

校验任务没有跨仓库写凭据。推送任务使用另一台干净 runner，从相同提交重新生成已检查的改动，不执行社区测试代码，也不运行 Git hooks。

机器人分支使用 `respire-sync-v<version>`。有一张未合并的机器人 PR 时，后续版本更新这张 PR；合并后，下次从官方最新 main 新建分支与 PR。遇到冲突或手工关闭的同版本 PR 会停止，不强推、不重新打开已关闭 PR、不自动批准或合并。

## 一次性授权

在 `risense-ai/respire-magpie` 的 Actions repository secrets 保存 `MAGPIE_COMMUNITY_TOKEN`。

当前流程使用 `luodaoyi` 账号的专用 classic PAT，只选 `public_repo`，建议 30 天到期。不选包含私有仓库的 `repo`、`workflow` 或管理权限。这个 scope 仍覆盖该账号有权限的公共仓库，不能限制到单个 fork；凭据只应直接存入上述 Actions secret，不发聊天、不提交文件，也不复用本机已有登录令牌。到期后需由所有者更新 secret。

原因是默认 `GITHUB_TOKEN` 只限当前仓库，而 [GitHub 目前列出的细粒度令牌限制](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens-limitations)包括向非成员的公共仓库贡献。仅在自己的 fork 安装 GitHub App，并不能假定它能向未安装该 App 的社区仓库创建 PR。

令牌用于向 `luodaoyi/plugins` 推送机器人分支，并向 `magpie-community/plugins` 创建或更新 PR。它不赋予官方合并权。已有 npm OIDC 配置不变。

## 演练与故障

Actions → Sync Magpie community → Run workflow：填写已发布的稳定标签并保留 `dry_run=true`。演练不推送、不写 PR；若社区版本已相同，则只报告无需同步。去掉 dry run 可重跑已发布版本的同步。

npm 上传成功后还会进行公开可用前的扫描，[官方说明通常约 5 分钟，高峰可能 15 分钟以上](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/)。流程只对 registry 的 404/503 等待两次，分别等待 5 分钟和 10 分钟，累计最多 15 分钟；仍不可用则失败，待确认公开可用后只重跑同步，不重跑 Release 或重复 publish。令牌过期、权限不足、冲突、检查失败或官方审批都不会被绕过。普通 token 无法推送上游新增 workflow 时，应人工核对 fork 同步与权限，不自动扩大 scope。

该流程不安装、更新或修改任何本机 Magpie 插件。自动 PR 创建成功、官方合并和商店 dist 更新是三个独立状态。

## 实际验收（2026-10-31）

- `v0.3.11` 对应 `dac6c651702eede7bb67249e60ab2af68bcb1c57`。[Release 41213969253](https://github.com/risense-ai/respire-magpie/actions/runs/41213969253) 的三系统检查、GitHub Release 和 npm OIDC 发布全部成功。下载的 Release 包 SHA256 为 `f7c2dd1199e1cd5e9372134374129fad7e969f8f59934bc14d28af7e7c6bf659`，与发布清单一致。
- [首次自动同步 41214133925](https://github.com/risense-ai/respire-magpie/actions/runs/41214133925) 被 npm 可用性门禁拦住，没有推送。npm 上传成功于 15:17:19 UTC，但公开元数据记录的发布时间为 15:19:57.366 UTC，相差约 158 秒；不能把上传成功当成已经可安装。按 Astra xhigh 诊断修正等待策略后，只重跑同步，没有重复发布。
- [真实同步 41214634324](https://github.com/risense-ai/respire-magpie/actions/runs/41214634324) 成功：现有社区测试 4418 通过、3 跳过、0 失败，根检查及打包检查通过；由 Actions 推送 `18d03ec455292d0b16465540d141e4828b2a4231` 并自动创建 [官方 PR #570](https://github.com/magpie-community/plugins/pull/570)。该 PR 仅修改社区包版本号，运行文件与已收录的 0.3.10 一致。令牌实际用于跨仓库推送和创建 PR，未读取或记录其值。
- 用户要求验证后关闭只有版本号变化的 PR，因此 #570 已于 15:30:23 UTC 关闭，未合并；复用验证运行 `41214952478` 已取消，不能宣称该云端更新路径已验收。后续加入版本号单独变化时的跳过判断，本地直接执行工作流内的判断代码，验证仅版本号跳过、真实包配置变化保留、现有 PR 继续更新三个分支通过。
- 本地 `actionlint` 与 `git diff --check` 通过。同步副本实际运行现有检查，并验证脏工作树被拒绝；相同版本的只读云端演练 [41213327335](https://github.com/risense-ai/respire-magpie/actions/runs/41213327335) 成功且不创建 PR。已关闭 PR 的过滤使用真实 OPEN 与 MERGED 样本核对。

这次未修改或重新验收用户的本机插件，也没有自动批准或合并官方 PR。人工关闭、冲突、令牌到期与超过等待上限的扫描仍会使流程停止；不能据本次通过声称这些失败都已经在云端制造并验证。
