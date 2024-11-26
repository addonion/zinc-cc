import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { Social } from "./Links";

export function Bottom() {
  return (
    <footer className="container mx-auto mb-8">
      <nav className={`${styles.nav} flex flex-row`}>
        <div className={`${styles.logo}`}>
          <Link href="/">
            <Image src="/img/logo_footer.png" width={46} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-row md:space-x-6 font-bold items-center">
          {[
            { url: "/", title: "Дизайн интерьера" },
            { url: "/dizajn-proekt/", title: "Дизайн проект" },
            { url: "/portfolio-intereri/", title: "Портфолио" },
            { url: "/contacts/", title: "Контакты" },
          ].map((item, index) => (
            <Link href={item.url} key={index} className="lg:text-white pr-6">
              {item.title}
            </Link>
          ))}
        </div>

        <Social />
      </nav>
    </footer>
  );
}
