import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './Components/pages/home.js'
import './App.css';

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Switch>

          <Route exact path='/' component={home} />

        </Switch>

      </Router>

    </div>
  );
}

export default App;
