# 李金波个人网站部署

最后更新：2026-09-17。已发布：https://li-jinbo-portfolio.netlify.app 。`cyjpersonalweb.cn` 仅为设计参考站。

## Netlify production

项目 `li-jinbo-portfolio`，ID `932d120c-3238-4e88-a540-6c0c2ba3de42`。首次使用运行 `netlify login`，然后在 `web` 目录运行：

```powershell
pnpm install --frozen-lockfile
netlify link --id 932d120c-3238-4e88-a540-6c0c2ba3de42
./deploy/Publish-Netlify.ps1
```

脚本读取 `.env.local` 的 DeepSeek 配置，仅通过 `--secret-env` 注入 production 函数。构建插件在函数打包前删除 dotenv 文件。不要省略构建直接上传 `.next`，也不要提交密钥或 `.netlify`。

留言使用 Netlify Blobs，站点环境变量 `GUESTBOOK_STORAGE=netlify` 已配置。正式记录与验证结果见根目录 AGENTS.md。Netlify 公网可用不代表已验证国内所有运营商网络。

## 自有服务器备选方式

在 web 目录运行 `pnpm install --frozen-lockfile`、`pnpm build`、`pnpm start`。
默认端口为 3000。需要 AI 自由提问时，将 `.env.production.example` 复制为 `.env.production` 并配置自己的 DeepSeek 密钥。

也可以使用 `pm2 start ecosystem.config.js` 管理进程，进程名为 `li-jinbo-portfolio`。反向代理模板见 `nginx.conf`，部署前配置自己的域名与证书。

留言板保存到 `web/data/guestbook.json`。使用具有持久化磁盘的单实例 Node 服务，保留 data 目录并定期备份；应用更新时不要删除该目录。多实例或无持久化磁盘平台应先迁移到共享数据库。无需 SQLite 或上游管理员账户。
