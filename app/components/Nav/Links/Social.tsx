import Image from "next/image";
import pinterest from "./icons/pinterest.svg";
import twitter from "./icons/twitter.svg";
import instagram from "./icons/instagram.svg";
import facebook from "./icons/square-facebook.svg";
import vk from "./icons/vk.svg";

export function Social() {
  return (
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
  );
}
