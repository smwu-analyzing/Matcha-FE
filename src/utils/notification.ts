export type NotificationState =
  | "granted"
  | "denied"
  | "default"
  | "unsupported";

export type AlertTiming = 5 | 10 | 20;

export type AlertSettings = {
  exitAlert: boolean;
  riskAlert: boolean;
  timing: AlertTiming;
};

const PROMPTED_KEY = "matcha:notification-prompted";
const SETTINGS_KEY = "matcha:notification-settings";
const DEFAULT_SETTINGS: AlertSettings = {
  exitAlert: true,
  riskAlert: true,
  timing: 10,
};

// localStorage를 못 쓰는 환경(시크릿 모드 일부 등)에서도 이번 방문 동안은 값을 유지해요
let promptSeenInMemory = false;
let settingsInMemory: AlertSettings | null = null;

export function getNotificationState(): NotificationState {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationState> {
  if (typeof Notification === "undefined") return "unsupported";
  return await Notification.requestPermission();
}

// 06-A를 이미 보여줬는지(처음 방문 판별용)
export function hasSeenNotificationPrompt(): boolean {
  if (promptSeenInMemory) return true;
  try {
    return localStorage.getItem(PROMPTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markNotificationPromptSeen() {
  promptSeenInMemory = true;
  try {
    localStorage.setItem(PROMPTED_KEY, "1");
  } catch {
    // 저장소를 못 쓰면 메모리 값만 사용
  }
}

const isTiming = (value: unknown): value is AlertTiming =>
  value === 5 || value === 10 || value === 20;

export function loadAlertSettings(): AlertSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        exitAlert:
          typeof parsed.exitAlert === "boolean"
            ? parsed.exitAlert
            : DEFAULT_SETTINGS.exitAlert,
        riskAlert:
          typeof parsed.riskAlert === "boolean"
            ? parsed.riskAlert
            : DEFAULT_SETTINGS.riskAlert,
        timing: isTiming(parsed.timing)
          ? parsed.timing
          : DEFAULT_SETTINGS.timing,
      };
    }
  } catch {
    // 저장소를 못 쓰거나 값이 깨졌으면 아래에서 대체 값 사용
  }
  return settingsInMemory ?? DEFAULT_SETTINGS;
}

// 일부 값만 넘겨도 나머지는 기존 값을 유지해요
export function saveAlertSettings(next: Partial<AlertSettings>) {
  const merged = { ...loadAlertSettings(), ...next };
  settingsInMemory = merged;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
  } catch {
    // 저장소를 못 쓰면 메모리 값만 사용
  }
}

// 알림이 실제로 켜져 있는지: 브라우저 권한 허용 + 토글 하나 이상 켜짐
export function isNotificationOn(): boolean {
  const { exitAlert, riskAlert } = loadAlertSettings();
  return getNotificationState() === "granted" && (exitAlert || riskAlert);
}
