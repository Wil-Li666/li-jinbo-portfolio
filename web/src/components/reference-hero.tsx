"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";

export default function ReferenceHero() {
  const scene = useRef<HTMLElement>(null);
  function move(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    scene.current?.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  }
  return (
    <section
      ref={scene}
      id="card"
      className="intro-scene"
      onPointerMove={move}
      aria-labelledby="intro-name"
    >
      <div className="intro-art" aria-hidden="true" />
      <div className="intro-veil" aria-hidden="true" />
      <div className="intro-cross" aria-hidden="true">
        <i />
        <b />
      </div>
      <span className="drawing-corner corner-tl" aria-hidden="true" />
      <span className="drawing-corner corner-br" aria-hidden="true" />
      <div className="intro-center">
        <p className="intro-overline">CIVIL ENGINEERING × AI PRODUCT</p>
        <h1 id="intro-name">李金波</h1>
        <p className="intro-equation">
          Industry <span>+</span> AI <span>=</span> <strong>Impact.</strong>
        </p>
        <p className="intro-caption">
          JINBO LI <span>·</span> AI 产品经理
        </p>
        <div className="intro-links">
          <a href="#projects" className="intro-solid">
            查看作品集 <span>↗</span>
          </a>
          <a href="#contact">
            联系方式 <span>↗</span>
          </a>
        </div>
        <div className="intro-keywords">
          <span>Agentic RAG</span>
          <span>产品设计</span>
          <span>模型评测</span>
          <span>工作流搭建</span>
        </div>
      </div>
      <div className="intro-bottom">
        <span>
          <i /> 求职意向 · AI 产品经理
        </span>
        <a href="#about" aria-label="向下浏览关于我">
          SCROLL TO EXPLORE <b>↓</b>
        </a>
        <span className="intro-sheet">PERSONAL PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
