import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { General, Social } from "./Links";

export function Bottom() {
  return (
    <footer className="container mx-auto mb-8">
      <nav className={`${styles.nav} flex flex-row`}>
        <div className={`${styles.logo}`}>
          <Link href="/">
            <Image src="/img/logo_footer.png" width={46} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
          </Link>
        </div>

        <General />

        <Social />
      </nav>
    </footer>
  );
}
