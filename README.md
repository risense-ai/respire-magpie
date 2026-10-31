# Respire for Magpie

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="page/icon-respire-ai-memory.svg">
    <img src="page/icon-respire-ai-memory-light.svg" width="112" height="112" alt="Respire AI 记忆">
  </picture>
</p>

Magpie 网关记忆插件。自动读取 Respire 记忆正文，支持显式存储，以及默认关闭的对话日记采集。复用已有 Respire Runtime，无运行时 npm 依赖。

**当前为 0.1.0 本地开发版，尚未发布到 npm。它没有完整对齐 Respire Codex 插件，尤其不包含后台模型提炼。**

## 让 AI 安装：复制这段提示词

把下面整段发给本地助手，并将目录替换为你实际保存本插件的位置：

```text
请安装本地 Respire Magpie 插件，目录为 D:\sources\repos-new\gh\1memory\respire-magpie。
先阅读该目录 README.md，检查 Magpie 版本、Bun 和 rsrs --client-only status --json。
复用现有 Respire 环境，不安装、启动或升级 Runtime，不索取密码或其他凭据。
保留现有账号、记忆库、配置和无关插件。先检查 magpie plugin list --json，避免重复安装。
尚未安装时执行 magpie plugin add <完整插件目录>，不要只安装 respire.hooks.mjs。
在插件页面配置实际 Runtime 地址和项目；保持 capture=false，除非我明确允许采集对话。
不要把尚未发布的 @rsrsai/magpie 当成 npm 可安装包，也不要自行升级 Magpie。
用无敏感内容的问题验证召回。存储验证先取得我对测试事实的授权，再核对实际记录。
报告实际执行结果和未验证项，不能把保存配置当成连接成功或完整验收。
```

## 准备与安装

需要 Bun 1.3.6+、已就绪的 Respire HTTP Runtime，以及支持异步 Hook 的 Magpie **0.1.1273+**。推荐 **0.1.2208+**，以识别本机 Agent 的 `magpie-key` 来源；旧版将此来源归为 `gateway-key`，本插件会跳过，不放宽权限。页面配置在 0.1.1531+ 热更新，更早版本需重启 Magpie。本插件不安装、启动、升级服务，不管理账号或接收凭据。

先通过 rsrs 自身流程登录、解锁记忆库并准备模型，再执行：

```powershell
rsrs --client-only status --json
magpie plugin add D:\sources\repos-new\gh\1memory\respire-magpie
```

请安装整个目录，以保留 package.json 中的配置页面、默认选项和同目录模块。需要生成分发包时执行：

```powershell
cd D:\sources\repos-new\gh\1memory\respire-magpie
npm pack
```

本包尚未发布到 npm；开发时使用上面的目录安装。不要执行 `magpie plugin add @rsrsai/magpie` 并假定它已经发布。

其他系统可在插件目录执行 `magpie plugin add .`，请先确认当前目录含本包 package.json。本地路径安装引用该目录；安装后不要移动或删除它。目录打包不会自动注册插件。

安装后打开 Respire 插件页面，配置 Runtime 地址、项目与采集开关。页面只保存配置，不检测连接。原生 Options 也可使用以下配置；在 `magpie plugin options <插件标识>` 中先确认实际标识，本地路径安装时不要直接假设标识是 npm 包名：

```json
{
  "runtimeUrl": "http://127.0.0.1:15169",
  "project": "",
  "gatewayTimeoutMs": 5000,
  "requestTimeoutMs": 1500,
  "maxBytes": 8000,
  "limit": 3,
  "remember": true,
  "capture": false
}
```

| 选项 | 默认值 | 作用与范围 |
| --- | --- | --- |
| `runtimeUrl` | `http://127.0.0.1:15169` | 已运行的本地 Runtime，只接受 `127.0.0.1` 或 `[::1]`，协议为 HTTP/HTTPS，不带路径、凭据或查询参数。 |
| `project` | 空字符串 | 非空时按现有项目名过滤召回并标注写入；不是权限或账号边界。 |
| `gatewayTimeoutMs` | `5000` | Magpie 控制整个 Hook 的超时，宿主允许范围为 100–10000 毫秒；多个 Hook 共享总预算。 |
| `requestTimeoutMs` | `1500` | 每个 Runtime 请求含响应读取的超时，100–5000 毫秒。 |
| `maxBytes` | `8000` | 单轮注入块的 UTF-8 字节预算，1024–32768。 |
| `limit` | `3` | 召回候选条数，1–5；最终注入可能因预算或敏感内容而更少。 |
| `remember` | `true` | 是否处理存储前缀；关闭不会阻止客户端自行调用其他记忆工具。 |
| `capture` | `false` | 是否将完成回合采集为 trivial 日记。 |

