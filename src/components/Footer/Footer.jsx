import { Link } from "react-router-dom";
import { SocialIcons } from "../../components/SocialIcons/SocialIcons.jsx";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.linksContainer}>
        <Link className={styles.link} to="/">
          About
        </Link>
        <Link className={styles.link} to="/">
          FAQ
        </Link>
        <Link className={styles.link} to="/">
          Careers
        </Link>
        <Link className={styles.link} to="/">
          Returns
        </Link>
      </div>

      <div className={styles.address}>
        Big O Store <br />
        8420 Quantum Loop, Suite 500 <br />
        Cybertown, CA 90321
      </div>

      <div className={styles.socialIcons}>
        <SocialIcons />
      </div>
    </div>
  );
}

export { Footer };
