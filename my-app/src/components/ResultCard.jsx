import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  height: '100%',
  borderRadius:'5%',
});
export default function ComplexGrid({videoImg,videoId}){
    const navigate = useNavigate();
    const handleClick = (e) => {
      navigate(`/display?q=${videoId}`);
    };
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '100%',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 250, height: 180 }}
          onClick={(e) => handleClick()}
          >
            <Img alt="complex" src={videoImg}  />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Learn Vue
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              X
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}