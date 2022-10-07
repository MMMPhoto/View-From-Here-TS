import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import home from './pages/home.js'
import './App.css';

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Routes>

          <Route exact path='/' component={home} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
