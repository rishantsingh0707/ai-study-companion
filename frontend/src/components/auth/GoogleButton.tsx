import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/authApi";
import { saveToken } from "../../utils/auth";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
        <div className="flex w-full justify-center overflow-hidden rounded-full">
            <GoogleLogin
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
                width="336"
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </div>
    );
}