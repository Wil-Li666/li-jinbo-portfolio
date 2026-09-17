# 李金波 · AI 产品经理求职网站开发指南

最后更新：2026-09-17。

## 当前状态

网站已完成改版并部署至 https://li-jinbo-portfolio.netlify.app ，资料属于李金波。部署状态和发布命令以根目录 AGENTS.md 为准。`cyjpersonalweb.cn` 是设计参考站，不是本项目的部署地址。

## 内容来源与联系方式

- 资料来源：用户提供的「李金波-AI产品经理.docx」及后续明确修订。
- 邮箱：1033742131@qq.com；手机号：13986883177。
- 学校：湖北第二师范学院，土木工程，本科，2018—2022。
- 工作单位：中国十五冶金建设集团有限公司；未推断任职起止日期。
- 网站统一资料源：`web/src/lib/profile.ts`；邮件、拨号链接和 AI 助手知识同步使用该数据源。
- 下载文件 `web/public/resume/li-jinbo-ai-product-manager.pdf` 已于 2026-09-17 替换为用户提供的新版 PDF；网站不再提供原 DOCX 下载。

| 项目 | 用户确认的项目时间 | 详情路由 |
| --- | --- | --- |
| 建筑施工质检情报员 | 2025.12—2026.08 | `/projects/quality-inspector` |
| 建规景规范智能问答助手 | 2025.02—2025.10 | `/projects/building-standards` |
| 合同审查助手 | 2023.12—2024.12 | `/projects/contract-review` |

不同轮次评测指标单独呈现，保持简历中的个人参与边界，不补造履历或成果。

## 页面与视觉

首页包含建筑线稿首屏、关于我、能力工具、作品集、联系方式及留言板。主要锚点为 `#about`、`#skills`、`#projects`、`#contact`、`#board`。

参考原站设计，使用米色履历区、赭红作品集和深色联系区。项目封面标注为「产品流程示意」，不作为真实产品截图。

教育背景上方已替换为生成的人物形象卡：`web/public/design/li-jinbo-profile-card.png`（1086 × 1448）。以用户提供的 P1 为深蓝卡片风格参考、P2 为人物参考，标题为「李金波 / AI Product Manager」。使用内置图片生成工具制作，网页通过 Next Image 展示，保持完整比例，手机端同样位于教育背景上方。

## 技术与维护入口

- Next.js 16.2.6 App Router、React 19.2.4、TypeScript 6、Tailwind CSS 4；当前构建使用 Turbopack。
- `web/src/app/page.tsx`：首页结构。
- `web/src/app/reference.css`：参考站风格与响应式样式；`globals.css` 保留通用、详情页和助手样式。
- `web/src/app/projects/[slug]/page.tsx`：三个静态生成的详情页。
- `web/src/components/resume-assistant.tsx`：简历问答；常见问答无需密钥，自由提问需服务端 `DEEPSEEK_API_KEY`。
- `web/src/lib/guestbook.ts` 与 `/api/board`：线上留言持久化到 Netlify Blobs，本地使用 `web/data/guestbook.json`，无上游管理员账户或旧访客数据。

留言昵称最多 24 字，正文最多 280 字，最多保存 500 条，同一来源每分钟最多提交 5 条。Netlify production 使用 Blobs 独立保存每条留言；限流与数量上限不是跨实例事务保证。

## 运行与验证

在 `web` 目录执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

本机生产预览：

```sh
pnpm lint
pnpm build
pnpm start --hostname 127.0.0.1
```

最近验证：人物卡更新后 lint 与构建通过，桌面和手机视口图片加载成功、无横向溢出；联系方式更新后构建通过，HTTP 页面包含新邮箱及拨号链接，不含旧邮箱。

部署操作说明见 [web/deploy/README.md](../web/deploy/README.md)。已完成 Netlify production 发布，详情见根目录 AGENTS.md。

## 历史资料

原项目指南归档于 [archive/PROJECT_GUIDE-upstream-2026-06-04.md](archive/PROJECT_GUIDE-upstream-2026-06-04.md)。开发日志中的旧日期记录、面试准备材料、原始作品集资料仅供溯源，不作为当前人物事实或部署状态依据。
