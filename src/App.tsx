import Header from './components/Header';
import Search from './components/Search';
import Home from './pages/Home';
import styles from "./App.module.scss";

function App() {
  return (
    <div>
      <Header/>
      <Search/>
      <div className={`${styles.contentWrapper}`}>
      <Home/>
      </div>
    </div>
  );
}

export default App;
