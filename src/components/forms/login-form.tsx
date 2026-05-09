"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi } from "@/services/api/auth";
import { useAuthStore } from "@/store/auth-store";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@curatedcounter.com",
      password: "ChangeMe123!"
    }
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      setUser(user);
      toast.success("Welcome back.");
      router.push("/dashboard");
      router.refresh();
    },
    onError: () => {
      toast.error("Unable to sign in with those credentials.");
    }
  });

  return (
    <Card className="bg-white/90 shadow-float">
      <CardHeader>
        <CardTitle className="font-serif text-4xl">Admin login</CardTitle>
        <CardDescription>Sign in with your admin or editor account to manage blogs, media, and AI generation tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={form.handleSubmit((values) => {
            loginMutation.mutate(values);
          })}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input id="email" placeholder="name@company.com" {...form.register("email")} />
            {form.formState.errors.email ? <p className="text-sm text-red-600">{form.formState.errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <Input id="password" placeholder="Enter your password" type="password" {...form.register("password")} />
            {form.formState.errors.password ? <p className="text-sm text-red-600">{form.formState.errors.password.message}</p> : null}
          </div>
          <Button className="w-full" disabled={loginMutation.isPending} type="submit">
            {loginMutation.isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            Continue to workspace
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
