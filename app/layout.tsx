import { Top, Bottom } from "./components/Nav";
import YandexMetrika from "./components/YandexMetrika";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {/* Меню */}
        <Top />

        {children}

        <Bottom />
      </body>
      <YandexMetrika />
    </html>
  );
}
