import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/authApi";
import { saveToken } from "../../utils/auth";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GoogleButton() {
    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    return (
        <div className="flex justify-center">

            <GoogleLogin
                theme="filled_black"
                shape="pill"
                size="large"
                width="320"
                text="continue_with"
                onSuccess={async (credentialResponse) => {
                    try {

                        if (!credentialResponse.credential) {
                            toast.error("Google authentication failed.");
                            return;
                        }

                        const response = await googleLogin(
                            credentialResponse.credential
                        );

                        saveToken(response.token);

                        await refreshUser();

                        toast.success(
                            `Welcome back, ${response.user.name}!`
                        );

                        navigate("/dashboard");

                    } catch (error) {

                        console.error(error);

                        toast.error(
                            "Google sign in failed."
                        );

                    }
                }}
                onError={() => {
                    toast.error(
                        "Google sign in failed."
                    );
                }}
            />

        </div>
    );
}