import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import Home from '../containers/common/Home';

export default ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  </Provider>
)
