// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import { useRef } from 'react';
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
  
  const playerRef = useRef(null);
  const searchParams = new URLSearchParams(query);
  const id = searchParams.get('q');
  console.log("idddddddddd",id);
  const from = searchParams.get('from');
  console.log("idddddddddd",from);

  // const handlePlayerReady = () => {
  //   if (playerRef.current) {
  //     playerRef.current.seekTo(from);
  //     playerRef.current.getInternalPlayer().playPause();
  //   }
  // };
  const tracks = [
    {
      kind: 'subtitles',
      src: `http://grad-vm.westeurope.cloudapp.azure.com:8000/vtt/${id}`,
      srcLang: 'en',
      default: true
    }
  ];
  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };
  const handlePlayerReady = React.useCallback(() => {
    playerRef.current.seekTo(from, 'seconds');
  }, []);
  // const dispatch = useDispatch()
  useEffect(() => {

    console.log("queryyyy from display :", query);
    const fetchVideoData = async () => {
      try {
        const searchParams = new URLSearchParams(query);
        const id = searchParams.get('q');
        console.log("idddddddddd",id);
        const from = searchParams.get('from');
        console.log("idddddddddd",from);
        const segment_type = searchParams.get('s');
        setSegmentType(segment_type)
        console.log(segment_type)
        // if(playerRef.current){
        //   playerRef?.current?.seekTo(from); // start playing from 30th second
        //   playerRef?.current?.play();
        // }
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
             const coloredSeconds_c = coloredSeconds.map(formatTime)
             const coloredSeconds_obt =response.data?.topic_segments;
             const toValues_T = coloredSeconds_obt?.map(obj => obj.to); // extract "to" values
             const coloredSeconds_T = toValues_T?.reduce((acc, val) => acc.concat(val), []);
             const coloredSeconds_T_c = coloredSeconds_T.map(formatTime)
            dispatch(
              fetchVideoInfoSuccess({
                currentVideo:response.data,
                coloredSeconds: coloredSeconds_c,
                coloredSeconds_T: coloredSeconds_T_c,
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
      ): (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
        <Grid item sm={12} md={6}>
        <ReactPlayer 
           ref={playerRef}
           controls = 'true'
           width = '100%'
           height='300px'
           url={videoUrl} 
           onStart={handlePlayerReady}
           playing = 'true'
           config = {{
           file: {
          tracks,
          attributes: {
            crossorigin: 'anonymous'
          }
              }
          }}
          
           />
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