import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>这个页面已不在这里。</h1>
      <p>你可以回到首页，查看李金波的项目经历与联系方式。</p>
      <Link className="button primary" href="/">
        返回首页 ↗
      </Link>
    </main>
  );
}
