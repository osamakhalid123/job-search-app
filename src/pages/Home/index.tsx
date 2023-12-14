import React, { useEffect, useRef } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchJobs } from "../../Redux/jobsSlice";
import debounce from "lodash.debounce";

function Home() {
  const dispatch = useDispatch<any>();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentPage = useSelector((state: RootState) => state.jobs.currentPage);
  // const hasMoreData = useSelector((state: RootState) => state.jobs.hasMoreData);

  // const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, []);

  // const handleScroll = () => {
  //   if (
  //     containerRef.current &&
  //     containerRef.current.scrollTop + containerRef.current.clientHeight >=
  //     containerRef.current.scrollHeight - 20 &&
  //     hasMoreData 
  //   ) {
  //     console.log("fafawegwagaws")
  //     dispatch(fetchJobs(currentPage + 1));
  //   }
  // };

  console.log(jobs,"jobssss")

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
      {/* {hasMoreData && <p>Loading more...</p>} */}
    </div>
  );
}

export default Home;
