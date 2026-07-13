import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar, { MobileSidebar } from "./Sidebar";

export default function DashboardLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-base-100 text-base-content">

            <Sidebar />
            <MobileSidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                <div className="flex items-center gap-3 border-b border-base-300 p-3 md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label="Open menu"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-base-100 text-sm font-bold">
                            N
                        </div>
                        <span className="font-bold">Nexa</span>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto h-full w-full max-w-7xl p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
}