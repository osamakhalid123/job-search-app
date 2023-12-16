import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { fetchJobWithId, fetchSkillWithId } from '../../../Redux/jobsSlice';

import { RootState } from '../../../Redux/store';
import styles from "./styles.module.scss";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface Job {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: { id: string }[];
  };
}
interface SkillRelationships {
  jobs: Job[];
  skills: { id: string }[];
}

interface SkillAttributes {
  name: string;
  type: string;
  importance: string;
  level: string;
}

interface Skill {
  id: string;
  type: string;
  attributes: SkillAttributes;
  relationships: SkillRelationships;
}
interface SkillResponse {
  skill: Skill;
}

function SkillDetails() {


  const { skillId } = useParams();
  const dispatch = useDispatch<any>();

  const skill = useSelector((state: RootState) => state.jobs.skill as unknown as Skill);
  const relatedJobs = useSelector((state: RootState) => state.jobs.relatedJobs);



  useEffect(() => {
    if (skillId) {
      dispatch(fetchSkillWithId(skillId));
    }


  }, [dispatch, skillId]);



  useEffect(() => {
    const uniqueJobIds = new Set<string>();

    skill?.relationships?.jobs.forEach((job) => {
      if (!uniqueJobIds.has(job.id)) {
        uniqueJobIds.add(job.id);
      }
    });

    const uniqueJobIdsArray = Array.from(uniqueJobIds);


    uniqueJobIdsArray.map((id) => {
      dispatch(fetchJobWithId(id))
    })

  }, [dispatch, skill]);


  return (
    <div className={`${styles.jobDetailsPage}`}>
      <div className={`${styles.jobName}`}>
        {skill?.attributes?.name}
      </div>
      <div className={`${styles.jobDetailsContainer}`}>
        <div className={`${styles.relatedSkillsContainer}`}>

          <p>
            Related Jobs :
          </p>


          {relatedJobs.map((job) => {
            return (
              <div key={job.id} className={`${styles.relatedSkillCard}`}>
                <div className={`${styles.relatedSkillCardDetails}`}>

                  <Link to={`/job/${job.id}`} className={`${styles.skillName}`} >

                    {job.attributes.title}
                  </Link>
                  <p>
                    the ability to communicate information and ideas in speaking so others will understand.
                  </p>

                </div>
              </div>
            )
          }
          )}
        </div>
        <div>

        </div>

        <div className={`${styles.relatedJobsContainer}`}>
          <div>
            relatedSkillsContainer
          </div>
        </div>
      </div>

    </div>

  )
}

export default SkillDetails