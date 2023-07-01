import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
export default function MultiActionAreaCard({videoImg}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image={videoImg}
          alt="green iguana"
                  />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Learn Vue
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Learn Vue
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}