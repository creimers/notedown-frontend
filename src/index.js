import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Body from 'components/Body'
import Header from 'components/Header'

import rootReducer from 'ducks'

import AddNoteView from 'views/AddNoteView'
import DetailView from 'views/DetailView'
import EditView from 'views/EditView'
import HomeView from 'views/HomeView'
import ListView from 'views/ListView'


import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin()

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)


const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div>
          <Header />
          <Body>
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/notes" component={ListView} />
              <Route exact path="/notes/add" component={AddNoteView} />
              <Route path="/notes/:noteId/edit" component={EditView} />
              <Route path="/notes/:noteId" component={DetailView} />
            </Switch>
          </Body>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
