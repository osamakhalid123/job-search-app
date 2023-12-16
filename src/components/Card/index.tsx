import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { fetchSkillName } from "../../Redux/jobsSlice";
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
  const dispatch = useDispatch<any>();
  const skillNames = useSelector((state: RootState) => state.jobs.skillState);

  useEffect(() => {
    job.relationships.skills.forEach((skill) => {
      dispatch(fetchSkillName(skill.id));
    });
  }, [dispatch, job]);
  console.log(job,"jobFromCard")

  const renderSkills = () => {
    return job.relationships.skills.map((skill) => {
      console.log( skillNames[skill.id]," skillNames[skill.id]")
      const skillNameData = skillNames[skill.id];
      const skillName = (skillNameData as { data?: { skill?: { attributes?: { name?: string } } } })?.data?.skill?.attributes?.name || "Loading...";

      return (
        <Link key={skill.id} to={`/skill/${skill.id}`}>
           <p key={skill.id} className={styles.tag}>
          {skillName}
        </p>
        </Link>
      );
    });
  };

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.header}`}>
        <Link to={`/job/${job.id}`} className={`${styles.jobTitleLink}`}>
          {job.attributes.title}
        </Link>
      </div>
      
      <div className={`${styles.relatedSkillsContainer}`}>
        <p className={`${styles.relatedSkills}`}>Related Skills:</p>
        <div  className={styles.skillTags}>

        {renderSkills()}
      </div>
      </div>

      <Link to="/" className={`${styles.viewDetails}`}>
        View Job details
      </Link>
    </div>
  );
}

export default Card;
