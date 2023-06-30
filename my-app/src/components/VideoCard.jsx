import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
export default function MultiActionAreaCard({videoImg}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={videoImg}
          alt="green iguana"
                  />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Learn Vue
          </Typography>
          <Grid container spacing={1} columns={12}>
      <Grid item xs={5}  >
      <h4>100K views • </h4>
      </Grid>
      <Grid item xs={7}  >
      <h4>1 day ago</h4>
      </Grid>
    </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}