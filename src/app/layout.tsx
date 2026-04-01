import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-[100dvh] flex flex-col selection:bg-blue-100 selection:text-blue-900">
        {/* ─── Header ─────────────────────────────────────────── */}
        <header style={{ padding: '0.75rem 3rem' }} className="flex items-center justify-between border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            {/* TODO: Place your logo here */}
            <div className="w-10 h-10 rounded flex items-center justify-center bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider border border-blue-100">
              LOGO
            </div>

            <span className="text-[#333333] font-medium text-[17px]">
              FST
            </span>
          </div>

          <nav className="flex items-center gap-8 text-[15px] font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
            
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors focus:outline-none">
              Entities
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors focus:outline-none">
              2510-2597-2
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </nav>
        </header>

        <main className="flex-1 w-full relative flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
          <div className="flex-1 w-full mx-auto px-6 py-8 flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
