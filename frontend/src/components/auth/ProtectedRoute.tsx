import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import type { JSX } from "react/jsx-runtime";

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
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}