import type { ReactNode } from "react";

type AuthCardProps = {
    googleButton: ReactNode;
    children: ReactNode;
    footer: ReactNode;
};

export default function AuthCard({
    googleButton,
    children,
    footer,
}: AuthCardProps) {
    return (
        <div className="space-y-6">

            {/* Google Login */}
            {googleButton}

            {/* Divider */}
            <div className="flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-sm text-base-content/50">
                    OR
                </span>

                <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* Form */}
            <div className="space-y-4">

                {children}

            </div>

            {/* Footer */}
            <div className="pt-2 text-center text-sm text-base-content/70">

                {footer}

            </div>

        </div>
    );
}