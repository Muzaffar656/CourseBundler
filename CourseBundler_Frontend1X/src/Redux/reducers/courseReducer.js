import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [] },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: state => {
        state.loading = true;
      },
      addToPlaylistSuccess: (state, action) => {
   
        state.loading = false;
        state.message = action.payload;
      },
      addToPlaylistFail: (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.payload;
      },
      removeFromPlaylistRequest:(state,action)=>{
        state.loading = true
      },
      removeFromPlaylistSuccess : (state,action)=>{
        console.log(action.payload)
        state.loading = false;
        state.message = action.payload
      },
      removeFromPlaylistFail:(state,action)=>{
        console.log(action)
        state.loading = false;
          state.error = action.payload
      },
      getCourseLecturesRequest:(state,action)=>{
        state.loading = true
      },
      getCourseLecturesSuccess:(state,action)=>{
        state.loading = false
        state.lectures = action.payload
      },
      getCourseLecturesFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
      },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
