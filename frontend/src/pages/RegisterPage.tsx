import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import GoogleButton from "../components/auth/GoogleButton";

import { register as registerUser } from "../api/authApi";
import { saveToken } from "../utils/auth";
import { useAuth } from "../providers/AuthProvider";

const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters"),

    email: z
        .string()
        .email("Enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,

        onSuccess: async (data) => {
            saveToken(data.token);

            await refreshUser();

            toast.success(
                `Welcome, ${data.user.name}!`
            );

            navigate("/dashboard");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Registration failed"
            );
        },
    });

    const onSubmit = (data: RegisterForm) => {
        mutate(data);
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start studying smarter with Nexa."
        >
            <AuthCard
                googleButton={<GoogleButton />}
                footer={
                    <>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </>
                }
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-error">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-error">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            className="input input-bordered w-full pr-12"
                            {...register("password")}
                        />

                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>

                        {errors.password && (
                            <p className="mt-1 text-sm text-error">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn btn-primary w-full"
                    >
                        {isPending ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Creating Account...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
            </AuthCard>
        </AuthLayout>
    );
}