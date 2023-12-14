import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../Redux/store';
import { fetchJobWithId } from '../../../Redux/jobsSlice';

function JobDetails() {
    const dispatch = useDispatch<any>();
    const jobs = useSelector((state: RootState) => state.jobs.job);
    const { jobId } = useParams();


    useEffect(() => {
        if (jobId) {
            dispatch(fetchJobWithId(jobId));
        }
    }, [dispatch, jobId]);


    console.log(jobs,"jobs")
  return (
    <div>JobDetails</div>
  )
}

export default JobDetails