import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import { RootState } from "../../Redux/store";
import debounce from "lodash.debounce";
import { fetchJobs } from "../../Redux/jobsSlice";
import styles from "./styles.module.scss";

function Home() {
  const dispatch = useDispatch<any>();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentPage = useSelector((state: RootState) => state.jobs.currentPage);
  
  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, []);

 

  return (
    <div className={`${styles.homeContainer}`}>
      <div className={`${styles.jobsHeader}`} >
        All jobs ({jobs.length})
      </div>
      <div className={`${styles.cardWrapper}`}>
        {jobs.map((job) => (
          <Card key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Home;
