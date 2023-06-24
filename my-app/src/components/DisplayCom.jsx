import * as React from 'react';
import { Grid } from '@mui/material';
import '../css/DisplayCom.css'
export default function MediaControlCard({videoImg}) {
  return (
  <Grid container spacing={2} columns={12}>
  <Grid item xs={12} sm={5}>
    <img alt='' src={videoImg} className='img-card'/>
  </Grid>
  <Grid item xs={12} sm={7}>
    <Grid container spacing={1} columns={12}>
      <Grid item xs={12} sm={12} >
       <h3>Learn Vue js</h3>
      </Grid>
      <Grid item xs={12} sm={12} >
      <h4>100K views • </h4>
      </Grid>
      <Grid item xs={12} sm={12} >
      <h4>1 day ago</h4>
      </Grid>
    </Grid>
  </Grid>
</Grid>
  );
}