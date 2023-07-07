import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SegmentComponent from './SegmentComponent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import '../css/TabPanel.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const currentVideo = useSelector(state=> state.video)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
    style: {
      backgroundColor: "rgb(124, 204, 139)"
    }
  }}>
        <Tab label="TranScript" {...a11yProps(0)}  className='ta'/>
        <Tab label="Scene Segments" {...a11yProps(1)} className='ta' />
        <Tab label="Topic Segments" {...a11yProps(1)} className='ta' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className ="tab-panel">
        {currentVideo?.currentVideo?.vtt}
      </TabPanel>
      <TabPanel value={value} index={1}>
       Scene Segments(in seconds): {currentVideo?.coloredSeconds?.join(', ')}
      </TabPanel>
      <TabPanel value={value} index={2}>
      Topic Segments(in seconds): {currentVideo?.coloredSeconds_T?.join(', ')}
      </TabPanel>
    </Box>
  );
}