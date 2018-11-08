import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import HomeIndex from './components/pages/index_home';
import AddRating from './components/pages/addRating';
import AddTown from './components/pages/addTown';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeIndex} />
        <Route path="/town" component={AddTown} />
        <Route path="/rate" component={AddRating} />
    </Route>

);
