import "./globals.css";
import type { Metadata } from "next";
import MockWorker from "./components/mockWorker"; // client component that starts MSW

export const metadata: Metadata = {
  title: "Events App-Admin Portal",
  description: "Admin portal for SBI Events App",
  icons: {
    icon: "/static/sbi_logo.jpg",
    shortcut: "/static/sbi_logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MockWorker />
        {children}
      </body>
    </html>
  );
}
