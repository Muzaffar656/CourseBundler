import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  { 
    courseRequest: (state, action) => {
        state.loading = true
    },
    courseRequestSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    courseRequestFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    contactRequest:(state)=>{
      state.loading = true
    },
    contactSuccess:(state,action)=>{
      state.loading = false
      state.message = action.payload
    },
    contactFail:(state,action)=>{
      state.loading = false
      state.error = action.payload
    }
  }
);
