import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import configureStore from './stores/configureStore';
import { library } from '@fortawesome/fontawesome-svg-core';

import {faFacebook} from '@fortawesome/fontawesome-free-brands';
import {faNewspaper,faCommentAlt} from '@fortawesome/fontawesome-free-solid';
import {faBell} from '@fortawesome/fontawesome-free-regular';
library.add(faFacebook,faNewspaper,faCommentAlt,faBell);

const store = configureStore();

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));