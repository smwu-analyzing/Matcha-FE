import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import {
  NotificationOffPage,
  NotificationPermissionPage,
  NotificationSettingsPage,
} from "../pages/notification";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <HomePage percent={null} /> },
  { path: "/notification/permission", element: <NotificationPermissionPage /> },
  { path: "/notification/off", element: <NotificationOffPage /> },
  { path: "/notification/settings", element: <NotificationSettingsPage /> },
]);
