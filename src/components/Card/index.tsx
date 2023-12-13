
import styles from "./styles.module.scss";

interface Skill {
  id: string;
}

interface Job {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: Skill[];
  };
}

interface CardProps {
  job: Job;
}


function Card({ job }: CardProps) {


  console.log(job,"job")
  return (
    <div className={`${styles.cardContainer}`}>
        <div className={`${styles.header}`}>
            {job.attributes.title}
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