import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Provider } from 'react-redux';
// import store from './store.js'

createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <App />
  // </Provider>
);
// 1. we want to import our provider function
// 2. we want to wrap our app around in our provider function