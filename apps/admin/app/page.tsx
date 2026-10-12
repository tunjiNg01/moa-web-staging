import { Button, Card } from "@repo/ui";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              A
            </span>
            <span className="text-xl font-bold tracking-tight text-white">Admin Hub</span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-slate-800 text-white">
              Dashboard Overview
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              Users & Permissions
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              Content Manager
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              System Settings
            </a>
          </nav>
        </div>

        <div className="text-xs text-slate-500">
          Admin Portal • Port 3001
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Console
            </span>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <a href="http://localhost:3000" target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">Go to Website &rarr;</Button>
            </a>
            <Button variant="primary" size="sm">New Action</Button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Active Sessions" description="Live concurrent users">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">1,428</div>
            <span className="text-xs text-emerald-600 font-medium">↑ +12.4% vs last week</span>
          </Card>
          <Card title="Workspace Health" description="Monorepo build status">
            <div className="text-3xl font-bold text-emerald-600">Optimal</div>
            <span className="text-xs text-slate-500 font-medium">Turborepo Cache Active</span>
          </Card>
          <Card title="Connected Apps" description="Microservices and web apps">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">2 Apps</div>
            <span className="text-xs text-indigo-600 font-medium">website & admin</span>
          </Card>
        </div>

        <Card title="Shared Architecture Status" description="Cross-package orchestration in Turborepo">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            The Admin dashboard consumes the shared UI library (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@repo/ui</code>) and shared utility suite (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@repo/utils</code>).
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm">Audit Dependencies</Button>
            <Button variant="ghost" size="sm">View Turbo Pipeline</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
