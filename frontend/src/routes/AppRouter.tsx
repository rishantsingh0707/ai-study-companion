import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ChatPage from "../pages/ChatPage";
import ChatHistoryPage from "../pages/ChatHistoryPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<AuthLayout />}>

                    <Route
                        path="/"
                        element={<LandingPage />}
                    />

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                </Route>

                <Route
                    path="/dashboard"
                    element={<DashboardLayout />}
                >

                    <Route
                        index
                        element={<DashboardPage />}
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

            </Routes>
        </BrowserRouter>
    );
}