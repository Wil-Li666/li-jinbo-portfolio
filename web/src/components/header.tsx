"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState("header-light");
  const pathname = usePathname();
  useEffect(() => {
    const sections = document.querySelectorAll(".reference-home > section");
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry)
          setTone(
            entry.target.id === "contact"
              ? "header-dark"
              : entry.target.id === "projects"
                ? "header-warm"
                : "header-light",
          );
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header
      className={`site-header ${pathname === "/" ? tone : "header-light"}`}
    >
      <div className="container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="李金波，首页"
          onClick={() => setOpen(false)}
        >
          <span className="brand-signal" aria-hidden="true">
            ↗
          </span>
          <strong>李金波</strong>
          <span className="brand-role">JINBO LI / AI PRODUCT</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "关闭 ✕" : "菜单 ☰"}
        </button>
        <nav
          id="main-nav"
          aria-label="主导航"
          className={open ? "nav-open" : ""}
        >
          {[
            ["关于我", "/#about"],
            ["能力工具", "/#skills"],
            ["作品集", "/#projects"],
            ["联系方式", "/#contact"],
            ["留言板", "/#board"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a
            className="nav-resume"
            href={profile.resume}
            download="李金波-AI产品经理.pdf"
          >
            下载简历 ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
