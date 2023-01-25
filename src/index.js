import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux' 
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)
