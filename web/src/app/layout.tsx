import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { profile } from "@/lib/profile";
import Header from "@/components/header";
import ResumeAssistant from "@/components/resume-assistant";
import "./globals.css";
import "./reference.css";
const displayFont = localFont({
  src: "./fonts/SmileySans-Oblique.ttf.woff2",
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: "李金波 · AI 产品经理", template: "%s · 李金波" },
  description: profile.summary,
  openGraph: {
    title: "李金波 · AI 产品经理",
    description: profile.summary,
    locale: "zh_CN",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={displayFont.variable}
    >
      <body>
        <a className="skip-link" href="#main-content">
          跳转至正文
        </a>
        <Header />
        {children}
        <footer className="site-footer container">
          <Link href="/" className="footer-name">
            李金波 <span>AI 产品经理</span>
          </Link>
          <span>建筑行业经验 × AI 产品实践</span>
          <a href="#main-content">返回顶部 ↑</a>
        </footer>
        <ResumeAssistant />
      </body>
    </html>
  );
}
