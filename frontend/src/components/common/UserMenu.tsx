import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthProvider";
import { logout as logoutApi } from "../../api/authApi";
import { removeToken } from "../../utils/auth";

export default function UserMenu() {
    const navigate = useNavigate();

    const { user, logout, } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutApi();
        } catch { }

        removeToken();

        logout();

        navigate("/");
    };

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    return (
        <div className="dropdown dropdown-top w-full">

            <label
                tabIndex={0}
                className="flex w-full cursor-pointer items-center gap-2 rounded-2xl bg-base-200 p-2 transition-all duration-300 hover:border-primary hover:bg-base-300"
            >

                {user?.profilePicture ? (

                    <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />

                ) : (

                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-white "
                    >
                        {initials}
                    </div>

                )}

                <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">

                        {user?.name}

                    </h3>

                    <p className="truncate text-sm text-base-content/60">

                        {user?.email}

                    </p>

                </div>

            </label>

            <ul
                tabIndex={0}
                className="
          dropdown-content
          z-50
          mb-3
          w-80
          rounded-2xl
          border
          border-base-300
          bg-base-200
          p-2
          shadow-2xl
        "
            >

                <li className="mb-2 rounded-xl p-4">

                    <div className="flex items-center gap-4">

                        {user?.profilePicture ? (

                            <img
                                src={user.profilePicture}
                                alt={user.name}
                                className="h-14 w-14 rounded-full object-cover"
                            />

                        ) : (

                            <div
                                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-primary
                  to-accent
                  text-lg
                  font-bold
                  text-white
                "
                            >
                                {initials}
                            </div>

                        )}

                        <div>

                            <h3 className="font-semibold">

                                {user?.name}

                            </h3>

                            <p className="text-sm text-base-content/60">

                                {user?.email}

                            </p>

                        </div>

                    </div>

                </li>

                <div className="divider my-1" />

                <li>

                    <button
                        onClick={handleLogout}
                        className="btn btn-error btn-soft justify-start"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </li>

            </ul>

        </div>
    );
}