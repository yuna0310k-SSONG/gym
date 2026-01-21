import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/members";

export const metadata = {
  title: "회원 상세 | Gym Portal",
};

type MemberDetailPageProps = {
  params: {
    id: string;
  };
};

const progressPhases = [
  { label: "Start", value: "0%", position: 0 },
  { label: "2주", value: "20%", position: 20 },
  { label: "4주", value: "40%", position: 40 },
  { label: "6주", value: "60%", position: 60 },
  { label: "8주", value: "80%", position: 80 },
  { label: "Now", value: "100%", position: 100 },
];

const focusTasks = [
  { label: "운동 가이드", items: ["스쿼트 3세트", "대퇴부 스트레칭"] },
  { label: "식단 체크", items: ["채소 중심 2끼", "간식 줄이기"] },
  { label: "생활 습관", items: ["수면 7시간 이상", "수분 2L 이상"] },
];

const aiNotes = [
  {
    level: "상승", // label for badge maybe existing?
    message: "근력 지표가 상승 추세입니다. 다음 주 스쿼트 무게를 5% 상승 유지하세요.",
  },
  {
    level: "알림",
    message: "주말 식단 데이터가 누락되었습니다. 생활 습관 탭에 로그를 입력해주세요.",
  },
];

export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <section className="space-y-8 text-slate-800">
      <Link
        href="/dashboard/members"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        ← 전체 대시보드로 돌아가기
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Main Goal
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                {member.goal}
              </h2>
              <p className="text-sm text-slate-500">체지방 10kg 감량</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-amber-600">{member.progress}%</p>
              <p className="text-xs text-slate-500">달성률</p>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Progress Roadmap</span>
              <span>Phase 2</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${member.progress}%` }}
                />
              </div>
              <div className="grid grid-cols-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {progressPhases.map((phase) => (
                  <span key={phase.label} className="text-center">
                    {phase.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-amber-50 p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                {member.name} 회원님
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                {member.membership} · {member.programWeeks}
              </h3>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-700">
              상태: {member.status}
            </span>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>가입일: {member.joinedOn}</p>
            <p>최근 방문: {member.lastVisit}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow">
        <div className="grid gap-6 lg:grid-cols-3">
          {["Body (체성분)", "Strength (근력)", "Conditioning (체력)"].map(
            (label, index) => (
              <div key={label} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 0
                        ? "bg-emerald-500"
                        : index === 1
                        ? "bg-sky-500"
                        : "bg-orange-500"
                    }`}
                  />
                </div>
                <p className="text-3xl font-semibold text-slate-900">
                  {index === 0 ? 78 : index === 1 ? 85 : 62}점
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• 주요 지표 A: {index === 0 ? "체중 68kg" : "Squat 135kg"}</li>
                  <li>• 주요 지표 B: {index === 0 ? "체지방 16%" : "Bench 95kg"}</li>
                  <li>• 주요 지표 C: {index === 0 ? "근육량 +" : "Dead 180kg"}</li>
                </ul>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {focusTasks.map((task) => (
          <div
            key={task.label}
            className="space-y-3 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              {task.label}
            </p>
            <div className="space-y-2">
              {task.items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-600 shadow-sm"
                >
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-amber-500" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-900/10 bg-slate-950 p-6 text-white shadow-2xl">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              AI 스마트 코칭 피드백
            </p>
            <h4 className="text-2xl font-semibold">Phase 2 분석 완료</h4>
          </div>
          <button className="rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-slate-950">
            코칭 내용 회원에게 전달하기
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {aiNotes.map((note) => (
            <div
              key={note.message}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                {note.level}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                {note.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
