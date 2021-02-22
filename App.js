import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Navigation from './navigation/Navigation';
import { getContacts } from './redux';

function App() {
  store.dispatch(getContacts());
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
