import styles from "./styles.module.scss";

function Search() {
  return (
    <div className={`${styles.searchContainer}`}>
        <input type="text" placeholder="Search keyword" />
    </div>
  )
}

export default Search