import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="mx-auto h-1/2 w-full max-w-3xl border">
        <Button asChild>
          <Link href="/today">Go to Today</Link>
        </Button>
      </div>
    </main>
  );
}
