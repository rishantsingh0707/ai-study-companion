import { Outlet } from "react-router-dom";
import WelcomeScreen from "../components/dashboard/WelcomeScreen";

import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-base-100 text-base-content overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            <WelcomeScreen />
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">

                <div className="mx-auto h-full w-full max-w-7xl p-8">

                    <Outlet />

                </div>

            </main>

        </div>
    );
}