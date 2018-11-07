import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import HomeIndex from './components/home/index_home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeIndex} />
    </Route>

);
