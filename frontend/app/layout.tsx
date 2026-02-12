import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Satisfaction Survey",
  description: "Avaliação de satisfação do campus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
