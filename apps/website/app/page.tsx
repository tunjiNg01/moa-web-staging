import { Button, Card } from "@repo/ui";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-6">
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Turborepo Monorepo
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Welcome to <span className="text-blue-600">Website</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          This project is part of the multi-project Turborepo architecture alongside the Admin dashboard.
        </p>
        <div className="flex gap-4">
          <Button variant="primary">Explore Features</Button>
          <a href="http://localhost:3001" target="_blank" rel="noreferrer">
            <Button variant="outline">Open Admin Dashboard &rarr;</Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card
          title="Shared UI Components"
          description="Rendered via @repo/ui workspace package"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Components are shared between Website and Admin apps without duplicate code or bundling conflicts.
          </p>
          <Button size="sm" variant="secondary">Shared Action</Button>
        </Card>

        <Card
          title="High Performance"
          description="Turborepo Caching & Execution Graph"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Incremental builds, remote/local cache hits, and topological pipeline execution across packages.
          </p>
          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
            turbo run build
          </span>
        </Card>
      </div>
    </main>
  );
}
