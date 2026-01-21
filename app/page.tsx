"use client";

import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSaving(true);
      setError(null);

      const formData = new FormData(event.currentTarget);
      const payload = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(
            (data as { message?: string }).message ||
              "로그인에 실패했습니다.",
          );
        }

        router.push("/dashboard");
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError.message);
        } else {
          setError("로그인 요청에 실패했습니다.");
        }
      } finally {
        setSaving(false);
      }
    },
    [router],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 px-4 text-slate-900">
      <div className="max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-2xl shadow-amber-100">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Gym Management
          </p>
          <h1 className="text-3xl font-semibold leading-tight">로그인</h1>
          <p className="text-sm text-slate-500">
            계정 정보를 입력하면 대시보드에 바로 연결됩니다.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleLogin}>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">이메일</span>
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              placeholder="name@example.com"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">비밀번호</span>
            <input
              required
              type="password"
              name="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
            disabled={saving}
          >
            {saving ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-sm text-slate-300">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-orange-500 underline-offset-4 transition hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
