import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-72 border-r">
                Sidebar
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}