## 与 Codex 插件的差异及可实现性

下表区分当前实现与未来可做的工作，不是功能完成清单。

| 功能 | Magpie 0.1.0 现状 | 能否补齐、需要什么 |
| --- | --- | --- |
| 自动召回 | 已支持，直接注入正文 | 已具备；Codex 是先注入标题、再由助手按需读正文。 |
| 显式存储及待决回执 | 已支持 | 已具备；pending 仍需客户端工具或后续后台任务处理，当前不会自动完成挂靠。 |
| 会话规则、引擎状态检查 | 只有历史资料提示 | 可在首次观察某会话时补规则与检查；网关没有 Codex 的 SessionStart 事件，不能把首次看到请求等同于真实会话开始、恢复或压缩。 |
| 后台提炼新结论 | 未实现；capture 只保存原始日记 | 可做，但需另行配置生成模型或明确使用某个宿主的后台任务接口，不能取得或复用网关客户端的私有登录凭据。 |
| 查重、更新或挂靠、写后回读 | 显式存储只走引擎首次判重 | 可在后台 worker 中实现，须保留候选与原始来源，限制写入操作，处理 pending 和未知回执；不能直接复制 Codex app-server 专用代码。 |
| 大回合分段与证据回读 | 不提炼；超过 64 KiB 的采集跳过 | 可在后台 worker 中做有预算的分段与源证据读取；只处理网关实际收到的内容，无法恢复客户端未发送的历史。 |
| 持久去重、归档进度 | 仅有内存缓存 | 可增加本地状态存储及原子写入；已入队任务可跨重启保留，但宿主在入队前丢失完成通知的问题仍存在。 |
| Memory、Used、保存状态与显示偏好 | 未实现 | 可增加提示和配置；Used 仍须由实际使用资料的模型报告，网关不能独立证明模型采用了哪条记忆。原生界面状态行需要宿主支持，不能由 Hook 保证展示。 |
| plan 模式禁写 | 不识别客户端 plan 模式 | 当前 Hook 契约没有可信 `permission_mode` 字段，无法通用自动识别。可补插件只读开关；要自动对齐需宿主传递可信模式，不能靠用户文字猜测权限。 |
| Codex setup/settings 技能 | 没有；提供 Magpie 配置页 | 配置需求可通过页面实现；Codex 专用技能与生命周期不能在纯网关插件中原样运行。 |

因此，大部分记忆处理能力可以通过“网关接入 + 独立后台处理”实现，但 Codex 的会话事件、权限模式和界面行为受各自宿主限制。建议后续先明确后台模型和状态存储，再补提炼、查重与回读；最后处理分段、进度和显示偏好。本次文档更新没有实现这些后续能力。

**当前使用 plan 模式时，不要依赖本插件自动禁写。** 若要求本插件不写入，请将 `remember` 和 `capture` 都设为 `false`，或通过 Respire 自身的只读模式控制；客户端其他工具的权限仍由其宿主管理。

## 行为

- 使用异步 `magpie.hooks`。支持 Chat Completions、Responses、Anthropic Messages 和 Gemini，保留模型、流式设置与客户端工具定义。
- 只处理宿主标记的 `local` 和 `magpie-key`。远程、其他具名网关密钥、代理请求与未知来源全部跳过，不能通过参数开启。
- 仅连接字面回环地址 `127.0.0.1` / `[::1]` 的 `/api/rpc`，不接受远程服务、DNS 名、URL 凭据或重定向。不会调用 CLI 或启动模型、Runtime。
- `project` 是可选的现有 Respire 项目过滤器。留空召回当前库所有项目；填写后召回与写入均传该项目，并复核读取结果。它不是账号、记忆库或访问控制隔离。`cwd` 与 `session` 只参与缓存隔离，不自动推导项目。
- 默认召回最多 3 条，使用 `recall --titles --json` 选候选，再 `show` 读取正文；被取代的条目优先读取新条。整条证据放不进字节预算时跳过，不截成可能改变含义的片段。分数不作为可信度。
- 记忆以 JSON 历史参考附到用户消息，转义标签边界；不作为系统指令。历史轮次重放原有块，减少提示词缓存变化。缓存最多 512 轮、8 MiB；重启或淘汰后可重新召回。
- `记：`、`存：`、`记录：`、`记住：`、`remember:` 开头的消息在 `remember: true` 时尝试写入 important，先经过引擎判重，不使用 `--force`。pending 代表未落库，需通过客户端已有的 Respire CLI/MCP 读候选并完成更新或挂靠。超时代表结果未知，可能已提交，不能盲目重试。
- `/nomem` 或 `#nomem` 跳过本条自动召回与采集。不会注册模型工具；显式搜索、修订、删除仍由客户端现有的 Respire CLI/MCP 完成。
- 连接失败、无效响应或超时不阻断推理。诊断只报固定状态码与字节数，不打印服务错误正文或记忆内容。

