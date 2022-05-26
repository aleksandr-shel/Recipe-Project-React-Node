import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
// import {Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
// import {createMemoryHistory, createBrowserHistory} from 'history';
import { ToastContainer } from 'react-toastify';
// export const history = createBrowserHistory();
// export const history = createMemoryHistory();

ReactDOM.render(
  <>
  <ToastContainer position='bottom-right'/>
  <BrowserRouter>
  {/* <Router navigator={history} location={history.location}> */}
      <Provider store={store}>
        <App />
      </Provider>
  {/* </Router> */}
  </BrowserRouter>
  </>,
  document.getElementById('root')
);
