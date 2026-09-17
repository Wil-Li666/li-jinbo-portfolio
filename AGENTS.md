# 项目与部署

## 当前应用
- 网站：李金波 · AI 产品经理求职网站；应用目录 `web/`，package name 为 `li-jinbo-portfolio`。
- Next.js App Router，Node.js 24，pnpm。Netlify 配置见根目录 `netlify.toml`。
- 不向现有 origin（参考站仓库）推送，除非用户另行明确要求。

## GitHub 源码托管
- 用户仓库：`https://github.com/Wil-Li666/li-jinbo-portfolio`，公开仓库，发布分支 `main`，本地 remote 名为 `github`。
- 2026-09-17 按用户要求从私有改为公开，GitHub 已确认 `PUBLIC`。公开前扫描两个发布提交及 ZIP/DOCX 内共 238 个文件/条目，未发现常见凭据格式或本地真实密钥匹配；后续提交继续排除密钥及本地留言数据。
- 2026-09-17 已创建仓库；GitHub CLI 已登录 `Wil-Li666`。CLI 路径为 `%LOCALAPPDATA%/Programs/GitHubCLI/bin/gh.exe`；使用系统凭据存储，不在文档或命令中写入令牌。
- 2026-09-17 源码首次发布完成：`main` 初始提交 `33f3873b2c5625247d4d546ac8b1459ce3819a0e` 已推送，远端提交与本地一致，首次发布时为私有；新版 PDF 的远端 Git blob SHA 与本地一致。`main` 已跟踪 `github/main`。
- 已连接的 GitHub 账号：`Wil-Li666`。现有 `origin` 为 `https://github.com/ChenYanjun-hub/cyj-personal-web.git`，属于参考站仓库，不是本网站的发布目标。
- 使用 `git push github main` 更新用户仓库，避免误推参考站；不得强制推送或覆盖目标仓库已有内容。
- GitHub 首次发布采用当前完整文件快照，避免上传约 190 MB 的参考站历史。原本地历史保留在 `codex/reference-history` 分支；不要将该分支或所有分支批量推送到用户仓库。
- 上传当前网站代码、部署配置、文档及新版 PDF 简历；真实 `.env*`、`.netlify/`、依赖、构建产物和本地留言数据不入库，环境变量示例文件可以提交。
- GitHub 保存源码，线上应用继续由 Netlify 承载；本项目包含 AI 问答和留言服务端接口，不能直接以 GitHub Pages 静态托管替代当前部署。
- 推送后核对远端提交与本地提交一致，并在本节记录仓库地址、分支和发布结果；GitHub 源码推送不代表已连接 Netlify Git 自动部署。
- 本地验证：`pnpm --dir web lint` 通过。ESLint 排除 `.netlify/**` 构建产物，并允许 Netlify 部署插件使用 CommonJS 导入。

## Netlify
- 项目：`li-jinbo-portfolio`
- Project ID：`932d120c-3238-4e88-a540-6c0c2ba3de42`
- Team：`baronbobo0501`
- 控制台：https://app.netlify.com/projects/li-jinbo-portfolio
- Production 地址：https://li-jinbo-portfolio.netlify.app
- 2026-09-17 状态：production 已发布并开放匿名访问；首页、三个项目详情、简历下载、真实 AI 问答、留言写入及再次读取均验证通过。验证留言已删除。
- 当前部署 ID：`6aab76501a8eaf18482faf3a`。
- 部署记录：https://app.netlify.com/projects/li-jinbo-portfolio/deploys/6aab76501a8eaf18482faf3a
- 2026-09-17 简历更新：所有下载入口使用 `/resume/li-jinbo-ai-product-manager.pdf`，文件来自用户提供的新版 PDF，线上 SHA-256 与原文件一致。旧 DOCX 已从公开目录移除。
- 用户已明确授权将 `web/.env.local` 的 DeepSeek 密钥发送到本项目，仅供 production 部署函数使用。使用 CLI `--secret-env`，不得扩大到其他环境范围。
- 使用手动 CLI 发布，未连接 Git 自动部署。

## 部署指令
从仓库的 `web/` 目录执行（Windows CLI 从根目录执行会错误解析 publish 路径）：
```powershell
pnpm install --frozen-lockfile
netlify link --id 932d120c-3238-4e88-a540-6c0c2ba3de42
./deploy/Publish-Netlify.ps1
```
- CLI 27.8.0 的 deploy 默认运行构建；不要直接上传普通 `.next`，必须经过 `@netlify/plugin-nextjs` 适配。
- 发布脚本执行完整 production 构建和上传，使用 `--secret-env` 将本地 DeepSeek 配置仅注入本次部署的函数；每次发布都必须带上该配置。不要使用 `--no-build`，它会丢失适配器的发布目录设置。
- `deploy/netlify-strip-env` 的 `onBuild` 在 Next.js 适配后、函数打包前删除 dotenv 文件。已检查最终函数 ZIP 不含 dotenv 文件。不要改为 `onPostBuild`（此时已完成 ZIP 打包）。
- 当前账户对单独 functions 范围的站点环境变量写入返回 Forbidden，故使用上述 deploy-specific secret，不扩展密钥权限范围。非敏感 `GUESTBOOK_STORAGE=netlify` 已保存到站点 production 环境。
- Windows 使用 `web/pnpm-workspace.yaml` 的 `nodeLinker: hoisted` 布局，避免适配器复制 pnpm 符号链接时触发 EPERM。
- `.netlify/` 和真实 `.env*` 不提交；不得在日志或文档中记录密钥。
- AI 配置仅服务端使用 `DEEPSEEK_API_KEY`，可选 `DEEPSEEK_MODEL`、`DEEPSEEK_BASE_URL`。
- Netlify 线上留言使用 site-scoped Blobs store `portfolio-guestbook`，每条留言独立对象 `notes/<UUID>`；本地普通 Next.js 使用 `web/data/guestbook.json`。
- 留言上限检查和请求频率限制不是跨实例事务保证，当前适合低流量个人站。
- 上线检查：首页、三条项目详情、简历下载、AI 实际回答，以及留言写入后再次读取。清理本次创建的验证留言，不影响真实留言。
- 不将 Netlify 公网可访问等同于中国大陆所有运营商稳定可达，需单独验证。

## 官方工具来源
- Skills：https://github.com/netlify/context-and-tools
- 已安装 netlify-deploy、netlify-frameworks、netlify-blobs、netlify-config 至用户 Codex skills 目录。
- CLI：官方 npm 包 `netlify-cli`，安装命令 `npm install -g netlify-cli`。
