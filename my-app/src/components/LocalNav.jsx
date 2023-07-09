import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useMemo } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import BasicTabs_D_A from "./BasicTabs_D_A";
import '../css/NavBar.css';
import { useSelector } from "react-redux";
const formatTime = seconds => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
};
function searchWordInSentences(sentences, word,asr) {
    const result = [];
    console.log(sentences)
    for (let i = 0; i < sentences?.length; i++) {
      if (sentences[i].indexOf(word) !== -1) {
        if (asr === 1)
        result.push(formatTime(i+1));
        else  result.push(formatTime((i+1)*5));
      }
    }
    console.log(result)
    return result;
  }
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
  const Navbarlocal = () => {


    const Container_style = {
      position: 'sticky',
      top: 0,
      backgroundColor:'rgb(230, 232, 232)',
      height: '80px',
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
  const Search_style = {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    borderRadius: '30px',
    backgroundColor:'white',
    height: '50%',
    margin: '0px 5px',
    '@media': {
      [device.tablet]: {
        width: 'auto',
      },
    },
  } ;
    const currentVideo = useSelector(state=> state.video)
    const seconds = currentVideo?.currentVideo?.duration;
    const [query, setQuery] = useState("");
    const [resAsr,setResultsAsr] = useState([]);
    const [resDsc,setResultsDsc] = useState([]);
    const getBarColorDsc = useMemo(() => {
        return (second) => {
          return resDsc.includes(second) ? "green" : "rgb(255, 255, 255)";
        };
      }, [resDsc]);
      const getBarColorAsr = useMemo(() => {
        return (second) => {
          return resAsr.includes(second) ? "green" : "rgb(255, 255, 255)";
        };
      }, [resAsr]);
    const handleSearch = (e) => {
      if (!query) return;
      const asr = currentVideo?.currentVideo?.asr
      console.log(asr)
      const dsc = currentVideo?.currentVideo?.dsc
      console.log(dsc)
      const resAsr = searchWordInSentences(asr,query,1)
      const resDsc = searchWordInSentences(dsc,query,0)
      setResultsAsr(resAsr)
      setResultsDsc(resDsc)
    };

    return (
        <>
      <div  style={Container_style}>
        <div style={Wrapper_style}>
          <div  class="search-container" style={Search_style}>
            <input
              className="Input_style"
              placeholder="Search Deep Inside"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.key === 'Enter'  && handleSearch()}
            />
            <SearchOutlinedIcon
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <>
    {(resAsr.length === 0) ? (
      <div>
      </div>
      ) : (
        <>
      
     </>)}
    </>
    <>
    {(resDsc.length === 0) ? (
      <div>
        
      </div>
      ) : (
        <>
        
    </>)}
    <BasicTabs_D_A resDsc={resDsc}  resAsr={resAsr}/>
    </>
    </>
    );
  };
  
  export default Navbarlocal;