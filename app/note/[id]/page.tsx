import { notFound } from "next/navigation";
import Scene from "../../components/Scenes";
import { NOTES } from "../../data";

export function generateStaticParams() {
  return NOTES.map((_, i) => ({ id: String(i + 1) }));
}

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!NOTES[n - 1]) notFound();
  return <Scene n={n} />;
}