import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import GoogleButton from "../components/auth/GoogleButton";

import {login} from "../api/authApi";
import { saveToken } from "../utils/auth";
import { useAuth } from "../providers/AuthProvider";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,

    onSuccess: async (data) => {
      saveToken(data.token);

      await refreshUser();

      toast.success(`Welcome back, ${data.user.name}`);

      navigate("/dashboard");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutate(data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Continue your AI learning journey."
    >
      <AuthCard
        googleButton={<GoogleButton />}
        footer={
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
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
                showPassword ? "text" : "password"
              }
              placeholder="Password"
              className="input input-bordered w-full pr-12"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
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
                  className="animate-spin"
                  size={18}
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}