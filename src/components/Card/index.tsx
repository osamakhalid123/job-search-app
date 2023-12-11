
import styles from "./styles.module.scss";

function Card() {
  return (
    <div className={`${styles.cardContainer}`}>
        <div className={`${styles.header}`}>
            4th Grade Math Teacher
        </div>

        <div className={`${styles.relatedSkillsContainer}`}>
            <p className={`${styles.relatedSkills}`}>Related Skills:</p>
            <div className={`${styles.skillTags}`}>
                <p className={`${styles.tag}`}>
            operation monitoring
                </p>
        </div>
        </div>

        <p className={`${styles.viewDetails}`}>
           View Job details 
        </p>
    </div>
  )
}

export default Card