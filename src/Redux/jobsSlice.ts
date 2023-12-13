
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

// interface JobsState {
//     jobs: Job[];
//     status: boolean;
// }

interface JobsState {
    jobs: Job[];
    status: boolean;
    currentPage: number; // Add this property
  }
  
  const initialState: JobsState = {
    jobs: [],
    status: false,
    currentPage: 0, // Set initial page or cursor
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

// const initialState: JobsState = {
//     jobs: [],
//     status: false,
// };

// const jobsSlice = createSlice({
//     name: "jobs",
//     initialState,
//     reducers: {
//         allJobs: (state, action: PayloadAction<ApiResponse>) => {
//             state.jobs = action.payload.data.jobs;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchJobs.pending, (state) => {
//                 state.status = true;
//             })
//             .addCase(fetchJobs.fulfilled, (state, action) => {
//                 state.status = false;
//                 state.jobs = action.payload.data.jobs;
//             })
//             .addCase(fetchJobs.rejected, (state) => {
//                 state.status = false;
//             });
//     },
// });

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
        });
    },
  });

export const {
    allJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;



