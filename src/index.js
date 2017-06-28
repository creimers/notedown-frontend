import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'

import Body from 'components/Body'
import Header from 'components/Header'
import AddNoteView from 'views/AddNoteView'
import DetailView from 'views/DetailView'
import HomeView from 'views/HomeView'
import ListView from 'views/ListView'

import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin()

const Root = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Header />
        <Body>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/notes" component={ListView} />
            <Route exact path="/notes/add" component={AddNoteView} />
            <Route path="/notes/:noteId" component={DetailView} />
          </Switch>
        </Body>
      </div>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
