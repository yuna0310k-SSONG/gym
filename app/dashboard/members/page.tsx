"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { members } from "@/lib/members";

type MemberRequest = {
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  status: "ACTIVE" | "INACTIVE" | "PAUSED";
  height: number;
  weight: number;
  birthDate: string;
  gender: "MALE" | "FEMALE" | "OTHER";
};

const defaultForm: MemberRequest = {
  name: "",
  phone: "",
  email: "",
  joinDate: "",
  status: "ACTIVE",
  height: 170,
  weight: 70,
  birthDate: "",
  gender: "MALE",
};

export default function MemberListPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<MemberRequest>(defaultForm);
  const [requestState, setRequestState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const handleInputChange = (key: keyof MemberRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]:
        key === "height" || key === "weight"
          ? Number(value)
          : (value as MemberRequest[keyof MemberRequest]),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState({ status: "loading" });

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ||
            "회원 추가 요청을 처리하지 못했습니다.",
        );
      }

      setRequestState({ status: "success", message: "회원이 등록되었습니다." });
      setFormData(defaultForm);
      setShowForm(false);
    } catch (error) {
      if (error instanceof Error) {
        setRequestState({ status: "error", message: error.message });
      } else {
        setRequestState({
          status: "error",
          message: "네트워크 요청에 실패했습니다.",
        });
      }
    }
  };

  const statusBadge = useMemo(
    () => ({
      ACTIVE: "bg-emerald-100 text-emerald-700",
      PAUSED: "bg-amber-100 text-amber-700",
      INACTIVE: "bg-slate-100 text-slate-800",
    }),
    [],
  );

  return (
    <section className="space-y-6 text-slate-800">
      <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Members
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">회원목록</h2>
          <p className="text-sm text-slate-500">
            회원 상세 정보를 확인하거나 필요한 조치를 바로 취할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:border-amber-400 hover:text-amber-600"
        >
          {showForm ? "등록 취소" : "회원 추가"}
        </button>
      </header>

      {showForm && (
        <form
          className="space-y-4 rounded-2xl border border-slate-100 bg-white/90 p-6 shadow"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "이름", key: "name", type: "text" },
              { label: "연락처", key: "phone", type: "text" },
              { label: "이메일", key: "email", type: "email" },
              { label: "가입일", key: "joinDate", type: "date" },
              { label: "생년월일", key: "birthDate", type: "date" },
              { label: "신장(cm)", key: "height", type: "number" },
              { label: "체중(kg)", key: "weight", type: "number" },
            ].map((field) => (
              <label
                key={field.key}
                className="space-y-1 text-sm text-slate-600"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {field.label}
                </span>
                <input
                  required
                  type={field.type}
                  value={formData[field.key as keyof MemberRequest]}
                  onChange={(event) =>
                    handleInputChange(
                      field.key as keyof MemberRequest,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-amber-400 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-600">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                가입 상태
              </span>
              <select
                required
                value={formData.status}
                onChange={(event) =>
                  handleInputChange(
                    "status",
                    event.target.value as MemberRequest["status"],
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-amber-400 focus:outline-none"
              >
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </label>
            <label className="space-y-1 text-sm text-slate-600">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                성별
              </span>
              <select
                required
                value={formData.gender}
                onChange={(event) =>
                  handleInputChange(
                    "gender",
                    event.target.value as MemberRequest["gender"],
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-amber-400 focus:outline-none"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded-2xl bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
              disabled={requestState.status === "loading"}
            >
              {requestState.status === "loading" ? "등록 중…" : "회원 등록"}
            </button>
            {requestState.message && (
              <p
                className={`text-sm font-semibold ${
                  requestState.status === "error"
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {requestState.message}
              </p>
            )}
          </div>
        </form>
      )}

      <div className="space-y-4">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/dashboard/members/${member.id}`}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 transition hover:border-amber-300 hover:bg-amber-50"
          >
            <div>
              <p className="text-lg font-semibold text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-500">
                가입일 {member.joinedOn} · {member.membership}
              </p>
            </div>
            <span
              className={`text-xs font-semibold ${
                statusBadge[
                  member.status === "Active"
                    ? "ACTIVE"
                    : member.status === "Paused"
                    ? "PAUSED"
                    : "INACTIVE"
                ]
              }`}
            >
              상태: {member.status}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
