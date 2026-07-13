import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import { googleLogin } from "../../api/authApi";
import { saveToken } from "../../utils/auth";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GoogleButton() {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const [isExchanging, setIsExchanging] = useState(false);

    const handleSuccess = async (credentialResponse: { credential?: string }) => {
        if (isExchanging) return;

        try {
            if (!credentialResponse.credential) {
                toast.error("Google authentication failed.");
                return;
            }

            setIsExchanging(true);

            const response = await googleLogin(credentialResponse.credential);

            saveToken(response.token);

            await refreshUser();

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Google sign in failed.");
        } finally {
            setIsExchanging(false);
        }
    };

    const handleError = () => {
        toast.error("Google sign in failed.");
    };

    return (
        <div className="relative flex w-full justify-center overflow-hidden rounded-full">
            <GoogleLogin
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
                width="336"
                onSuccess={handleSuccess}
                onError={handleError}
            />

            {isExchanging && (
                <div
                    className="
                        absolute inset-0 z-10 flex items-center justify-center gap-2
                        rounded-full bg-base-100/90 text-sm font-medium text-base-content
                    "
                >
                    <Loader2 size={18} className="animate-spin text-primary" />
                    Signing you in...
                </div>
            )}
        </div>
    );
}