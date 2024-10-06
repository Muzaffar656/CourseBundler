import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    getAdminStatsRequest: (state, action) => {
      state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.success = action.payload.success;
      state.userCount = action.payload.userCount;
      state.userPercentage = action.payload.userPercentage;
      state.userProfit = action.payload.userProfit;
      state.viewCount = action.payload.viewCount;
      state.viewPercentage = action.payload.viewPercentage;
      state.viewProfit = action.payload.viewProfit;
    },
    getAdminStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCourseRequest: (state, action) => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: (state, action) => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectureRequest: (state, action) => {
      state.loading = true;
    },
    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: (state, action) => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state, action) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUserRequest: (state, action) => {
      state.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeRoleRequest: (state, action) => {
      state.loading = true;
    },
    changeRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changeRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state, action) => {
      state.message = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  }
);
