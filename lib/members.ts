export type Member = {
  id: string;
  name: string;
  membership: string;
  programWeeks: string;
  status: "Active" | "Paused" | "Trial";
  joinedOn: string;
  goal: string;
  lastVisit: string;
  progress: number;
};

export const members: Member[] = [
  {
    id: "1",
    name: "김철수",
    membership: "플래티넘",
    programWeeks: "12주",
    status: "Active",
    joinedOn: "2023-01-10",
    goal: "근력 향상",
    lastVisit: "2026-01-18",
    progress: 82,
  },
  {
    id: "2",
    name: "홍길동",
    membership: "골드",
    programWeeks: "8주",
    status: "Paused",
    joinedOn: "2022-08-22",
    goal: "체중 감량",
    lastVisit: "2025-12-02",
    progress: 45,
  },
  {
    id: "3",
    name: "이영희",
    membership: "실버",
    programWeeks: "8주",
    status: "Trial",
    joinedOn: "2025-11-05",
    goal: "컨디셔닝",
    lastVisit: "2026-01-20",
    progress: 34,
  },
  {
    id: "4",
    name: "박민수",
    membership: "플래티넘",
    programWeeks: "12주",
    status: "Active",
    joinedOn: "2024-03-13",
    goal: "근지구력",
    lastVisit: "2026-01-19",
    progress: 68,
  },
  {
    id: "5",
    name: "최지은",
    membership: "골드",
    programWeeks: "10주",
    status: "Active",
    joinedOn: "2023-05-30",
    goal: "체형 교정",
    lastVisit: "2026-01-20",
    progress: 76,
  },
];

export const getMemberById = (memberId: string) =>
  members.find((member) => member.id === memberId);
