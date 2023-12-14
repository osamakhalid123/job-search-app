import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

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

interface ApiResponse {
    data: {
        jobs: Job[];
        meta: {
            next: number;
            count: number;
        };
    };
    job: string; // Change the type to string
}

interface SkillState {
    [skillId: string]: string; // Skill ID mapped to skill name
}

interface JobsState {
    jobs: Job[];
    status: boolean;
    currentPage: number;
    skillState: SkillState;
    hasMoreData: boolean;
    job: string; // Change the type to string
}

const initialState: JobsState = {
    jobs: [],
    status: false,
    currentPage: 0,
    skillState: {},
    hasMoreData: true,
    job: "", // Initialize 'job' as an empty string
};

export const fetchJobs = createAsyncThunk<ApiResponse, number>(
    'jobs/fetchJobs',
    async (page: number) => {
        const response = await axios.get<ApiResponse>(`https://skills-api-zeta.vercel.app/jobs?cursor=0&limit=12`);
        return response.data;
    }
);

export const fetchJobWithId = createAsyncThunk<ApiResponse, string>(
  'jobId/fetchJobsId',
  async (jobId: string) => {
    console.log(jobId,"jobId")
      const response = await axios.get<ApiResponse>(`https://skills-api-zeta.vercel.app/job/${jobId}`);
      return response.data;
  }
);

export const fetchSkillName = createAsyncThunk<
    { skillId: string; skillName: string },
    string
>('skills/fetchSkillName', async (skillId: string) => {
    const response = await axios.get<string>(`https://skills-api-zeta.vercel.app/skill/${skillId}`);
    return { skillId, skillName: response.data };
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        // No need for 'allJobs' reducer in this case
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = false;
                state.jobs = [...action.payload.data.jobs];
            })
            .addCase(fetchJobs.rejected, (state) => {
                state.status = false;
            })
            .addCase(fetchJobWithId.pending, (state) => {
                // Handle pending state if needed
            })
            .addCase(fetchJobWithId.fulfilled, (state, action) => {
              console.log(action.payload,"action.payload.job")
              state.job = action.payload as unknown as string;
                // state.job = action.payload.job; // Update 'job' with the fetched job
            })
            .addCase(fetchJobWithId.rejected, (state) => {
                // Handle rejected state if needed
            })
            .addCase(fetchSkillName.fulfilled, (state, action: PayloadAction<{ skillId: string; skillName: string }>) => {
                const { skillId, skillName } = action.payload;
                state.skillState[skillId] = skillName;
            });
    },
});

export default jobsSlice.reducer;
