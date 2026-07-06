import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-base-100 text-base-content">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto h-full w-full max-w-7xl p-8">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}