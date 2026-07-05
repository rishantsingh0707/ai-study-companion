import { useAuth } from "../providers/AuthProvider";

export default function DashboardPage() {

    const { user } = useAuth();

    return (

        <div className="flex min-h-screen items-center justify-center bg-base-100">

            <div className="text-center">

                <h1 className="text-5xl font-bold">

                    Welcome Back

                </h1>

                <p className="mt-5 text-xl">

                    {user?.name}

                </p>

            </div>

        </div>

    );

}