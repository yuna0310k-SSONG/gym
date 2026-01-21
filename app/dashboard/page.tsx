import Link from "next/link";
import { members } from "@/lib/members";

const highlightCards = [
  { label: "평균 달성률", value: "72%", meta: "전체 프로그램 기준" },
  { label: "위험(Red) 회원", value: "4명", meta: "즉각 확인 필요" },
  { label: "미입력 측정", value: "8건", meta: "검증 대기 중" },
];

const statusColor = {
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Trial: "bg-slate-100 text-slate-800",
} as const;

export default function DashboardPage() {
  return (
    <section className="space-y-8 text-slate-800">
      <div className="grid gap-4 md:grid-cols-3">
        {highlightCards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-amber-100"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              {card.label}
            </p>
            <p className="text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="text-sm text-slate-500">{card.meta}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-md shadow-amber-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">
              회원 관리 리스트
            </h3>
            <p className="text-sm text-slate-500">
              회원명/프로그램/진행 상태를 모니터링하고, 상세로 이동하세요.
            </p>
          </div>
          <Link
            href="/dashboard/members"
            className="text-sm font-semibold text-amber-600 underline-offset-4 transition hover:text-amber-800 hover:underline"
          >
            회원 전체 보기 →
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <span>회원명</span>
            <span>핵심 목표</span>
            <span>프로그램</span>
            <span>진행도</span>
            <span>상태</span>
          </div>
          <div className="space-y-1">
            {members.map((member) => (
              <Link
                key={member.id}
                href={`/dashboard/members/${member.id}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 transition hover:bg-slate-100"
              >
                <p className="text-base font-semibold text-slate-900">
                  {member.name}
                </p>
                <p className="text-sm text-slate-600">{member.goal}</p>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-slate-700">
                    {member.membership}
                  </p>
                  <p className="text-xs text-slate-500">{member.programWeeks}</p>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {member.progress}% 달성
                  </p>
                </div>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-tight ${
                    statusColor[member.status]
                  }`}
                >
                  {member.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
