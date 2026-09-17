"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { GuestNote } from "@/lib/guestbook";

export default function Guestbook() {
  const [notes, setNotes] = useState<GuestNote[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState<GuestNote["color"]>("cream");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  const locked = useRef(false);
  async function load(signal?: AbortSignal) {
    try {
      const response = await fetch("/api/board", { cache: "no-store", signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (!signal?.aborted) setNotes(data.notes);
    } catch (error) {
      if (!signal?.aborted) {
        setLoadFailed(true);
        setStatus(
          error instanceof Error ? error.message : "留言加载失败，请重试。",
        );
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/board", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data.notes as GuestNote[];
      })
      .then((data) => {
        if (!controller.signal.aborted) setNotes(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setLoadFailed(true);
          setStatus(
            error instanceof Error ? error.message : "留言加载失败，请重试。",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, body, color }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setNotes((previous) => [data.note, ...previous]);
      setBody("");
      setStatus("留言已贴上，谢谢你的到访！");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "留言未保存，请重试。",
      );
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }
  return (
    <section id="board" className="guestbook">
      <div className="guestbook-heading">
        <div>
          <span className="chapter-label">GUESTBOOK</span>
          <h3>来都来了，留句话吧。</h3>
        </div>
        <span>{notes.length} 张便签 / HELLO, STRANGER</span>
      </div>
      <div className="board-layout">
        <div className="note-canvas" aria-label="访客留言">
          <div className="board-grid" aria-hidden="true" />
          {loading ? (
            <p className="board-empty">正在打开留言板…</p>
          ) : loadFailed ? (
            <div className="board-empty">
              <p>留言暂时未能加载</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setLoadFailed(false);
                  setStatus("");
                  void load();
                }}
              >
                重新加载 ↻
              </button>
            </div>
          ) : notes.length === 0 ? (
            <div className="board-empty">
              <span aria-hidden="true">↙</span>
              <strong>第一张便签，留给你。</strong>
              <p>聊聊产品、建筑，或是简单打个招呼。</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <article
                  className={`paper-note note-${note.color}`}
                  key={note.id}
                >
                  <span className="note-clip" aria-hidden="true">
                    ⌇
                  </span>
                  <p>{note.body}</p>
                  <footer>
                    <strong>{note.name}</strong>
                    <time dateTime={note.createdAt}>
                      {new Date(note.createdAt).toLocaleDateString("zh-CN", {
                        timeZone: "Asia/Shanghai",
                      })}
                    </time>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
        <form className={`note-form note-${color}`} onSubmit={submit}>
          <span className="note-form-title">
            WRITE A NOTE <span>↗</span>
          </span>
          <label htmlFor="guest-name">怎么称呼你</label>
          <input
            id="guest-name"
            maxLength={24}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="你的昵称"
          />
          <label htmlFor="guest-message">想说的话</label>
          <textarea
            id="guest-message"
            maxLength={280}
            required
            rows={4}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="关于 AI、产品，或者一句问候…"
          />
          <div className="note-options">
            <div role="group" aria-label="便签颜色">
              {(["cream", "pink", "green"] as const).map((value, index) => (
                <button
                  type="button"
                  key={value}
                  className={`color-dot note-${value}`}
                  aria-label={["米黄便签", "粉色便签", "绿色便签"][index]}
                  aria-pressed={color === value}
                  onClick={() => setColor(value)}
                >
                  {color === value ? "✓" : ""}
                </button>
              ))}
            </div>
            <span>{body.length}/280</span>
          </div>
          <button
            className="post-note"
            type="submit"
            disabled={
              busy || loading || loadFailed || !name.trim() || !body.trim()
            }
          >
            {busy ? "正在贴上…" : "贴上便签 ↗"}
          </button>
          <p className="note-public-hint">留言会公开显示在这里。</p>
          <p className="note-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
