import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import type { JSX } from "react/jsx-runtime";
import AppShellSkeleton from "../common/AppShellSkeleton";

export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}) {
    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {
        return <AppShellSkeleton />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}