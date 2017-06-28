import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import PouchDB from 'pouchdb'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { persistentStore } from 'redux-pouchdb'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'

import Body from 'components/Body'
import Header from 'components/Header'

import rootReducer from 'ducks'

import AddNoteView from 'views/AddNoteView'
import DetailView from 'views/DetailView'
import HomeView from 'views/HomeView'
import ListView from 'views/ListView'


import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin()

const db = new PouchDB('notes')

const applyMiddlewares = applyMiddleware(thunkMiddleware)

const createStoreWithMiddleware = compose(
  applyMiddlewares,
  persistentStore(db)
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

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
