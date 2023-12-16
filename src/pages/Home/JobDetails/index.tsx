import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { fetchJobWithId, fetchSkillName } from '../../../Redux/jobsSlice';

import styles from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface JobState {
  relatedJobs: any;
  job: {
    attributes: any;
    id: string;
    relationships: {
      skills: Skill[];
    };
  };
  skillState: skillState

}
interface Skill {
  id: string;
}


interface RootState {
  jobs: JobState;

}
interface skillState {
  [skillId: string]: string;
}
function JobDetails() {
  const dispatch = useDispatch<any>();
  const job = useSelector((state: RootState) => state.jobs.relatedJobs);

  const { jobId } = useParams();
  const skillNames = useSelector((state: RootState) => state.jobs.skillState);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobWithId(jobId));
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    job?.relationships?.skills.forEach((skill: any) => {
      dispatch(fetchSkillName(skill.id));
    });

  }, [dispatch, job]);

  const relatedSkills = () => {

    return job[0]?.relationships?.skills.map((skill: any) => {

      const skillNameData = skillNames[skill.id];
      const relatedJobsData = (skillNameData as { data?: { skill?: { relationships?: { jobs?: { id: string }[] } } } })?.data?.skill?.relationships?.jobs || [];
      const skillName = (skillNameData as { data?: { skill?: { attributes?: { name?: string } } } })?.data?.skill?.attributes?.name || "Loading...";
      const skillType = (skillNameData as { data?: { skill?: { attributes?: { type?: string } } } })?.data?.skill?.attributes?.type || "Loading...";
      const skillImportance = (skillNameData as { data?: { skill?: { attributes?: { importance?: string } } } })?.data?.skill?.attributes?.importance || "Loading...";
      const skillLevel = (skillNameData as { data?: { skill?: { attributes?: { level?: string } } } })?.data?.skill?.attributes?.level || "Loading...";


      return (
        <div key={skill.id} className={`${styles.relatedSkillCard}`}>
          <div className={`${styles.relatedSkillCardDetails}`}>

            <Link to={`/skill/${skill.id}`} className={`${styles.skillName}`} >

              {skillName}
            </Link>
            <p>
              the ability to communicate information and ideas in speaking so others will understand.
            </p>
            <div className={`${styles.skillInfoContainer}`}>
              <div className={`${styles.skillInfo}`}>
                <h3>Type:</h3>
                <p>
                  {skillType}
                </p>

              </div>
              <div className={`${styles.skillInfo}`}>
                <h3>importance:</h3>
                <p>
                  {skillImportance}
                </p>
              </div>
              <div className={`${styles.skillInfo}`}>
                <h3>level:</h3>
                <p>
                  {skillLevel}
                </p>
              </div>

            </div>
          </div>
        </div>

      );
    });




  };



  return (
    <div className={`${styles.jobDetailsPage}`}>
      <div className={`${styles.jobName}`}>
        {job[0]?.attributes?.title}
      </div>
      <div className={`${styles.jobDetailsContainer}`}>
        <div className={`${styles.relatedSkillsContainer}`}>

          <p className={`${styles.relatedSkillsheader}`}>
            Related Skills :
          </p>
          {relatedSkills()}
        </div>

        <div className={`${styles.relatedJobsContainer}`}>
          <div>
            relatedJobsContainer
          </div>
        </div>
      </div>

    </div>
  );
}

export default JobDetails;