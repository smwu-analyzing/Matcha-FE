export type NotificationState =
  | "granted"
  | "denied"
  | "default"
  | "unsupported";

export type AlertSettings = { exitAlert: boolean; riskAlert: boolean };

const PROMPTED_KEY = "matcha:notification-prompted";
const SETTINGS_KEY = "matcha:notification-settings";

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
  try {
    return localStorage.getItem(PROMPTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markNotificationPromptSeen() {
  try {
    localStorage.setItem(PROMPTED_KEY, "1");
  } catch {
    // 저장소를 못 쓰는 환경이면 무시
  }
}

export function loadAlertSettings(): AlertSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { exitAlert: true, riskAlert: true, ...JSON.parse(raw) };
  } catch {
    // 저장값이 없거나 깨졌으면 기본값 사용
  }
  return { exitAlert: true, riskAlert: true };
}

export function saveAlertSettings(settings: AlertSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // 저장소를 못 쓰는 환경이면 무시
  }
}

// 알림이 실제로 켜져 있는지: 브라우저 권한 허용 + 토글 하나 이상 켜짐
export function isNotificationOn(): boolean {
  const { exitAlert, riskAlert } = loadAlertSettings();
  return getNotificationState() === "granted" && (exitAlert || riskAlert);
}
