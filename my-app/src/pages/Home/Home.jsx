// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Home.css'
import MultiActionAreaCard from '../../components/VideoCard';
import axios from 'axios';
import { useEffect,useState } from 'react';

const img = [
  { id: 1, imgSource: 'https://media.istockphoto.com/id/1174818077/photo/mosque-and-pyramids.jpg?s=612x612&w=0&k=20&c=kewLXiirLBe_QOeAQ2MPNFk8S4oxcTFt0AMPQ4mAXKY=' },
  { id: 2, imgSource: 'https://media.istockphoto.com/id/1180786967/photo/panorama-of-cairo.jpg?s=612x612&w=0&k=20&c=Wk3c7snqjGcA56QMA3JUfd_erGcUeDeDTn99T1tjQyQ=' },
  { id: 3, imgSource: 'https://media.gettyimages.com/id/1306141437/photo/woman-standing-on-the-terrace-on-the-background-of-giza-pyramids.jpg?s=612x612&w=gi&k=20&c=Li9m0ly1X8KlWxsQuwWAkM1ihxcELqRCNW8kGk904PI=' },
  { id: 4, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 5, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 6, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 7, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
  { id: 8, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' },
];


const Home = () => {
  const [videos,setVideos] = useState([])
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
          axios.get(`http://grad-vm.westeurope.cloudapp.azure.com:8000/list/`).then((response) => {
            console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
            console.log(response.data)
            setVideos(response.data)
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideoData();
  }, []);
  return (
  <Grid container spacing={2} columns={15} className='main-grid' justify="center">
  {videos.map((video,i) => (
        <Grid item  xs={15} md={5} key={i}>
          <MultiActionAreaCard videoImg={video.id} videoTitle = {video.title}/>
        </Grid>
      ))}
</Grid>
  );
};

export default Home;