import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {legacyCreateStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reducer from './reducers';
import BaseLayout from './components/layout/BaseLayout';
import About from './components/About';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Students from './components/Students';
import Teachers from './components/Teachers';

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
          </Routes>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>
);
