"use client";

import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSignup = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSaving(true);
      router.push("/dashboard");
    },
    [router],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 px-4 text-slate-900">
      <div className="max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-2xl shadow-amber-100">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
            Welcome
          </p>
          <h1 className="text-3xl font-semibold leading-tight font-orange-500">회원가입</h1>
          <p className="text-sm text-slate-500">
            기본 정보를 입력하고 새로운 여정을 시작하세요.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSignup}>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">이름</span>
            <input
              required
              type="text"
              name="name"
              placeholder="홍길동"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">이메일</span>
            <input
              required
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">비밀번호</span>
            <input
              required
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
            disabled={saving}
          >
            {saving ? "등록 중..." : "회원가입 완료"}
          </button>
        </form>

        <p className="text-sm text-slate-700">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/"
            className="font-semibold text-amber-600 underline-offset-4 transition hover:text-amber-800"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
