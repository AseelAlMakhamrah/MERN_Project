import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import withAnalytics, { initAnalytics } from 'react-with-analytics';


import HomePage from './HomePage';


initAnalytics('UA-126201794-1');
export const history = createHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    {/* <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/profile/:id" component={ProfilePage} />
    <Route path="/following" component={FollowingPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route component={NotFound} /> */}
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;