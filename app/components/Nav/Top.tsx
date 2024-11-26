import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { Social } from "./Links";

export function Top() {
  return (
    <header className="container mx-auto mt-4">
      <nav className={`${styles.nav} flex flex-row`}>
        <div className={`${styles.logo} mr-12`}>
          <Link href="/">
            <Image src="/img/logo.png" width={121} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
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

        <label className="relative z-40 cursor-pointer px-3 py-8 lg:hidden" htmlFor="mobile-menu">
          <input className="peer hidden" type="checkbox" id="mobile-menu" />
          <div
            className="relative z-50 block h-[1px] w-7 bg-white bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-white before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-white after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform after:peer-checked:bg-black before:peer-checked:bg-black"
          >
          </div>
          <div
            className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block"
          >
            &nbsp;
          </div>
          <div
            className="fixed top-0 right-0 z-40 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0"
          >
            <div className="float-right min-h-full w-[85%] bg-white px-4 pt-14 shadow-2xl">
              <menu className="flex flex-col md:space-x-6 font-bold items-end text-xl gap-y-4">
                {[
                  { url: "/", title: "Дизайн интерьера" },
                  { url: "/dizajn-proekt/", title: "Дизайн проект" },
                  { url: "/portfolio-intereri/", title: "Портфолио" },
                  { url: "/contacts/", title: "Контакты" },
                ].map((item, index) => (
                  <a href={item.url} key={index} className="lg:text-white pr-6">
                    {item.title}
                  </a>
                ))}
              </menu>
            </div>
          </div>
        </label>

      </nav>
    </header>
  );
}
