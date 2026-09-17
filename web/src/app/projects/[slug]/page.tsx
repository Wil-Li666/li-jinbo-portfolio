import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, profile } from "@/lib/profile";
import Workflow from "@/components/workflow";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title ?? "项目未找到",
    description: project?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content" className="detail-page container">
      <Link className="back-link" href="/#projects">
        ← 返回项目实践
      </Link>
      <header className="detail-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="detail-thesis">{project.shortTitle}</p>
        <div className="detail-meta">
          <span>{project.date}</span>
          <span>{profile.role}</span>
          <span>{index === 2 ? "工作流已跑通" : "已上线"}</span>
        </div>
      </header>
      <div className="detail-metrics">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <span>{m.label}</span>
            <small>{m.context}</small>
          </div>
        ))}
      </div>
      <div className="detail-layout">
        <aside>
          <a href="#context">项目背景</a>
          <a href="#responsibility">我的职责</a>
          <a href="#process">产品实践</a>
          <a href="#results">项目成果</a>
        </aside>
        <div className="detail-content">
          <section id="context">
            <h2>项目背景</h2>
            <p>{project.background}</p>
          </section>
          <section id="responsibility">
            <h2>我的职责</h2>
            <p>{project.role}</p>
            <Workflow steps={project.steps} variant={index} />
          </section>
          <section id="process">
            <h2>产品实践</h2>
            <div className="work-list">
              {project.work.map((item, i) => (
                <article key={item.title}>
                  <span className="work-number">0{i + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="results">
            <h2>项目成果</h2>
            <ul className="outcomes">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <p className="source-note">
              以上内容与数据整理自个人简历。评测结果保留各轮迭代的原有口径。
            </p>
          </section>
        </div>
      </div>
      <div className="next-project">
        <div>
          <span className="eyebrow">继续了解</span>
          <h2>{next.title}</h2>
        </div>
        <Link className="button primary" href={`/projects/${next.slug}`}>
          下一个项目 ↗
        </Link>
      </div>
    </main>
  );
}
