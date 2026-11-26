import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import {
  NotificationOffPage,
  NotificationPermissionPage,
  NotificationSettingsPage,
} from "../pages/notification";
import {
  ResultPage,
  RouteDetailPage,
  ShowSelectPage,
  TrainSelectPage,
  ReturnSetupPage,
} from "../pages/return";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <HomePage /> },
  { path: "/notification/permission", element: <NotificationPermissionPage /> },
  { path: "/notification/off", element: <NotificationOffPage /> },
  { path: "/notification/settings", element: <NotificationSettingsPage /> },

  { path: "/show/select", element: <ShowSelectPage /> },
  { path: "/return/setup", element: <ReturnSetupPage /> },
  { path: "/return/train", element: <TrainSelectPage /> },
  { path: "/return/result", element: <ResultPage /> },
  { path: "/return/route", element: <RouteDetailPage /> },
]);
