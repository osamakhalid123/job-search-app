// import { useEffect } from "react";
// import Card from "../../components/Card"
// import styles from "./styles.module.scss";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";
// import {fetchJobs } from "../../Redux/jobsSlice";

// function Home() {


//   const dispatch = useDispatch()<any>;
//   const jobs = useSelector((state:RootState) => state.jobs.jobs);

//   useEffect(() => {
//     dispatch(fetchJobs());
//   }, [dispatch]);


//   console.log(jobs,"jobs")


//   return (
//     <div  className={`${styles.homeContainer}`}>
//         <div className={`${styles.jobsHeader}`}>
//         All jobs (255)
//         </div>
//     <Card job={jobs}/>
//     </div>
//   )
// }

// export default Home






import React, { useEffect, useRef } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchJobs } from "../../Redux/jobsSlice";

function Home() {
  const dispatch = useDispatch<any>();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentPage = useSelector((state: RootState) => state.jobs.currentPage);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch]);

;

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
      containerRef.current.scrollHeight - 20 // You can adjust the threshold
    ) {
      // Load more jobs when the user is close to the bottom
      dispatch(fetchJobs(currentPage + 1));
    }
  };

  console.log(jobs, "jobs");

  return (
    <div className={`${styles.homeContainer}`} ref={containerRef}
    onScroll={handleScroll}>
      <div className={`${styles.jobsHeader}`}>
        All jobs ({jobs.length})
      </div>
      {jobs.map((job) => (
        <Card key={job.id} job={job} />
      ))}
    </div>
  );
}

export default Home;
