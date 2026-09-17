import { NextResponse } from "next/server";
import { addNote, readNotes } from "@/lib/guestbook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const recent = new Map<string, number[]>();

export async function GET() {
  try {
    return NextResponse.json(
      { notes: await readNotes() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { message: "留言暂时无法加载，请稍后重试。" },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 4096)
    return NextResponse.json({ message: "留言内容过长。" }, { status: 413 });
  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096)
      return NextResponse.json({ message: "留言内容过长。" }, { status: 413 });
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { message: "请填写有效的留言。" },
      { status: 400 },
    );
  }
  if (!data || typeof data !== "object")
    return NextResponse.json(
      { message: "请填写有效的留言。" },
      { status: 400 },
    );
  const { name, body, color } = data as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 24 ||
    typeof body !== "string" ||
    !body.trim() ||
    body.trim().length > 280 ||
    !["cream", "pink", "green"].includes(String(color))
  ) {
    return NextResponse.json(
      { message: "昵称需为 1–24 字，留言需为 1–280 字，请选择便签颜色。" },
      { status: 400 },
    );
  }
  const now = Date.now();
  for (const [key, values] of recent)
    if (values.every((time) => time < now - 60_000)) recent.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const history = (recent.get(ip) || []).filter((time) => time > now - 60_000);
  if (history.length >= 5)
    return NextResponse.json(
      { message: "留言太快了，请一分钟后再试。" },
      { status: 429 },
    );
  recent.set(ip, [...history, now]);
  try {
    const note = await addNote({
      name: name.trim(),
      body: body.trim(),
      color: color as "cream" | "pink" | "green",
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("[guestbook] save failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        message:
          error instanceof Error && error.message === "BOARD_FULL"
            ? "留言板已满，欢迎通过邮件联系我。"
            : "留言暂时无法保存，请稍后重试。",
      },
      { status: 503 },
    );
  }
}
