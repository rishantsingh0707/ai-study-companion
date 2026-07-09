import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import SettingsPage from "../pages/SettingsPage";
import ChatHistoryPage from "../pages/ChatHistoryPage";
import ChatPage from "../pages/ChatPage";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<DashboardPage />}
                />

                <Route
                    path="chat/new"
                    element={<ChatPage />}
                />

                <Route
                    path="chat/:chatId"
                    element={<ChatPage />}
                />

                <Route
                    path="history"
                    element={<ChatHistoryPage />}
                />

                <Route
                    path="settings"
                    element={<SettingsPage />}
                />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>
    );
}