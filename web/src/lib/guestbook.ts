import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";

export type GuestNote = {
  id: string;
  name: string;
  body: string;
  color: "cream" | "pink" | "green";
  createdAt: string;
};
const dataFile = path.join(process.cwd(), "data", "guestbook.json");
let pendingWrite: Promise<unknown> = Promise.resolve();

function cloudStore() {
  return process.env.GUESTBOOK_STORAGE === "netlify" || process.env.NETLIFY === "true"
    ? getStore({ name: "portfolio-guestbook", consistency: "strong" })
    : null;
}

export async function readNotes(): Promise<GuestNote[]> {
  const store = cloudStore();
  if (store) {
    const { blobs } = await store.list({ prefix: "notes/" });
    const notes = await Promise.all(
      blobs.map(({ key }) => store.get(key, { type: "json" }) as Promise<GuestNote | null>),
    );
    return notes.filter((note): note is GuestNote => note !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 500);
  }
  try {
    const data: unknown = JSON.parse(await readFile(dataFile, "utf8"));
    if (!Array.isArray(data)) throw new Error("Invalid guestbook data");
    return data as GuestNote[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function addNote(
  input: Pick<GuestNote, "name" | "body" | "color">,
): Promise<GuestNote> {
  const operation = pendingWrite.then(async () => {
    const notes = await readNotes();
    if (notes.length >= 500) throw new Error("BOARD_FULL");
    const note: GuestNote = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const store = cloudStore();
    if (store) {
      // One object per note prevents concurrent writers overwriting each other.
      await store.setJSON(`notes/${note.id}`, note);
      return note;
    }
    const destination = dataFile;
    await mkdir(path.dirname(destination), { recursive: true });
    const temp = `${destination}.${note.id}.tmp`;
    await writeFile(temp, JSON.stringify([note, ...notes], null, 2), "utf8");
    await rename(temp, destination);
    return note;
  });
  pendingWrite = operation.catch(() => undefined);
  return operation;
}
