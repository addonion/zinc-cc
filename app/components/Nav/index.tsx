import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

import pinterest from "./icons/pinterest.svg";
import twitter from "./icons/twitter.svg";
import instagram from "./icons/instagram.svg";
import facebook from "./icons/square-facebook.svg";
import vk from "./icons/vk.svg";

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
            { url: "/blog/", title: "Блог" },
            { url: "/contacts/", title: "Контакты" },
          ].map((item, index) => (
            <Link href={item.url} key={index} className="text-white pr-6">
              {item.title}
            </Link>
          ))}
        </div>
        {/* Социалочки */}
        <ul className="flex flex-row space-x-4 ml-auto my-auto mr-4">
          <li>
            <a href="https://ru.pinterest.com/pintzinc/" title="Мы в Pinterest" target="_blank" rel="noreferrer">
              <Image src={pinterest} width={14} height={16} alt="Pinterest" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/zinc_cc" title="Мы в Twitter" target="_blank" rel="noreferrer">
              <Image src={twitter} width={15} height={16} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/zinc.cc/" title="Мы в Instagram" target="_blank" rel="noreferrer">
              <Image src={instagram} width={14} height={16} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/zinc.perm/" title="Мы в Facebook" target="_blank" rel="noreferrer">
              <Image src={facebook} width={14} height={16} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://vk.com/zinccc" title="Мы в VK" target="_blank" rel="noreferrer">
              <Image src={vk} width={14} height={16} alt="VK" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
