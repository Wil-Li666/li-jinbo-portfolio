# 李金波 · AI 产品经理

最后更新：2026-09-17。Production：https://li-jinbo-portfolio.netlify.app 。项目与部署记录见根目录 AGENTS.md。参考站 `cyjpersonalweb.cn` 不属于本项目的部署结果。

最新联系方式：`1033742131@qq.com` / `13986883177`，邮件与拨号链接已同步。

基于 Next.js App Router 的个人求职网站。网站资料以「李金波-AI产品经理.docx」为来源，三个项目的日期已由本人确认。

## 本地运行

在 web 目录执行 `pnpm install`，再执行 `pnpm dev`。打开 http://localhost:3000。

构建：`pnpm build`。代码检查：`pnpm lint`。生产运行：`pnpm start`。

## 内容维护

- `src/lib/profile.ts`：姓名、联系方式、工作、教育、技能、三个项目及简历问答的统一数据源。
- `src/app/page.tsx`：个人主页。
- `src/app/projects/[slug]/page.tsx`：项目详情。
- `src/lib/ai-avatar/prompt.ts`：从同一数据源构建 AI 简历助手知识，保持回答与网页一致。
- `public/resume/li-jinbo-ai-product-manager.pdf`：用户于 2026-09-17 提供的新版 PDF 简历，所有下载入口统一使用此文件。
- `public/design/li-jinbo-profile-card.png`：按用户 P1 风格与 P2 人物照片生成的深蓝形象卡，1086 × 1448，置于教育背景上方，桌面与手机端保持完整比例。

下载文件已替换为用户提供的新版 PDF，原 DOCX 已从网站公开目录移除。完整当前状态见 [项目指南](../docs/PROJECT_GUIDE.md)。

项目日期依次为 2025.12–2026.08、2025.02–2025.10、2023.12–2024.12，不推断工作任职时间。不同轮次的忠实度指标独立呈现。未使用原站个人照片、爱好、规划作品或其他履历。

## 简历问答

常见问题无需配置即可使用。自由提问沿用服务端 DeepSeek 接口，配置 `.env.local` 中的 `DEEPSEEK_API_KEY` 后启用。密钥未配置时只显示常见问题与联系入口，不展示不能使用的提问表单，也不伪装成模型回复。可选 Qwen 图片分析接口也使用新的李金波资料，但当前界面不提供上传入口。

## 部署

参考 `deploy/README.md`。本次开发只改本地文件，不会自动发布到原仓库拥有者的网站。

仓库根目录的 md、图片、作品集项目文件及 docs 中的上游历史记录不是本版网站的数据源，也不作为静态资源发布；当前维护说明以项目指南及本 README 为准。

## 参考站视觉改版

本版按原站设计资料调整为：建筑线稿全屏首屏、得意黑姓名、米色履历与能力区、赭红色作品集、深色联系区和便签留言板。设计背景来自仓库原有设计资源；项目封面是标注为「产品流程示意」的图形设计，不冒充真实产品截图。

留言接口为 `/api/board`。Netlify production 设置 `GUESTBOOK_STORAGE=netlify`，使用 Netlify Blobs 持久化，每条留言独立保存；本地仍使用 `web/data/guestbook.json`（Git 已忽略）。留言上限检查为 500 条，昵称 24 字、正文 280 字，单实例同一来源每分钟最多 5 条；上限和限流不提供跨实例事务保证。站点不会加载原站访客留言。
