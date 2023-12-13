
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
}
interface SkillState {
    [skillId: string]: string; // Skill ID mapped to skill name
  }
interface JobsState {
    jobs: Job[];
    status: boolean;
    currentPage: number; // Add this property
    skillState: SkillState;
  }
  
  const initialState: JobsState = {
    jobs: [],
    status: false,
    currentPage: 0, // Set initial page or cursor
    skillState: {},
  };

  export const fetchJobs = createAsyncThunk<ApiResponse, number>(
    'jobs/fetchJobs',
    async (page: number) => {
      const response = await axios.get<ApiResponse>(
        `https://skills-api-zeta.vercel.app/jobs?cursor=${page}&limit=12`
      );
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
      allJobs: (state, action: PayloadAction<ApiResponse>) => {
        state.jobs = [...state.jobs, ...action.payload.data.jobs];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchJobs.pending, (state) => {
          state.status = true;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
          state.status = false;
          state.jobs = action.payload.data.jobs;
          state.currentPage++; // Increment page or cursor after fetching data
        })
        .addCase(fetchJobs.rejected, (state) => {
          state.status = false;
        })
        .addCase(fetchSkillName.fulfilled, (state, action: PayloadAction<{ skillId: string; skillName: string }>) => {
            const { skillId, skillName } = action.payload;
            state.skillState[skillId] = skillName;
          });
        
        
    },
  });

export const {
    allJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;



