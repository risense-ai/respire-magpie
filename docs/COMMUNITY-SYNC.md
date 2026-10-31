# 自动同步 Magpie 官方商店

独立 npm 发布和社区商店是两条分发链。社区仓库保存完整插件副本，因此新版仍需社区 PR；自动化负责提交和更新，维护者负责审核合并。

## 触发与范围

`.github/workflows/community-sync.yml` 在正式稳定版的 Release 工作流全部成功后触发。它核对标签、源提交、Release 门禁和公开 npm 版本，再比较社区 main 的版本。预发布不进入稳定商店；已同步的版本直接结束，不重复创建 PR。

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

registry 尚未传播时只对 404/503 进行两次有界等待；仍不可用则失败，稍后重跑同一工作流。令牌过期、权限不足、冲突、检查失败或官方审批都不会被绕过。普通 token 无法推送上游新增 workflow 时，应人工核对 fork 同步与权限，不自动扩大 scope。

该流程不安装、更新或修改任何本机 Magpie 插件。自动 PR 创建成功、官方合并和商店 dist 更新是三个独立状态。
