import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import JobDetails from './pages/Home/JobDetails';
import Search from './components/Search';
import SearchPage from './pages/SearchPage';
import SkillDetails from './pages/Home/SkillDetails';
import styles from "./App.module.scss";

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
          <Route  path="/search" Component={SearchPage} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