## 可选对话采集

默认 `capture: false`。开启后，每轮完整结束的用户消息、客户端工具调用与结果、助手最终回复保存为 **trivial 日记**，携带源摘要；不会自动生成 important，也不另配提炼模型。

文件内容与命令输出可能出现在工具结果里，并按 Respire 现有配置加密和同步。开启前确认这些内容允许保存。疑似凭据会跳过整轮；扫描只是尽力检查，不能识别任意自然语言秘密。

采集跳过失败、截断、未完成工具调用、仅含工具结果的请求、`previous_response_id` 历史续接，以及超过 64 KiB 的单轮。仅包含文本与结构化工具记录，不保存图片、音频或模型私有推理。

宿主通知及本插件去重均在内存中，退出会丢失，缓存淘汰或重启后可能重复，不保证持久投递或恰好一次。未知写入不重试。可靠后台提炼与持久队列未包含在此版本。

## 排查

| 现象 | 检查方式 |
| --- | --- |
| 安装成功却没有记忆 | 先执行 `rsrs --client-only status --json`，确认账号、解锁、模型与 Runtime；再检查 Magpie 插件诊断。不要通过放宽来源限制解决。 |
| 本机 Agent 也被跳过 | Magpie 0.1.2208 前可能将本机共享密钥归为 `gateway-key`；升级宿主后另行验收，或使用宿主可识别的直接本机请求。 |
| 地址被拒绝 | 使用真实的字面回环地址；`localhost`、远程地址和带路径的 URL 不被接受。 |
| 返回 pending | 尚未写入，需读取候选并选择更新或挂靠；不要反复发送或强制保存。 |
| 存储超时或没有有效回执 | 可能已经写入；先通过 Respire 查库，禁止自动重放。 |
| 召回少于 limit | 检查项目过滤、字节预算和内容是否触发敏感检查；候选数量不等于注入数量或资料可信度。 |
| 采集没有形成长期记忆 | 当前采集只写日记；后台模型提炼尚未实现。失败、不完整、含疑似凭据或过大的回合会跳过。 |

## 图标

亮暗图标取自项目 `icon/` 的 `icon-respire-ai-memory-light.svg` 与 `icon-respire-ai-memory.svg`，原样副本随包放在 `page/`。
配置页按 Magpie 官方 bridge 设置的 `data-theme` 切换两版；README 用 picture 切换。插件列表图标通过 `magpie.icon` 内嵌自适应 SVG data URI，侧栏使用 `magpie.page.icon` 指向 `page/icon.svg`，无需外网加载图标。
单文件沿用 Respire DSH 中由同一对源图组成的版本；其媒体查询跟随宿主传给图像的配色方案。Magpie 显式主题与系统主题不同时，插件列表和侧栏的实际切换仍需宿主验收，不能以网页测试代替。

## 验证与来源

使用语法检查、内联断言和模拟 HTTP Runtime 验证，并已通过真实 Runtime 的只读 recall/show 检查；未向真实记忆库写入测试数据。完整 Magpie 安装与 UI 验收须单独执行，不能用模拟检查代替。本机 Magpie 0.1.1908 早于 `magpie-key` 来源分类，未为本插件升级宿主。

参考 [Magpie Hook 契约](https://github.com/yetone/magpie/blob/main/docs/subsystems/gateway-request-hooks.md) 与 [PowerContext 插件](https://github.com/magpie-community/plugins/tree/main/packages/powercontext)。对话解析器改自其 MIT 实现，归属与上游版本见 NOTICE。
