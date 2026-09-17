"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { faqs, profile } from "@/lib/profile";

export default function ResumeAssistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const request = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [boardVisible, setBoardVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const board = document.getElementById("board");
    if (!board) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBoardVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(board);
    return () => observer.disconnect();
  }, [pathname]);

  async function openAssistant() {
    dialog.current?.showModal();
    try {
      const response = await fetch("/api/chat", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setAiEnabled(data.enabled === true);
      }
    } catch {
      // Curated resume answers remain usable without a network connection.
      setAiEnabled(false);
    }
  }

  function stopRequest() {
    request.current?.abort();
  }
  function selectFaq(index: number) {
    stopRequest();
    setSelected(index);
    setAnswer("");
    setStatus("");
  }
  async function ask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim() || busyRef.current) return;
    const controller = new AbortController();
    request.current = controller;
    busyRef.current = true;
    setBusy(true);
    setSelected(null);
    setAnswer("");
    setStatus("正在查阅简历…");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: question.trim() }],
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error === "MISSING_API_KEY"
            ? "自由提问暂未开启。可以点击上方问题查看简历资料，或直接联系我。"
            : data.message || "暂时无法回答，请稍后重试。",
        );
      }
      if (!response.body) throw new Error("暂时无法读取回答，请重试。");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setStatus("");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setAnswer((previous) => previous + text);
      }
      const tail = decoder.decode();
      if (tail) setAnswer((previous) => previous + tail);
    } catch (error) {
      if (!controller.signal.aborted)
        setStatus(
          error instanceof Error ? error.message : "暂时无法回答，请稍后重试。",
        );
    } finally {
      setBusy(false);
      busyRef.current = false;
    }
  }
  return (
    <>
      <button
        className="assistant-launcher"
        hidden={pathname === "/" && boardVisible}
        onClick={openAssistant}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">✳</span> 了解我的经历
      </button>
      <dialog
        ref={dialog}
        className="assistant-dialog"
        aria-labelledby="assistant-title"
        onClose={stopRequest}
        onCancel={stopRequest}
      >
        <div className="assistant-head">
          <div>
            <h2 id="assistant-title">李金波 · 简历问答</h2>
            <p>从项目、技能与教育背景开始了解</p>
          </div>
          <button
            aria-label="关闭简历问答"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        <div className="assistant-body">
          <p className="assistant-intro">
            你好，想了解哪一部分？
            <br />
            下方回答均整理自我的简历。
          </p>
          <div className="faq-buttons">
            {faqs.map((faq, index) => (
              <button
                key={faq.question}
                onClick={() => selectFaq(index)}
                aria-pressed={selected === index}
              >
                {faq.question}
              </button>
            ))}
          </div>
          {selected !== null ? (
            <div className="assistant-answer" aria-live="polite">
              <h3>{faqs[selected].question}</h3>
              <p>{faqs[selected].answer}</p>
            </div>
          ) : null}
          {answer ? (
            <div className="assistant-answer" aria-live="polite">
              {answer.replace(/\*{2,}/g, "")}
            </div>
          ) : null}
          {aiEnabled ? (
            <form className="assistant-form" onSubmit={ask}>
              <label htmlFor="resume-question">也可以向 AI 简历助手提问</label>
              <div className="assistant-input">
                <input
                  id="resume-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={1000}
                  placeholder="例如：有怎样的模型评测经验？"
                  required
                />
                <button disabled={busy || !question.trim()} type="submit">
                  {busy ? "回答中" : "发送"}
                </button>
              </div>
            </form>
          ) : (
            <p className="assistant-status">
              更多项目细节，欢迎通过邮件与我交流。
            </p>
          )}
          <p className="assistant-status" role="status">
            {status}
          </p>
          <a className="assistant-contact" href={`mailto:${profile.email}`}>
            直接通过邮件联系我 ↗
          </a>
        </div>
      </dialog>
    </>
  );
}
