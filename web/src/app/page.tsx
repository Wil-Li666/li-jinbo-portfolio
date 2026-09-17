import Link from "next/link";
import Image from "next/image";
import { profile, projects, skills, faqs } from "@/lib/profile";
import ReferenceHero from "@/components/reference-hero";
import ProjectCover from "@/components/project-cover";
import Guestbook from "@/components/guestbook";

export default function Home() {
  return (
    <main id="main-content" className="reference-home">
      <ReferenceHero />
      <section id="about" className="about-scene scene-pad">
        <div className="chapter-label">ABOUT ME / 关于我</div>
        <h2 className="display-title">ABOUT JINBO LI</h2>
        <div className="about-editorial">
          <div className="identity-column">
            <div className="identity-portrait">
              <Image
                src="/design/li-jinbo-profile-card.png"
                alt="李金波 · AI Product Manager 个人形象卡"
                width={1086}
                height={1448}
                sizes="(max-width: 760px) 90vw, 380px"
              />
            </div>
            <div className="resume-block">
              <h3>EDUCATION / 教育背景</h3>
              <p className="resume-date">2018 — 2022</p>
              <strong>{profile.education}</strong>
              <p>土木工程 · 本科</p>
            </div>
            <a
              className="underlined-link"
              href={profile.resume}
              download="李金波-AI产品经理.pdf"
            >
              下载完整简历 <span>↓</span>
            </a>
          </div>
          <div className="experience-column">
            <p className="personal-statement">
              理解真实场景，
              <br />让 <em>AI</em> 进入工作流程。
            </p>
            <p className="personal-summary">{profile.summary}</p>
            <div className="resume-block">
              <h3>WORK / 工作经历</h3>
              <strong>{profile.company}</strong>
              <p>AI 产品经理</p>
            </div>
            <div className="about-projects">
              {projects.map((project, index) => (
                <article key={project.slug}>
                  <span className="project-letter">
                    {["a", "b", "c"][index]}.
                  </span>
                  <div>
                    <div className="about-project-title">
                      <h3>{project.title}</h3>
                      <span>{project.date}</span>
                    </div>
                    <p>{project.role}</p>
                    <Link href={`/projects/${project.slug}`}>查看项目 ↗</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <a className="chapter-next" href="#skills">
          继续了解我的能力 ↓
        </a>
      </section>
      <section id="skills" className="skills-scene scene-pad">
        <div className="skills-intro">
          <div>
            <span className="chapter-label">CAPABILITIES / 能力与工具</span>
            <h2>
              把问题拆清楚，
              <br />
              把方案做出来。
            </h2>
          </div>
          <p>
            从用户需求、产品设计，
            <br />到 RAG 评测与工作流迭代。
          </p>
        </div>
        <div className="capability-table">
          {skills.map((skill, index) => (
            <details key={skill.title} open={index === 0}>
              <summary>
                <span className="skill-index">
                  {["AI", "PM", "TOOL"][index]}
                </span>
                <h3>{skill.title}</h3>
                <span className="summary-description">{skill.description}</span>
                <span className="expand-symbol">＋</span>
              </summary>
              <div className="capability-content">
                <p>{skill.description}</p>
                <div>
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
        <div className="skill-bottom">
          <span>DOMAIN KNOWLEDGE</span>
          <span>PRODUCT THINKING</span>
          <span>AI EXECUTION</span>
        </div>
      </section>
      <section id="projects" className="portfolio-scene scene-pad">
        <span className="chapter-label">SELECTED WORK / 项目实践</span>
        <h2 className="display-title">PORTFOLIO</h2>
        <p className="portfolio-lead">建筑行业里的三个 AI 产品实践。</p>
        <div className="portfolio-section-head">
          <h3>
            AI 产品 <span>AI PRODUCTS</span>
          </h3>
          <span>2023 — 2026 / 3 PROJECTS</span>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <article className="portfolio-item" key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="cover-link"
                aria-label={`查看${project.title}项目详情`}
              >
                <ProjectCover index={index} />
                <span className="cover-open">打开项目 ↗</span>
              </Link>
              <div className="portfolio-item-meta">
                <span>{project.date}</span>
                <span>
                  <i />
                  {index === 2 ? "工作流已跑通" : "已上线"}
                </span>
              </div>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.description}</p>
              <div className="portfolio-result">
                <strong>{project.metrics[0].value}</strong>
                <span>{project.metrics[0].label}</span>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`阅读${project.title}详情`}
                >
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="portfolio-domain">
          <span>MY FOUNDATION</span>
          <strong>
            土木工程背景 <span>×</span> AI 产品实践
          </strong>
          <p>质检管理 / 规范知识 / 合同审查</p>
        </div>
      </section>
      <section id="contact" className="contact-scene scene-pad">
        <div className="contact-pixels" aria-hidden="true" />
        <div className="contact-scene-content">
          <span className="chapter-label">LET’S CONNECT / 联系方式</span>
          <h2 className="display-title">GET IN TOUCH</h2>
          <p className="contact-opening">
            一个真实的业务问题，
            <br />
            可能就是下一次交流的开始。
          </p>
          <div className="contact-columns">
            <div className="contact-resume">
              <span className="contact-mini-label">MEET JINBO / 快速了解</span>
              <h3>先从我的经历聊起。</h3>
              <p>这里整理了项目、评测与工作背景的常见问题。</p>
              <div className="contact-faq">
                {faqs.slice(0, 3).map((faq) => (
                  <details key={faq.question}>
                    <summary>
                      {faq.question}
                      <span>＋</span>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="contact-directory">
              <a href={`mailto:${profile.email}`}>
                <span>EMAIL</span>
                <strong>{profile.email}</strong>
                <span>↗</span>
              </a>
              <a href={`tel:${profile.phoneHref}`}>
                <span>PHONE</span>
                <strong>{profile.phone}</strong>
                <span>↗</span>
              </a>
              <a href={profile.resume} download="李金波-AI产品经理.pdf">
                <span>RESUME</span>
                <strong>李金波 · AI 产品经理</strong>
                <span>↓</span>
              </a>
              <p>期待与你交流 AI 产品机会。</p>
            </div>
          </div>
          <Guestbook />
        </div>
      </section>
    </main>
  );
}
