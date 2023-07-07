// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Display.css'
import BasicTabs from '../../components/VideoDataBar'
import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
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
  const currentVideo = useSelector(state=> state.video)
  const [segmentType,setSegmentType] = useState([]);
  const [videoData,setVideoData] = useState([])
  const location = useLocation();
  const dispatch = useDispatch()
  const query = location.search;
  // const dispatch = useDispatch()
  useEffect(() => {
    console.log("queryyyy from display :", query);
    const fetchVideoData = async () => {
      try {
        const searchParams = new URLSearchParams(query);
        const id = searchParams.get('q');
        console.log("idddddddddd",id);
        const segment_type = searchParams.get('s');
        setSegmentType(segment_type)
        console.log(segment_type)
        // setVideoUrl(`http://grad-vm.westeurope.cloudapp.azure.com:8000/download/${id}`)
        // dispatch(
        //       fetchVideoInfoSuccess({
        //         loading:false
        //       }))
          axios.get(`http://grad-vm.westeurope.cloudapp.azure.com:8000/info/${id}`).then((response) => {
            console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
            console.log("responseeee",response.data)
            setVideoData(response.data);
            console.log(" download responseeee",response.data)
            setVideoUrl(`http://grad-vm.westeurope.cloudapp.azure.com:8000/download/${id}`)
            console.log(response.data);
             const coloredSeconds_ob =response.data?.scene_segments;
             const toValues = coloredSeconds_ob?.map(obj => obj.to); // extract "to" values
             const coloredSeconds = toValues?.reduce((acc, val) => acc.concat(val), []);
             const coloredSeconds_obt =response.data?.topic_segments;
             const toValues_T = coloredSeconds_obt?.map(obj => obj.to); // extract "to" values
             const coloredSeconds_T = toValues_T?.reduce((acc, val) => acc.concat(val), []);
            dispatch(
              fetchVideoInfoSuccess({
                currentVideo:response.data,
                coloredSeconds: coloredSeconds,
                coloredSeconds_T: coloredSeconds_T,
                loading:false
              }))
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideoData();
  }, [query]);
  return (
    <>
    {currentVideo?.loading ? (
        <div>
        <Typography>Loading...</Typography>
      </div>
      ) : (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
        <Grid item sm={12} md={6}>
        <ReactPlayer 
           controls = 'true'
           width = '100%'
           height='300px'
           url={videoUrl} />
           <SegmentComponent  />
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
    </Grid>)}
    </>);
};
export default Display;