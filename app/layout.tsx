import "./globals.css";
import Nav from "./components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {/* Меню */}
        <Nav />

        {children}
      </body>
    </html>
  );
}
