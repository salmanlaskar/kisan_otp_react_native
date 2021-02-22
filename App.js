import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Navigation from './navigation/Navigation';
import {getMessage} from './redux';

function App() {
  //getting all messages in app level using redux
  store.dispatch(getMessage());
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
