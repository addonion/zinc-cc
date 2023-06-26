import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { General, Social } from "./Links";

export function Top() {
  return (
    <header className="container mx-auto mt-4">
      <nav className={`${styles.nav} flex flex-row`}>
        <div className={`${styles.logo} mr-12`}>
          <Link href="/">
            <Image src="/img/logo.png" width={121} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
          </Link>
        </div>

        <General />

        <Social />
      </nav>
    </header>
  );
}
