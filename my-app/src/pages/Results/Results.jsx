// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from 'react';
import { baseURL } from '../../api';
import ComplexGrid from '../../components/ResultCard';
import './Results.css';
import { useSelector } from 'react-redux';
import {
  fetchSearchVideos
} from "../../redux/videoSlice.js";
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
const images = [
  { id: 1, imgSource: 'https://media.istockphoto.com/id/1174818077/photo/mosque-and-pyramids.jpg?s=612x612&w=0&k=20&c=kewLXiirLBe_QOeAQ2MPNFk8S4oxcTFt0AMPQ4mAXKY=' },
  { id: 2, imgSource: 'https://media.istockphoto.com/id/1180786967/photo/panorama-of-cairo.jpg?s=612x612&w=0&k=20&c=Wk3c7snqjGcA56QMA3JUfd_erGcUeDeDTn99T1tjQyQ=' },
  { id: 3, imgSource: 'https://media.gettyimages.com/id/1306141437/photo/woman-standing-on-the-terrace-on-the-background-of-giza-pyramids.jpg?s=612x612&w=gi&k=20&c=Li9m0ly1X8KlWxsQuwWAkM1ihxcELqRCNW8kGk904PI=' },
  { id: 4, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' }
];
const Results = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("query :", query);
    const fetchVideos = async () => {
      try {
        const searchParams = new URLSearchParams(query);
        const qu = searchParams.get('q');
        console.log(qu)
        console.log('jjjjjjjj')
          axios.get('http://grad-vm.westeurope.cloudapp.azure.com:8000/search',{
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            params:{
            q: qu}}).then((response) => {
            console.log(response)
            let videos_res = response.data
            setVideos(videos_res);
            console.log(videos_res);
            dispatch(
              fetchSearchVideos({
                searchVideos:videos_res
              }))
              setVideos(videos_res)
          });
      } catch (error) {
        console.log("errrrrrrrrrrrrrrrrror")
        console.log(error.response.data);
      }
    };
    fetchVideos();
  }, [query]);

  return (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
  {videos.map((video,i) => (
        <Grid item  xs={12} md={12} key={i}>
          <ComplexGrid videoImg={video.id} videoId={video.id} videoTitle={video.video_title} videoSType={video.segment_type} from={video.from}  to={video.to}/>
        </Grid>
      ))}
</Grid>
  );
};

export default Results;