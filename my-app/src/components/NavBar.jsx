
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { Button } from "@mui/material";
import '../css/NavBar.css'
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
  
  export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`,
  };
  const Navbar = () => {
    const Container_style = {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: 'rgb(37, 37, 37)',
      height: '200px',
    };

    const Wrapper_style = {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: '8rem',
      height: '100%',
      position: 'relative',
      '@media': {
        [device.tablet]: {
          gap: '2rem',
          justifyContent: 'space-between',
        },
      },
  };
  const styles = {
    tab: {
        color: '#4b4b4b'
    }}
  const Search_style = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    backgroundColor:'white',
    height: '20%',
    margin: '10px 0px',
    '@media': {
      [device.tablet]: {
        width: 'auto',
      },
    },
  }
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleSearch = (e) => {
      if (!query) return;
      console.log(query)
     navigate(`/results?q=${query}`)
    };
    return (
      <div  style={Container_style}>
        <div style={Wrapper_style}>
        <div  className="search-main">
        <h3>Find the right moment</h3>
        <h4>Search inside every video for just the content you need</h4>
          <div  class="search-container" style={Search_style}>
          <SearchOutlinedIcon
            />
            <input
              className="Input_style"
              placeholder="Search Deep Inside"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.key === 'Enter'  && handleSearch()}
            />
             <Button variant="contained" color="success" onClick={handleSearch}>
          Search
          </Button>
          </div>
          </div>
         
        </div>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs  value={value} onChange={handleChange} centered TabIndicatorProps={{
    style: {
      backgroundColor: "green"
    }
  }}>
        <Tab label="Our Videos" className="ta" />
      </Tabs>
    </Box>
      </div>
    );
  };
  
  export default Navbar;