const STATE_LABELS: Record<string, string> = {
  "Base State": "基础状态",
  Locked: "锁定",
  Unlock: "解锁",
  Sleep: "睡眠",
  "Locked Light": "锁定（浅色）",
  "Unlock Light": "解锁（浅色）",
  "Sleep Light": "睡眠（浅色）",
  "Locked Dark": "锁定（深色）",
  "Unlock Dark": "解锁（深色）",
  "Sleep Dark": "睡眠（深色）",
};

export function getStateLabel(state: string): string {
  return STATE_LABELS[state] ?? state;
}
