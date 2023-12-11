import Card from "../../components/Card"
import styles from "./styles.module.scss";

function Home() {
  return (
    <div  className={`${styles.homeContainer}`}>
        <div className={`${styles.jobsHeader}`}>
        All jobs (255)
        </div>
    <Card/>
    </div>
  )
}

export default Home