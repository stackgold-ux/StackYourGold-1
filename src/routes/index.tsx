import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

// Read the (optional) business name at request time so the placeholder can be
// personalized by writing site.json — no rebuild needed. Resolves relative to the
// server's working directory (the site root). Falls back to "" if absent/invalid.
const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
      businessName?: string;
    };
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

function Home() {
  const businessName = Route.useLoaderData();
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
        Coming soon
      </span>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        {businessName || "Something new is on the way"}
      </h1>
      <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
        {businessName
          ? `${businessName} is building something. Check back soon.`
          : "We're building something. Check back soon."}
      </p>
      <footer className="absolute bottom-6 text-sm text-gray-400 dark:text-gray-600">
        Built with{" "}
        <a
          href="https://cto.new"
          className="underline hover:text-gray-600 dark:hover:text-gray-400"
        >
          cto.new
        </a>
      </footer>
    </main>
  );
}
