import type { Metadata } from "next";
import { Top, Bottom } from "./components/Nav";
import YandexMetrika from "./components/YandexMetrika";
import JsonLd from "./components/JsonLd";
import { ORG_ID, SITE_URL, WEBSITE_ID, orgRef } from "./lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Дизайн интерьера в Перми — студия ZINC",
    template: "%s",
  },
  description:
    "Студия дизайна интерьера ZINC в Перми: квартиры, дома и коттеджи. Рабочая документация, 3D-тур. Первая встреча бесплатно, +7 909 100-46-52.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ZINC",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "InteriorDesigner"],
      "@id": ORG_ID,
      name: "Студия дизайна интерьера ZINC",
      description:
        "Студия дизайна интерьера ZINC в Перми: дизайн-проекты квартир, домов и коттеджей, рабочая документация и 3D-туры.",
      url: SITE_URL,
      logo: `${SITE_URL}/img/logo.png`,
      image: `${SITE_URL}/img/logo.png`,
      telephone: "+7-909-100-46-52",
      email: "info@zinc.cc",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Чернышевского, 28, 5 этаж",
        addressLocality: "Пермь",
        addressCountry: "RU",
      },
      areaServed: { "@type": "City", name: "Пермь" },
      knowsLanguage: "ru",
      sameAs: ["https://vk.com/zinccc", "https://instagram.com/zinc.cc/"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "ZINC",
      inLanguage: "ru-RU",
      publisher: orgRef,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <JsonLd data={jsonLd} />
        {/* Меню */}
        <Top />

        {children}

        <Bottom />
        <YandexMetrika />
      </body>
    </html>
  );
}
