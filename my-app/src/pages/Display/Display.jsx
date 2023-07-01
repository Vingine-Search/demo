// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Display.css'
import BasicTabs from '../../components/VideoDataBar'
import React from 'react'
import ReactPlayer from 'react-player'
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SegmentComponent from '../../components/SegmentComponent'
import Navbarlocal from '../../components/LocalNav';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { baseURL } from '../../api';
import { fetchVideoInfoSuccess } from '../../redux/videoSlice';
const Display = () => {
  const [videoUrl,setVideoUrl] = useState([]);
  const [videoData,setVideoData] = useState([])
  const location = useLocation();
  const dispatch = useDispatch()
  const query = location.search;
  // const dispatch = useDispatch()
  useEffect(() => {
    console.log("query :", query);
    const fetchVideoData = async () => {
      try {
        const searchParams = new URLSearchParams(query);
        const id = searchParams.get('q');
          axios.get(`${baseURL}/info/${id}`).then((response) => {
            console.log("responseeee",response.data)
            setVideoData(response.data);
            console.log(response.data);
            dispatch(
              fetchVideoInfoSuccess({
                currentVideo:response.data
              }))
          });
          axios.get(`${baseURL}/download/${id}`).then((response) => {
            console.log(response.data);
            setVideoUrl(response.data.video_url)
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideoData();
  }, [query]);
  return (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
        <Grid item sm={12} md={6}>
        <ReactPlayer 
           controls = 'true'
           width = '100%'
           height='300px'
           url={videoUrl} />
           <SegmentComponent/>
           <Typography gutterBottom variant="h5" component="div" className='s-t'>
           Search Inside The Video
          </Typography>
          <Navbarlocal/>
        </Grid>
        <Grid item sm={12} md={6} >
        <div  className='videoData'>
        <BasicTabs/>
        </div>
        </Grid>
    </Grid>
  );
};
export default Display;