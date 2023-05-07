import Link from "next/link";

export function General() {
  return (
    <div className="hidden lg:flex lg:flex-row md:space-x-6 font-bold items-center">
      {[
        { url: "/", title: "Дизайн интерьера" },
        { url: "/dizajn-proekt/", title: "Дизайн проект" },
        { url: "/portfolio-intereri/", title: "Портфолио" },
        { url: "/contacts/", title: "Контакты" },
      ].map((item, index) => (
        <Link href={item.url} key={index} className="text-white pr-6">
          {item.title}
        </Link>
      ))}
    </div>
  );
}
