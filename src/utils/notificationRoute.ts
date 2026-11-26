import { getNotificationState, isNotificationOn } from "./notification";

// 알림 화면으로 갈 때 어느 화면을 보여줄지: 아직 안 정함 → 06-A, 켜짐 → 06-C, 꺼짐/차단 → 06-B
export function getNotificationRoute(): string {
  if (getNotificationState() === "default") return "/notification/permission";
  return isNotificationOn() ? "/notification/settings" : "/notification/off";
}
