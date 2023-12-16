import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface Skill {
  id: string;
}

interface JobAttributes {
  title: string;
}

interface JobRelationships {
  skills: { id: string }[];
}

interface Job {
  id: string;
  type: string;
  attributes: JobAttributes;
  relationships: JobRelationships;
}

interface ApiResponseData {
  skill: unknown;
  jobs: any;
  job: Job;
}

interface ApiResponse {
  data: ApiResponseData;
}

interface SkillState {
  [skillId: string]: string;
}

interface JobsState {
  jobs: Job[];
  status: boolean;
  currentPage: number;
  skillState: SkillState;
  hasMoreData: boolean;
  job: string;
  relatedJobs: Job[];
  skill: string;
}

const initialState: JobsState = {
  jobs: [],
  status: false,
  currentPage: 0,
  skillState: {},
  hasMoreData: true,
  job: "",
  relatedJobs: [],
  skill: "",
};

export const fetchJobs = createAsyncThunk<ApiResponse, number>(
  "jobs/fetchJobs",
  async (page: number) => {
    const response = await axios.get<ApiResponse>(
      `https://skills-api-zeta.vercel.app/jobs?cursor=0&limit=12`
    );
    return response.data;
  }
);

export const fetchSkillWithId = createAsyncThunk<ApiResponse, string>(
  "skillId/fetchSkillId",
  async (skillId: string) => {
    const response = await axios.get<ApiResponse>(
      `https://skills-api-zeta.vercel.app/skill/${skillId}`
    );
    return response.data;
  }
);

export const fetchJobWithId = createAsyncThunk<ApiResponse, string>(
  "jobId/fetchJobsId",
  async (jobId: string) => {
    const response = await axios.get<ApiResponse>(
      `https://skills-api-zeta.vercel.app/job/${jobId}`
    );
    return response.data;
  }
);

export const fetchSkillName = createAsyncThunk<
  { skillId: string; skillName: string },
  string
>("skills/fetchSkillName", async (skillId: string) => {
  const response = await axios.get<string>(
    `https://skills-api-zeta.vercel.app/skill/${skillId}`
  );
  return { skillId, skillName: response.data };
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
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
      .addCase(fetchJobWithId.pending, (state) => {})

      .addCase(fetchJobWithId.fulfilled, (state, action) => {
        const jobResponse = action.payload.data.job;
        if (!state.relatedJobs.some((job) => job?.id == jobResponse?.id)) {
          state.relatedJobs.push({ ...jobResponse });
        } else {
          console.log("no match");
        }
      })
      .addCase(fetchJobWithId.rejected, (state) => {})
      .addCase(
        fetchSkillName.fulfilled,
        (
          state,
          action: PayloadAction<{ skillId: string; skillName: string }>
        ) => {
          const { skillId, skillName } = action.payload;
          state.skillState[skillId] = skillName;
        }
      )
      .addCase(fetchSkillWithId.fulfilled, (state, action) => {
        state.skill = action.payload.data.skill as unknown as string;
      });
  },
});

export default jobsSlice.reducer;
