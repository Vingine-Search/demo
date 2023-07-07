// import React, { useEffect,useState } from "react";
import '../css/SegmentComponent.css'
import { Typography } from "@mui/material";
import { useSelector } from 'react-redux';
export default function SegmentComponent(){
  const currentVideo = useSelector(state=> state.video)
  // const [coloredSeconds, setColoredSeconds] = useState('');
  const seconds = currentVideo?.currentVideo?.duration;
  const coloredSeconds =  currentVideo?.coloredSeconds;
  const getBarColor = (second) => {
    return coloredSeconds?.includes(String(second)) ? "green" : "rgb(255, 255, 255)";
  };
  return (<>
    {currentVideo?.loading ? (
        <div>
        <Typography>Loading...</Typography>
      </div>
      ) : (
        // If the videoData prop is not an array or is an empty array, render a loading message or a placeholder component
    <div className="root">
      {[...Array(Math.round(seconds))].map((_, index) => (
        <div
          key={index}
          className="bar"
          style={{
            width: `${100/seconds}%`,
            backgroundColor: getBarColor(index + 1),
          }}
        />
      ))}
    </div>)}
    </>
  );
}