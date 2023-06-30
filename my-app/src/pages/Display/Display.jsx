// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Display.css'
import MediaControlCard from '../../components/DisplayCom';
import React from 'react'
import ReactPlayer from 'react-player'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';
import { useSelector } from 'react-redux';

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
  const [videoUrl,setVideoUrl] = useState([]);
  const [videoData,setVideoData] = useState([]);
  const videos = useSelector(state => state.searchResults);
  const location = useLocation()
  const query = location.search;
  useEffect(() => {
    console.log("query :", query);
    setVideoUrl(query)
    const fetchVideoData = async () => {
      try {
        const searchParams = new URLSearchParams(query);
        const id = searchParams.get('q');
          axios.get(`${baseURL}/info/${id}`).then((response) => {
            console.log("responseeee",response.data)
            setVideoData(response.data);
            console.log(response.data);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideoData();
  }, [query]);
  return (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
        <Grid item  sm={12} md={8}>
           <ReactPlayer 
           controls = 'true'
           width = '95%'
           height='400px'
           url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
        </Grid>
        <Grid item sm={12} md={4}>
        <Grid container spacing={2} columns={12}>
        {images.map((image) => (
        <Grid item  sm={12} md={12} key={image.id}>
          <MediaControlCard videoImg={image.imgSource} />
        </Grid>
      ))}
        </Grid>
        </Grid>
    </Grid>
  );
};

export default Display;