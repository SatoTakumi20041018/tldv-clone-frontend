"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";

const authPages = ["/login", "/register"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  return (
    <AuthProvider>
      {isAuthPage ? (
        <main className="min-h-screen">{children}</main>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0 lg:pl-0 pl-0">
            <div className="p-4 lg:p-8 pt-16 lg:pt-8">{children}</div>
          </main>
        </div>
      )}
    </AuthProvider>
  );
}
