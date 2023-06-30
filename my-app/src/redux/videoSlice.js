import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentVideo: null,
  loading: false,
  searchVideos:[],
}
export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
      fetchVideoInfoStart: (state) => {
        state = { ...initialState };
        state.loading = true;
        console.log(state);
        return state
      },
      fetchSearchVideos: (state,action) => {
        state = { ...initialState };
        state.searchVideos = action.payload.searchVideos
        console.log(state);
        return state
      },
      fetchVideoInfoSuccess: (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload.currentVideo;
        return state
      },
      fetchVideoInfoFailure: (state) => {
        state = { ...initialState, error: true };
        return state
      }}});


      export const {
        fetchVideoInfoStart,
        fetchSearchVideos,
        fetchVideoInfoSuccess,
        fetchVideoInfoFailure} = videoSlice.actions;

     export default videoSlice.reducer;
