"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ImageIcon, LayoutDashboard, LineChart, LogOut, Newspaper, PencilLine, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ADMIN_ENTRY_PATH } from "@/config/admin-entry";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { authApi } from "@/services/api/auth";
import { useAuthStore } from "@/store/auth-store";

import { useAuthSession } from "@/hooks/use-auth-session";

const iconMap = {
  "/dashboard": LayoutDashboard,
  "/blogs": Newspaper,
  "/create-blog": PencilLine,
  "/media": ImageIcon,
  "/analytics": LineChart
} as const;

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const { user, isLoading, isError } = useAuthSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoading) {
    return (
      <div className="section-shell py-12">
        <Card className="rounded-[2rem] p-8 text-sm text-stone">Loading admin workspace...</Card>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="section-shell py-12">
        <Card className="space-y-4 rounded-[2rem] p-8 text-sm text-stone">
          <p>Your admin session is no longer valid.</p>
          <Button
            onClick={() => {
              clearUser();
              router.replace(ADMIN_ENTRY_PATH);
            }}
            type="button"
          >
            Return to login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="section-shell grid min-h-screen gap-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <Card className="overflow-hidden rounded-[2rem] bg-white/85 p-6 shadow-card">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-3xl text-foreground">Admin</p>
                <p className="text-sm leading-7 text-stone">Manage content, media, and AI-assisted publishing workflows.</p>
              </div>
            </div>

            <div className="space-y-2">
              {siteConfig.adminNavigation.map((item) => {
                const Icon = iconMap[item.href as keyof typeof iconMap];
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    className={cn(
                      "flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium transition",
                      active ? "bg-foreground text-background" : "text-stone hover:bg-beige hover:text-foreground"
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="rounded-[1.5rem] border border-line bg-card/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone">Signed in as</p>
              <p className="mt-3 font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-stone">{user.email}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-stone">{user.role}</p>
            </div>

            <Button
              disabled={isLoggingOut}
              onClick={async () => {
                try {
                  setIsLoggingOut(true);
                  await authApi.logout();
                  clearUser();
                  toast.success("Logged out successfully.");
                  router.replace(ADMIN_ENTRY_PATH);
                } finally {
                  setIsLoggingOut(false);
                }
              }}
              type="button"
              variant="secondary"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </Card>
      </aside>

      <div className="space-y-8">{children}</div>
    </div>
  );
};
