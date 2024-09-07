import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './containers/Navbar';
import Home from './containers/Home';


function App() {
  return (
    <Router>
      <div className="w-full h-8 fixed flex justify-center bottom-0 bg-white">
        <Navbar />
      </div>
      <div className="w-full h-[calc(100%-48px)] fixed overflow-y top-[48px] z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>

  );
}

export default App;
