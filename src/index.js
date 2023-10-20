import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './store/reducer/reducer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Fonts
import './fonts/pretendard/pretendard.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const rootReducer = combineReducers({
  reducer: reducer,
});

const store = createStore(rootReducer);

root.render(
  
  <Provider store={store}>
    <App />
  </Provider>

);

reportWebVitals();
