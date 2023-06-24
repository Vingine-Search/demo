
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  import Upload from "./Upload.jsx";
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
      // backgroundColor:'#181818',
      // backgroundColor: 'rgb(236, 251, 251)',
      backgroundColor: 'rgb(255, 255, 255)',
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
  }




    // const navigate = useNavigate();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
      if (!query) return;
      // navigate(`/search?q=${query}`);
    };
    const handleOpenSidebar = (e) => {
      // e.preventDefault();
      console.log("open sidebar");
      const bar = document.getElementById("mySidenav");
      console.log(bar);
      if (bar.style.width === "250px") {
        bar.style.width = "0";
      } else {
        bar.style.width = "250px";
      }
      // document.getElementById("main").style.marginLeft = "250px";
    };
  
    return (
      <div  style={Container_style}>
        <div style={Wrapper_style}>
          <div  class="search-container" style={Search_style}>
            <input
              className="Input_style"
              placeholder="Search Deep Inside"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.keyCode === 13 && handleSearch()}
            />
            <SearchOutlinedIcon
              onClick={handleSearch}
            />
          </div>
            <div
              style={{ display: "flex", alignItems: "center" }}
            >
            <img className="Avatar_style" alt= "" onClick={() => handleOpenSidebar()} />
            </div>
          {isUploadOpen && <Upload setOpen={setIsUploadOpen} />}
        </div>
      </div>
    );
  };
  
  export default Navbar;