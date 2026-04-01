import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIUB FST",
  description: "AIUB Faculty of Science and Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8f9fa] text-gray-900 font-sans antialiased min-h-screen flex flex-col">
        {/* ─── Header ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
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

        {/* ─── Page Content ────────────────────────────────────── */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
