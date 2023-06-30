// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Display.css'
import MediaControlCard from '../../components/DisplayCom';
import BasicTabs from '../../components/VideoDataBar'
import React from 'react'
import ReactPlayer from 'react-player'
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbarlocal from '../../components/LocalNav';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { baseURL } from '../../api';
import { useSelector } from 'react-redux';
import Recom from '../../components/Recom';

const images = [
  { id: 1, imgSource: 'https://media.istockphoto.com/id/1174818077/photo/mosque-and-pyramids.jpg?s=612x612&w=0&k=20&c=kewLXiirLBe_QOeAQ2MPNFk8S4oxcTFt0AMPQ4mAXKY=' },
  { id: 2, imgSource: 'https://media.istockphoto.com/id/1180786967/photo/panorama-of-cairo.jpg?s=612x612&w=0&k=20&c=Wk3c7snqjGcA56QMA3JUfd_erGcUeDeDTn99T1tjQyQ=' },
  { id: 3, imgSource: 'https://media.gettyimages.com/id/1306141437/photo/woman-standing-on-the-terrace-on-the-background-of-giza-pyramids.jpg?s=612x612&w=gi&k=20&c=Li9m0ly1X8KlWxsQuwWAkM1ihxcELqRCNW8kGk904PI=' },
  { id: 4, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 5, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 6, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 7, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 8, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' }
];
const Display = () => {
  // const [videoUrl,setVideoUrl] = useState([]);
  // const [videoData,setVideoData] = useState([]);
  const searchVideos = useSelector(state =>state.video.searchVideos);
  const location = useLocation();
  const query = location.search;
  // const dispatch = useDispatch()
  useEffect(() => {
    console.log("query :", query);
    // setVideoUrl(query)
    const fetchVideoData = async () => {
      try {
        console.log("searchVideos",searchVideos)
        const searchParams = new URLSearchParams(query);
        const id = searchParams.get('q');
          axios.get(`${baseURL}/info/${id}`).then((response) => {
            console.log("responseeee",response.data)
            // setVideoData(response.data);
            console.log(response.data);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideoData();
  }, [query]);
  return (
  // <Grid container spacing={2} columns={12} className='main-grid' justify="center">
  //       <Grid item  sm={12} md={8}>
  //          <ReactPlayer 
  //          controls = 'true'
  //          width = '100%'
  //          height='300px'
  //          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
  //       </Grid>
  //       <Grid item sm={12} md={4}>
  //       <Grid container spacing={2} columns={12}>
  //       {searchVideos.map((video) => (
  //       <Grid item  sm={12} md={12} key={video.id}>
  //         <MediaControlCard videoImg={video.thumbnail} />
  //       </Grid>
  //     ))}
  //       </Grid>
  //       </Grid>
  //   </Grid>
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
        <Grid item sm={12} md={6}>
        <ReactPlayer 
           controls = 'true'
           width = '100%'
           height='300px'
           url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
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