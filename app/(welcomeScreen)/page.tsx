import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-red-500 h-full">
      <Link href="/game">Play</Link>
    </div>
  );
}
