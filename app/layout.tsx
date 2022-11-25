import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <header>
            <div className="grid-container">
              {/* Меню */}
              <nav>
                <div className="logo">
                  <Image src="/img/logo.png" width={121} height={47} alt="Дизайн интерьера в Перми" title="Дизайн интерьера в Перми" />
                </div>
                <div className="more_color">
                  <div className="top_menu menu">
                    <ul className="">
                      <li className="first active">
                        <a href="/">Дизайн интерьера</a>
                      </li>
                      <li>
                        <a href="/dizajn-proekt/">Дизайн проект</a>
                      </li>
                      <li>
                        <a href="/portfolio-intereri/">Портфолио</a>
                      </li>
                      <li>
                        <a href="/about/">О студии</a>
                      </li>
                      <li>
                        <a href="/blog/">Блог</a>
                      </li>
                      <li className="last">
                        <a href="/contacts/">Контакты</a>
                      </li>
                    </ul>
                  </div>

                  {/* <!-- Социалочки --> */}
                  <div className="soc">
                    <noindex>
                      <ul className="">
                        <li className="first">
                          <a href="https://ru.pinterest.com/pintzinc/" title="Мы в Pinterest">
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/zinc_cc" title="Мы в Twitter">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com/zinc.cc/" title="Мы в Instagram">
                            <i className="fa fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/zinc.perm/" title="Мы в Facebook">
                            <i className="fa fa-facebook-official"></i>
                          </a>
                        </li>
                        <li className="last">
                          <a href="https://vk.com/zinccc" title="Мы в VK">
                            <i className="fa fa-vk"></i>
                          </a>
                        </li>
                      </ul>
                    </noindex>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
