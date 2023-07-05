import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useMemo } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import '../css/NavBar.css';
import { useSelector } from "react-redux";

function searchWordInSentences(sentences, word,asr) {
    const result = [];
    console.log(sentences)
    for (let i = 0; i < sentences?.length; i++) {
      if (sentences[i].indexOf(word) !== -1) {
        if (asr === 1)
        result.push(i+1);
        else  result.push((i+1)*5);
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
    const [resultsAsr,setResultsAsr] = useState([]);
    const [resultsDsc,setResultsDsc] = useState([]);
    const getBarColorDsc = useMemo(() => {
        return (second) => {
          return resultsDsc.includes(second) ? "green" : "rgb(255, 255, 255)";
        };
      }, [resultsDsc]);
      const getBarColorAsr = useMemo(() => {
        return (second) => {
          return resultsAsr.includes(second) ? "green" : "rgb(255, 255, 255)";
        };
      }, [resultsAsr]);
    const handleSearch = (e) => {
      if (!query) return;
      const asr = currentVideo?.currentVideo?.asr
      const dsc = currentVideo?.currentVideo?.dsc
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
    {(resultsAsr.length === 0) ? (
        <div>
      </div>
      ) : (
        <>
        <Typography>ASR</Typography>
    <div className="root">
      {[...Array(seconds)].map((_, index) => (
        <div
          key={index}
          className="bar"
          style={{
            width: `${100/seconds}%`,
            backgroundColor: getBarColorAsr(index + 1),
          }}
        />
      ))}
    </div> </>)}
    </>
    <>
    {(resultsDsc.length === 0) ? (
      <div>
        
      </div>
      ) : (
        <>
        <Typography>DSC</Typography>
    <div className="root">
      {[...Array(seconds)].map((_, index) => (
        <div
          key={index}
          className="bar"
          style={{
            width: `${100/seconds}%`,
            backgroundColor: getBarColorDsc(index + 1,resultsAsr),
          }}
        />
      ))}
    </div></>)}
    </>
    </>
    );
  };
  
  export default Navbarlocal;