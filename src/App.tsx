import Header from './components/Header';
import Search from './components/Search';
import Home from './pages/Home';
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SkillDetails from './pages/Home/SkillDetails';
import JobDetails from './pages/Home/JobDetails';

function App() {
  return (
    <Router>
    <div>
      <Header />
      <Search />
      <div className={`${styles.contentWrapper}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skill/:skillId" Component={SkillDetails} />
          <Route  path="/job/:jobId" Component={JobDetails} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
