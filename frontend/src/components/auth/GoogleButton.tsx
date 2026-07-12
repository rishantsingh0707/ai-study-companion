import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/authApi";
import { saveToken } from "../../utils/auth";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48">
            <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
        </svg>
    );
}

export default function GoogleButton() {
    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    const handleSuccess = async (credentialResponse: { credential?: string }) => {
        try {
            if (!credentialResponse.credential) {
                toast.error("Google authentication failed.");
                return;
            }

            const response = await googleLogin(credentialResponse.credential);

            saveToken(response.token);

            await refreshUser();

            toast.success(`Welcome back, ${response.user.name}!`);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Google sign in failed.");
        }
    };

    const handleError = () => {
        toast.error("Google sign in failed.");
    };

    return (
        <div className="relative w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-base-100 rounded-full">
            <button
                type="button"
                tabIndex={-1}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-base-200 px-4 py-3 text-sm font-medium text-base-content transition-colors duration-200 hover:bg-base-300 "
            >
                <GoogleIcon />
                Continue with Google
            </button>

            <div className="absolute inset-0 overflow-hidden rounded-full opacity-0">
                <GoogleLogin
                    theme="filled_black"
                    shape="pill"
                    size="large"
                    width="320"
                    text="continue_with"
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </div>
    );
}