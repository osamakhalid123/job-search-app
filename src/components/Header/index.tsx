import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  return (
    <div className={`${styles.headerContainer}`}>
        <div className={`${styles.logo}`}>
        <Link to="/">JobsNow</Link>
            
        </div>
        <div className={`${styles.navLinks}`}>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/history">History</Link>
        </div>
    </div>
  )
}

export default Header