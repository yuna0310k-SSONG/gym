import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/70 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Gym Portal
            </p>
            <h1 className="text-lg font-semibold">관리 대시보드</h1>
          </div>
          <nav className="flex gap-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="rounded-full border border-slate-300 px-4 py-2 transition hover:border-slate-500"
            >
              개요
            </Link>
            <Link
              href="/dashboard/members"
              className="rounded-full border border-slate-300 px-4 py-2 transition hover:border-slate-500"
            >
              회원목록
            </Link>
          </nav>
        </div>
      </header>
      <main className="px-6 py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
