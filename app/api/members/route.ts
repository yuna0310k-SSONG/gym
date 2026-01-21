import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      {
        status: 401,
      },
    );
  }

  const response = await fetch(
    "https://newgym-1qof.onrender.com/api/members",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    return NextResponse.json(
      {
        message:
          errorBody?.message ||
          "회원 추가 요청을 처리하지 못했습니다 (백엔드 오류).",
      },
      {
        status: response.status,
      },
    );
  }

  const data = await response.json().catch(() => null);

  return NextResponse.json({
    ...data,
  });
}
