import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {

  return (
    <div className={styles.container}>
        <p className={styles.content}>Page not found</p>
        <Link className={styles.link} to="/">Go to Homepage</Link>
    </div>

  );
}

export { ErrorPage };
