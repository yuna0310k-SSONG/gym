import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = "https://newgym-1qof.onrender.com";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const response = await fetch(`${BACKEND_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          responseBody?.message ||
          "로그인 요청을 처리하지 못했습니다 (백엔드 오류).",
      },
      {
        status: response.status,
      },
    );
  }

  const accessToken = responseBody?.data?.accessToken;
  const refreshToken = responseBody?.data?.refreshToken;

  const nextRes = NextResponse.json({
    message: responseBody?.message ?? "로그인 성공",
    user: responseBody?.data?.user ?? null,
  });

  if (accessToken) {
    nextRes.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (refreshToken) {
    nextRes.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return nextRes;
}
