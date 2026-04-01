import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "AIUB FST Platform",
  description: "AIUB Faculty of Science and Technology Next-Gen Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased min-h-[100dvh] flex flex-col selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
        <ThemeProvider>
          {/* ─── Header ─────────────────────────────────────────── */}
          <header
            style={{ padding: "0.75rem 3rem" }}
            className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-900/50"
          >
            <div className="flex items-center gap-3">
              {/* TODO: Place your logo here */}
              <div className="w-10 h-10 rounded flex items-center justify-center bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-wider border border-blue-100 dark:border-blue-900">
                LOGO
              </div>

              <span className="text-[#333333] dark:text-slate-200 font-medium text-[17px]">
                FST
              </span>
            </div>

            <nav className="flex items-center gap-8 text-[15px] font-medium text-gray-500 dark:text-slate-400">
              <a
                href="#"
                className="hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
              >
                Home
              </a>

              <button className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-slate-100 transition-colors focus:outline-none">
                Entities
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 dark:text-slate-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <button className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-slate-100 transition-colors focus:outline-none">
                2510-2597-2
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 dark:text-slate-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <ThemeToggle />
            </nav>
          </header>

          <main className="flex-1 w-full relative flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
            <div className="flex-1 w-full mx-auto px-6 py-8 flex flex-col">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
