// import MultiActionAreaCard from '../../components/VideoCard'
import { Grid } from '@mui/material';
import './Results.css'
import ComplexGrid from '../../components/ResultCard';

const images = [
  { id: 1, imgSource: 'https://media.istockphoto.com/id/1174818077/photo/mosque-and-pyramids.jpg?s=612x612&w=0&k=20&c=kewLXiirLBe_QOeAQ2MPNFk8S4oxcTFt0AMPQ4mAXKY=' },
  { id: 2, imgSource: 'https://media.istockphoto.com/id/1180786967/photo/panorama-of-cairo.jpg?s=612x612&w=0&k=20&c=Wk3c7snqjGcA56QMA3JUfd_erGcUeDeDTn99T1tjQyQ=' },
  { id: 3, imgSource: 'https://media.gettyimages.com/id/1306141437/photo/woman-standing-on-the-terrace-on-the-background-of-giza-pyramids.jpg?s=612x612&w=gi&k=20&c=Li9m0ly1X8KlWxsQuwWAkM1ihxcELqRCNW8kGk904PI=' },
  { id: 4, imgSource: 'https://media.gettyimages.com/id/171450925/photo/city-skyline-cairo-at-dusk.jpg?s=612x612&w=gi&k=20&c=3G0g1WhZnicanIKudZx6I46SNR9YPyiimUUAkeUb0nU=' }
];

const Results = () => {
  // const [videos] = useState([]);
  return (
  <Grid container spacing={2} columns={12} className='main-grid' justify="center">
  {images.map((image) => (
        <Grid item  xs={12} md={12} key={image.id}>
          <ComplexGrid videoImg={image.imgSource}/>
        </Grid>
      ))}
</Grid>
  );
};

export default Results;