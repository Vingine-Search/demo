import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentVideo: null,
  coloredSeconds:[],
  coloredSeconds_T:[],
  loading: true,
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
        state.currentVideo = action.payload.currentVideo;
        state.coloredSeconds = action.payload.coloredSeconds;
        state.coloredSeconds_T = action.payload.coloredSeconds_T;
        state.loading = false;
        console.log("staaaaaate",state.currentVideo);
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
