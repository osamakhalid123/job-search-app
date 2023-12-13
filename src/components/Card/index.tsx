import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillName } from "../../Redux/jobsSlice";
import { RootState } from "../../Redux/store";

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
  const dispatch = useDispatch<any>();
  const skillNames = useSelector((state: RootState) => state.jobs.skillState);

  useEffect(() => {
    job.relationships.skills.forEach((skill) => {
      dispatch(fetchSkillName(skill.id));
    });
  }, [dispatch, job]);

  const renderSkills = () => {
    return job.relationships.skills.map((skill) => {
      console.log( skillNames[skill.id]," skillNames[skill.id]")
      const skillNameData = skillNames[skill.id];
      const skillName = (skillNameData as { data?: { skill?: { attributes?: { name?: string } } } })?.data?.skill?.attributes?.name || "Loading...";

      return (
        <p key={skill.id} className={styles.tag}>
          {skillName}
        </p>
      );
    });
  };

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.header}`}>
        {job.attributes.title}
      </div>
      <div className={`${styles.relatedSkillsContainer}`}>
        {renderSkills()}
      </div>
      <p className={`${styles.viewDetails}`}>
        View Job details
      </p>
    </div>
  );
}

export default Card;
