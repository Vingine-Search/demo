import Navbar from "./components/NavBar";
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import VideoUpload from './components/Upload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Display from "./pages/Display/Display";
import './App.css'
function App() {
  // const [darkMode, setDarkMode] = useState(true);
  return (
    // <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Router>
      <div className='app-main'>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route exact path="/display" element={<Display />} />
          <Route exact path="/results" element={<Results />} />
          <Route exact path="/upload" element={<VideoUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
