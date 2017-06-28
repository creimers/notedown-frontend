import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import DetailView from 'views/DetailView'
import HomeView from 'views/HomeView'
import ListView from 'views/ListView'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Root = () => (
  <Router>

    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <Link to="/">home</Link>
      <Link to="/notes">notes</Link>
    </div>

    <Route exact path="/" component={HomeView} />
    <Route path="/notes" component={ListView} />
    <Route path="/notes/:noteId" component={DetailView} />
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
