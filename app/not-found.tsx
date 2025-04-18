import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-6">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <div className="text-8xl font-extrabold text-muted-foreground">404</div>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for either doesn&apos;t exist or is currently not available.
      </p>
      <Button asChild size="lg" className="mt-4">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
} 