import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

type Props = {};

const Nav = (props: Props) => {
  return (
    <header className="container mx-auto mt-4">
      <nav className={`${styles.nav} flex flex-row`}>
        <div className={`${styles.logo}`}>
          <Link href="/">
            <Image src="/img/logo.png" width={121} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-row md:space-x-6 font-bold items-center">
          {[
            { url: "/", title: "Дизайн интерьера" },
            { url: "/dizajn-proekt/", title: "Дизайн проект" },
            { url: "/portfolio-intereri/", title: "Портфолио" },
            { url: "/about/", title: "О студии" },
            { url: "/blog/", title: "Блог" },
            { url: "/contacts/", title: "Контакты" },
          ].map((item, index) => (
            <Link href={item.url} key={index} className="text-white">
              {item.title}
            </Link>
          ))}

          {/* <!-- Социалочки --> */}
          <div className="soc">
            <noindex>
              <ul className="">
                <li className="first">
                  <Link href="https://ru.pinterest.com/pintzinc/" title="Мы в Pinterest">
                    <i className="fa fa-pinterest"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/zinc_cc" title="Мы в Twitter">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com/zinc.cc/" title="Мы в Instagram">
                    <i className="fa fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/zinc.perm/" title="Мы в Facebook">
                    <i className="fa fa-facebook-official"></i>
                  </Link>
                </li>
                <li className="last">
                  <Link href="https://vk.com/zinccc" title="Мы в VK">
                    <i className="fa fa-vk"></i>
                  </Link>
                </li>
              </ul>
            </noindex>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
