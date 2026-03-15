import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "tl;dv - AI Meeting Recorder",
  description:
    "Record, transcribe, and summarize your meetings with AI. Never miss a detail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
