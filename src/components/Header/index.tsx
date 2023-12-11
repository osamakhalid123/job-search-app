import styles from "./styles.module.scss";


function Header() {
  return (
    <div className={`${styles.headerContainer}`}>
        <div className={`${styles.logo}`}>
            JobsNow
        </div>
        <div className={`${styles.navLinks}`}>
            <a href="/">Home</a>
            <a href="/">Search</a>
            <a href="/">History</a>
        </div>
    </div>
  )
}

export default Header